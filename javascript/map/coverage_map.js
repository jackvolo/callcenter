var geoXml = null;
var geocoder = null;
var toggleState = 1;
var infowindow = null;
var marker = null;
// create the map
var mapOptions = {
    zoom: 11,
    center: new google.maps.LatLng(40.164, -88.24),
    mapTypeControl: true,
    mapTypeControlOptions: {style: google.maps.MapTypeControlStyle.DROPDOWN_MENU},
    navigationControl: false
};
var map = new google.maps.Map(document.getElementById("coverage-map"), mapOptions);
map.addListener('click', function (e) {moveMarker(e.latLng);});

function moveMarker(position) {
    if (marker && marker.setMap) marker.setMap(null);
    marker = new google.maps.Marker({
        position: position,
        map: map
    });
    showInfo(position);
}

function createPoly(points, colour, width, opacity, fillcolour, fillopacity, bounds, name, description) {
    GLog.write("createPoly("+colour+","+width+"<"+opacity+","+fillcolour+","+fillopacity+","+name+","+description+")");
    var poly = new GPolygon(points, colour, width, opacity, fillcolour, fillopacity);
    poly.Name = name;
    poly.Description = description;
    map.addOverlay(poly);
    exml.gpolygons.push(poly);
   
    return poly;
}

function initializeMap() {
    geocoder = new google.maps.Geocoder();
    infowindow = new google.maps.InfoWindow({size: new google.maps.Size(150,80) });
    
    var geoOptions = {
        map: map,
        singleInfoWindow: true,
        infoWindow: infowindow,
        preserveViewport: true,
        suppressInfoWindows: true,
        zoom: false,
        afterParse: function(docs) {
            for (var i in docs[0].placemarks) {
                google.maps.event.addListener(
                    docs[0].placemarks[i].polygon,
                    "click",
                    function (e) {
                        moveMarker(e.latLng);
                    },
                );
            };
        },
    };
    geoXml = new geoXML3.parser(geoOptions);
    geoXml.parse('https://volo.net/sites/volo.net/files/services.kml');
    
    var $address = $('#v-serviceaddress').val()+" "+$("#v-servicezip").val();
    showAddress($address);
}
$('#coverage-map').ready(initializeMap);

function showAddress(address) {
    //if (debug) console.log(address);
    geocoder.geocode( { 'address': address, 'bounds': map.getBounds() }, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            var point = results[0].geometry.location;
            map.setCenter(point);
            moveMarker(point);
        } else {
            alert("Geocode was not successful for the following reason: " + status);
        }
    });
    map.setZoom(12);
}

function showInfo(point) {
    var service_hash = {};
    var contentString = "Available Services: ";
    for (var i=0; i<geoXml.docs[0].gpolygons.length; i++) {
        if (geoXml.docs[0].gpolygons[i].Contains(point)) {
            if (!service_hash[geoXml.docs[0].placemarks[i].name]) {
                service_hash[geoXml.docs[0].placemarks[i].name] = 1;
                var serviceString;
                if (debug) console.log("Serivce Name: "+geoXml.docs[0].placemarks[i].name);
                if (geoXml.docs[0].placemarks[i].name == 'wireless') {
                    serviceString = '<a href="/services?edit[submitted][internet]['
                                  + geoXml.docs[0].placemarks[i].name + ']=1">'
                                  + geoXml.docs[0].placemarks[i].name + '</a>, ';
                } else if (geoXml.docs[0].placemarks[i].name == 'fiber') {
                    serviceString = '<a href="/services?edit[submitted][internet]['
                                  + geoXml.docs[0].placemarks[i].name + ']=1">'
                                  + geoXml.docs[0].placemarks[i].name + '</a>, ';
                } else if (geoXml.docs[0].placemarks[i].name == 'custom fiber') {
                    serviceString = '<a href="/business/apartment-complex-services">'
                                  + geoXml.docs[0].placemarks[i].name + '</a>, ';
                } else {
                    console.log("No text for service name: "+geoXml.docs[0].placemarks[i].name);
                    continue;
                }
                contentString += serviceString;
            }
        }
    }
    contentString += '<a href="/services?edit[submitted][phoneservice][phone]=1">phone</a> and <a href="/hosting">hosted services</a>.';
    infowindow.setContent(contentString);
    infowindow.open(map,marker);
    return contentString;
}
