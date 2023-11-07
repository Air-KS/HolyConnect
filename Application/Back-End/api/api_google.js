// Filename: api google.js
// 1.0.0
// Auteur: LENNE Sebastien
//

require("dotenv").config();
const Geolocation = require("@react-native-geolocation/geolocation");

function initlocalitation(callback) {
  Geolocation.getCurrentPosition(
    (position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      callback(latitude, longitude);
    },
    (error) => {
      console.error(error);
      Response.status(500).json({
        error:
          "Erreur de géolocalisation. Merci de verifier si la geolocalosation est activer",
      });
    },
    { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
  );
}

// Fonction d'initialisation de la carte
function initMap(location, types) {
  var apiKey = process.env.API_KEY_PLACE;
  var radius = 20000; // Rayon de recherche en mètres

  var map = new google.maps.Map(document.getElementById("map"), {
    center: location,
    zoom: 15,
  });

  var service = new google.maps.places.PlacesService(map);

  var request = {
    location: location,
    radius: radius,
    types: types,
  };

  service.nearbySearch(request, function (results, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      for (var i = 0; i < results.length; i++) {
        var place = results[i];
        console.log(place.name);
      }
    }
  });
}

// Fonction d'initialisation de la carte des restaurant
function initMapfood() {
  initlocalitation((latitude, longitude) => {
    var location = { lat: latitude, lng: longitude };
    var types = ["restaurant"];
    initMap(location, types);
  });
}

// Fonction d'initialisation de la carte des magasins
function initMapretail() {
  initlocalitation((latitude, longitude) => {
    var location = { lat: latitude, lng: longitude };
    var types = ["store"];
    initMap(location, types);
  });
}

// Fonction d'initialisation de la carte des loisirs
function initMapentertainment() {
  initlocalitation((latitude, longitude) => {
    var location = { lat: latitude, lng: longitude };
    var types = ["amusement_park"];
    initMap(location, types);
  });
}

initMapfood();
initMapretail();
initMapentertainment();
