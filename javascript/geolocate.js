// From https://google-developers.appspot.com/maps/documentation/javascript/examples/full/places-autocomplete-addressform:

// This example displays an address form, using the autocomplete feature
// of the Google Places API to help users fill in the information.

// This example requires the Places library. Include the libraries=places
// parameter when you first load the API. For example:
// <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">

var placeSearch, autocomplete = [];
var componentForm = {
  street_number: 'short_name',
  route: 'short_name',
  postal_code: 'short_name'
};

function initAutocompleteAddress(addressfield,zipfield) {
  // Create the autocomplete object, restricting the search to geographical
  // location types.
  var chambanaBounds = new google.maps.LatLngBounds(
    new google.maps.LatLng(40.04920, -88.3135),
    new google.maps.LatLng(40.1678,  -88.1414)
  );
  var ac = new google.maps.places.Autocomplete( /** @type {!HTMLInputElement} */addressfield, {bounds: chambanaBounds, types: ['address']});
  ac.addListener('place_changed', function (){
    fillInAddress(ac,addressfield,zipfield);
  });
  autocomplete.push(ac);
}

function fillInAddress(autocompleter,addressfield,zipfield) {
  // Get the place details from the autocomplete object.
  var place = autocompleter.getPlace();
  var results = {};

  // Get each component of the address from the place details
  // and fill the corresponding field on the form.
  for (var i = 0; i < place.address_components.length; i++) {
    var addressType = place.address_components[i].types[0];
    if (componentForm[addressType]) {
      var val = place.address_components[i][componentForm[addressType]];
      results[addressType] = val;
    }
  }

  addressfield.value = results['street_number'] + ' ' + results['route'];
  // It might also work to use place.name, which seems the same with limited testing
  $(addressfield).trigger('change');
  zipfield.value = results['postal_code'];
  $(zipfield).trigger('change');
  showAddress(addressfield.value+" "+results['postal_code']);
}

