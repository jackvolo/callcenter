var geoXml = null;
var map = null;
var geocoder = null;
var toggleState = 1;
var infowindow = null;
var marker = null;

function createPoly(points, colour, width, opacity, fillcolour, fillopacity, bounds, name, description) {
    GLog.write("createPoly("+colour+","+width+"<"+opacity+","+fillcolour+","+fillopacity+","+name+","+description+")");
    var poly = new GPolygon(points, colour, width, opacity, fillcolour, fillopacity);
    poly.Name = name;
    poly.Description = description;
    map.addOverlay(poly);
    exml.gpolygons.push(poly);
   
    return poly;
}

function initialize() {
    geocoder = new google.maps.Geocoder();
    infowindow = new google.maps.InfoWindow({size: new google.maps.Size(150,80) });
    // create the map
    var mapOptions = {
        zoom: 11,
        center: new google.maps.LatLng(40.164, -88.24),
        mapTypeControl: true,
        mapTypeControlOptions: {style: google.maps.MapTypeControlStyle.DROPDOWN_MENU},
        navigationControl: false
    };
    map = new google.maps.Map(document.getElementById("coverage-map"), mapOptions);
    
    var geoOptions = {
        map: map,
        singleInfoWindow: true,
        infoWindow: infowindow,
        preserveViewport: true,
        suppressInfoWindows: true,
        zoom: false
    };
    geoXml = new geoXML3.parser(geoOptions);
    geoXml.parse('/sites/volo.net/files/services.kml');
}
google.maps.event.addDomListener(window, 'load', initialize);

function showAddress(address) {
    geocoder.geocode( { 'address': address, 'bounds': map.getBounds() }, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            var point = results[0].geometry.location;
            contentString += "<br>"+point;
            map.setCenter(point);
            if (marker && marker.setMap) marker.setMap(null);
            marker = new google.maps.Marker({
                map: map, 
                position: point
            });
            
            var service_hash = {};
            var contentString = "Available Services: ";
            for (var i=0; i<geoXml.docs[0].gpolygons.length; i++) {
                if (geoXml.docs[0].gpolygons[i].Contains(point)) {
                    if (!service_hash[geoXml.docs[0].placemarks[i].name]) {
                        service_hash[geoXml.docs[0].placemarks[i].name] = 1;
                        contentString += '<a href="/services?edit[submitted][internet]['
                                       + geoXml.docs[0].placemarks[i].name + ']=1">'
                                       + geoXml.docs[0].placemarks[i].name + '</a>, ';
                    }
                }
            }
            contentString += '<a href="/services?edit[submitted][phoneservice][phone]=1">phone</a> and <a href="/services?edit[submitted][hostedservices][hosted]=1">hosted services</a>.';
            
            google.maps.event.addListener(marker, 'click', function() {
                infowindow.setContent(contentString);
                infowindow.open(map,marker);
            });
            google.maps.event.trigger(marker,"click");
        } else {
            alert("Geocode was not successful for the following reason: " + status);
        }
    });
}
