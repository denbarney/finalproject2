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
          radius: '600',
          types: [type]
      };

      const infowindow = new google.maps.InfoWindow({
        maxWidth: 200
      });
      const service = new google.maps.places.PlacesService(map);

      // service.nearbySearch(request, callback);
      service.nearbySearch(request, callback);
  });

   


  function callback(results, status) {
      if (status == google.maps.places.PlacesServiceStatus.OK) {
          for (let i = 0; i < results.length; i++) {
              const place = results[i];
              console.log(place);
              const request = {
                placeId: results[i].place_id,
              };
              service = new google.maps.places.PlacesService(map);
              service.getDetails(request, function(place){
                createMarker(place);
                createHtmlRow(place);

              });
          }
      }
  }
  console.log(callback);

  function createHtmlRow(place) {
    const container = $('.js-container');

    const htmlToAdd = makeCard(place);
    console.log('object: ', htmlToAdd) 

    container.append(htmlToAdd) 
  }

    // const placeId = [place.place_id]

  function createMarker(place) {

    const infowindow = new google.maps.InfoWindow({
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
        infowindow.setContent(html);
      });


  }


  function makeCard(place){
  return `
<div style="margin-top:10px; margin-bottom:20px; margin-right:20px; text-align:left; float:left; width: 200px;">
    <span class="card">
      <image width="10" src="${place.icon}"/>  
      <strong>${place.name}</strong> 
      <span><p>${place.formatted_address}</p>
      ${place.formatted_phone_number}</span>
    </span>`;
}

  // END SCRIPT THAT WORKS

 