function initMap() {
  var map = new google.maps.Map(document.getElementById("map"), {
    zoom: 5,
    center: {lat: -9.1191427, lng: -77.0349046},
    mapTypeControl: false,
    zoomControl: false,
    streetViewControl: false
  });
  function buscar(){
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(funcionExito, funcionError);
    }
  }

  document.getElementById("encuentrame").addEventListener("click", buscar);
  var latitud, longitud;

  var funcionExito = function(posicion){
    latitud = posicion.coords.latitude;
    longitud = posicion.coords.longitude;
    var miUbicacion = new google.maps.Marker({
      position: {lat:latitud, lng:longitud},
      animation: google.maps.Animation.DROP,
      map: map
    });
  map.setZoom(17);
  map.setCenter({lat:latitud, lng:longitud});
  }

  var funcionError = function (error) {
  alert("Tenemos un problema con encontrar tu ubicacion");
  }
}

// FUNCIONES PARA RUTAS
var source, destination;
var directionsDisplay;
var directionsService = new google.maps.DirectionsService();
google.maps.event.addDomListener(window, 'load', function () {
    new google.maps.places.SearchBox(document.getElementById('inputInicio'));
    new google.maps.places.SearchBox(document.getElementById('inputDestino'));
    directionsDisplay = new google.maps.DirectionsRenderer({ 'draggable': true });
});
 
function obtenerRuta() {
    var santiago = new google.maps.LatLng(-33.4718999,-70.9100215);
    var mapOptions = {
        zoom: 7,
        center: santiago
    };
    map = new google.maps.Map(document.getElementById('map'), mapOptions);
    directionsDisplay.setMap(map);
 
    //*********DIRECTIONS AND ROUTE**********************//
    source = document.getElementById("inputInicio").value;
    destination = document.getElementById("inputDestino").value;
 
    var request = {
        origin: source,
        destination: destination,
        travelMode: google.maps.TravelMode.DRIVING
    };
    directionsService.route(request, function (response, status) {
        if (status == google.maps.DirectionsStatus.OK) {
            directionsDisplay.setDirections(response);
        }
    });
 
    //*********DISTANCE AND DURATION**********************//
    var service = new google.maps.DistanceMatrixService();
    service.getDistanceMatrix({
        origins: [source],
        destinations: [destination],
        travelMode: google.maps.TravelMode.DRIVING,
        unitSystem: google.maps.UnitSystem.METRIC,
        avoidHighways: false,
        avoidTolls: false
    }, function (response, status) {
        if (status == google.maps.DistanceMatrixStatus.OK && response.rows[0].elements[0].status != "ZERO_RESULTS") {
            var distance = response.rows[0].elements[0].distance.text;
            var duration = response.rows[0].elements[0].duration.text;
            var dvDistance = document.getElementById("dvDistance");
           dvDistance.innerHTML = "";
            dvDistance.innerHTML += "Distance: " + distance + "<br />";
            dvDistance.innerHTML += "Duration:" + duration;
 
        } else {
            alert("Unable to find the distance via road.");
        }
    });
}
