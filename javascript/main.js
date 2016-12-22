  let map;
  let markers = [];
  const myLatLng = {
      lat: 40.8200471,
      lng: -73.9514611
  };

  function initMap() {

      const height = $('body').height();
      $('#map').css({
          height: height + 'px',
      });


      map = new google.maps.Map(document.getElementById('map'), {
          center: myLatLng,
          zoom: 15,
          gestureHandling: 'auto',
          styles: [{
              "elementType": "geometry",
              "stylers": [{
                  "color": "#ebe3cd"
              }]
          }, {
              "elementType": "labels.text.fill",
              "stylers": [{
                  "color": "#523735"
              }]
          }, {
              "elementType": "labels.text.stroke",
              "stylers": [{
                  "color": "#f5f1e6"
              }]
          }, {
              "featureType": "administrative",
              "elementType": "geometry.stroke",
              "stylers": [{
                  "color": "#c9b2a6"
              }]
          }, {
              "featureType": "administrative.land_parcel",
              "elementType": "geometry.stroke",
              "stylers": [{
                  "color": "#dcd2be"
              }]
          }, {
              "featureType": "administrative.land_parcel",
              "elementType": "labels.text.fill",
              "stylers": [{
                  "color": "#ae9e90"
              }]
          }, {
              "featureType": "landscape.natural",
              "elementType": "geometry",
              "stylers": [{
                  "color": "#dfd2ae"
              }]
          }, {
              "featureType": "poi",
              "elementType": "geometry",
              "stylers": [{
                  "color": "#dfd2ae"
              }]
          }, {
              "featureType": "poi",
              "elementType": "labels.text.fill",
              "stylers": [{
                  "color": "#93817c"
              }]
          }, {
              "featureType": "poi.park",
              "elementType": "geometry.fill",
              "stylers": [{
                  "color": "#a5b076"
              }]
          }, {
              "featureType": "poi.park",
              "elementType": "labels.text.fill",
              "stylers": [{
                  "color": "#447530"
              }]
          }, {
              "featureType": "road",
              "elementType": "geometry",
              "stylers": [{
                  "color": "#f5f1e6"
              }]
          }, {
              "featureType": "road.arterial",
              "elementType": "geometry",
              "stylers": [{
                  "color": "#fdfcf8"
              }]
          }, {
              "featureType": "road.highway",
              "elementType": "geometry",
              "stylers": [{
                  "color": "#f8c967"
              }]
          }, {
              "featureType": "road.highway",
              "elementType": "geometry.stroke",
              "stylers": [{
                  "color": "#e9bc62"
              }]
          }, {
              "featureType": "road.highway.controlled_access",
              "elementType": "geometry",
              "stylers": [{
                  "color": "#e98d58"
              }]
          }, {
              "featureType": "road.highway.controlled_access",
              "elementType": "geometry.stroke",
              "stylers": [{
                  "color": "#db8555"
              }]
          }, {
              "featureType": "road.local",
              "elementType": "labels.text.fill",
              "stylers": [{
                  "color": "#806b63"
              }]
          }, {
              "featureType": "transit.line",
              "elementType": "geometry",
              "stylers": [{
                  "color": "#dfd2ae"
              }]
          }, {
              "featureType": "transit.line",
              "elementType": "labels.text.fill",
              "stylers": [{
                  "color": "#8f7d77"
              }]
          }, {
              "featureType": "transit.line",
              "elementType": "labels.text.stroke",
              "stylers": [{
                  "color": "#ebe3cd"
              }]
          }, {
              "featureType": "transit.station",
              "elementType": "geometry",
              "stylers": [{
                  "color": "#dfd2ae"
              }]
          }, {
              "featureType": "water",
              "elementType": "geometry.fill",
              "stylers": [{
                  "color": "#b9d3c2"
              }]
          }, {
              "featureType": "water",
              "elementType": "labels.text.fill",
              "stylers": [{
                  "color": "#92998d"
              }]
          }]

      });

      const marker = new google.maps.Marker({
          position: myLatLng,
          map: map,
          title: 'Hello World!'
      });


      map.data.loadGeoJson(
          'https://storage.googleapis.com/mapsdevsite/json/google.json');
  }


  // const service = new google.maps.places.PlacesService(map);
  // service.nearbySearch(request, callback);



  // const infowindow;

  // $('.typebtn').click(function(e) {
  //  console.log($(this)[0].id);
  //  const type=($(this)[0].id)

  // function performSearch()
  // {
  //   const request = {
  //     location: myLatLng,
  //     radius: '500',
  //     types: [type]
  // }
  // service.nearbySearch(request, handleSearchResults);
  // }

  // function handleSearchResults(results, status){
  //   console.log(results);
  // }




  //  google.maps.event.addListenerOnce(map, performSearch, 'click', function(e)){
  //           infowindow.setContent(place.name);
  //           infowindow.open(map, this);
  //         });
  //       }

  // START SCRIPT THAT WORKS

  function setMapOnAll(map) {
    for (var i = 0; i < markers.length; i++) {
      markers[i].setMap(map);
    }
  }

  function deleteMarkers() {
    alert('delete');
    clearMarkers();
    markers = [];
  }

  function clearMarkers() {
    setMapOnAll(null);
  }

  $('.typebtn').click(function(e) {


      if (markers.length > 0) {
        // console.log(markers.length);
        clearMarkers();
        $('.js-container').empty()
      }


      // console.log($(this)[0].id);
      const type = ($(this)[0].id)



      const request = {
          location: myLatLng,
          radius: '550',
          types: [type]
      };

      const infowindow = new google.maps.InfoWindow();
      const service = new google.maps.places.PlacesService(map);

      service.nearbySearch(request, callback);
      // service.textSearch(request, callback);
  });

   


  function callback(results, status) {
      if (status == google.maps.places.PlacesServiceStatus.OK) {
          for (let i = 0; i < results.length; i++) {
              const place = results[i];
              console.log(place)
              createMarker(place);
              createHtmlRow(place);
          }
      }
  }
  console.log(callback);

  function createHtmlRow(place) {
    const container = $('.js-container');

    const htmlToAdd = makeCard(place);
    console.log(htmlToAdd)

    container.append(htmlToAdd) 
  }


  function createMarker(place) {

    var infowindow = new google.maps.InfoWindow({
      content: makeCard(place)
    });


      const marker = new google.maps.Marker({
          map: map,
          position: place.geometry.location,
          title: place.name,
       
      });

      markers.push(marker);
      marker.addListener('click', function() {
        infowindow.open(map, marker);
      });


      // google.maps.event.addListenerOnce(map, marker, 'click', function(e) {
      //     infowindow.setContent(place.name);
      //     infowindow.open(map, this);
      // });
  }
   // Deletes all markers in the array by removing references to them.
      // function deleteMarkers() {
      //   clearMarkers();
      //   markers = [];
      // }

  function makeCard(place){
  return `
<div>
  <p>
    <image width="30" src="data:image/png;base64,${place.photos[0].photo_reference}"/>  
    <strong>${place.name}</strong>

    <em class="red">${place.rating}</em>
  </p>
</div>`;
}

  // END SCRIPT THAT WORKS

  //  function addMarker(place) {
  //   const marker = new google.maps.Marker({
  //     map: map,
  //     position: place.geometry.location,
  //     icon: {
  //       url: 'https://developers.google.com/maps/documentation/javascript/images/circle.png',
  //       anchor: new google.maps.Point(10, 10),
  //       scaledSize: new google.maps.Size(10, 17)
  //     }
  //   });

  //   google.maps.event.addListener(marker, 'click', function() {
  //     service.getDetails(place, function(result, status) {
  //       if (status !== google.maps.places.PlacesServiceStatus.OK) {
  //         console.error(status);
  //         return;
  //       }
  //       infoWindow.setContent(result.name);
  //       infoWindow.open(map, marker);
  //     });
  //   });
  // }

  // function callback(results, status) {
  //   if (status == google.maps.places.PlacesServiceStatus.OK) {
  //     const marker = new google.maps.Marker({
  //       map: map,
  //       place: {
  //         placeId: results[0].place_id,
  //         location: results[0].geometry.location
  //       }
  //     });
  //   }
  // }




  // I want the user to click on something and grab what they are looking for