
// $('.js-main-menu').click(function() {
// 	$('.ui.sidebar')
// 		// .sidebar('setting', 'transition', 'overlay')
// 		.sidebar('setting', 'dimPage', false)
// 		.sidebar('toggle');
// })
	const myLatLng = {
		lat: 40.8200471, 
		lng: -73.9514611
	};

function initMap() {

	const height = $('body').height();
	$('#map').css({
		height: height + 'px',
	});



	

	const map = new google.maps.Map(document.getElementById('map'), {
	  center: myLatLng,
	  zoom: 15,
	  gestureHandling: 'auto',
	     styles: [{
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#ebe3cd"
      }
    ]
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#523735"
      }
    ]
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#f5f1e6"
      }
    ]
  },
  {
    "featureType": "administrative",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#c9b2a6"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#dcd2be"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#ae9e90"
      }
    ]
  },
  {
    "featureType": "landscape.natural",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#dfd2ae"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#dfd2ae"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#93817c"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#a5b076"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#447530"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#f5f1e6"
      }
    ]
  },
  {
    "featureType": "road.arterial",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#fdfcf8"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#f8c967"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#e9bc62"
      }
    ]
  },
  {
    "featureType": "road.highway.controlled_access",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#e98d58"
      }
    ]
  },
  {
    "featureType": "road.highway.controlled_access",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#db8555"
      }
    ]
  },
  {
    "featureType": "road.local",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#806b63"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#dfd2ae"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#8f7d77"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#ebe3cd"
      }
    ]
  },
  {
    "featureType": "transit.station",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#dfd2ae"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#b9d3c2"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#92998d"
      }
    ]
  }
]

        });

	const marker = new google.maps.Marker({
		position: myLatLng, 
		map: map,
		title: 'Hello World!'
	});


map.data.loadGeoJson(
      'https://storage.googleapis.com/mapsdevsite/json/google.json');
}





/* get all places by type */
getPlacesByType("restaurant", 500)
function getPlacesByType(type, radius=500) {
	const rooturl = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?"
	const location = "location="+ myLatLng.lat+","+myLatLng.lng +"&";
	const radiusparameter = "radius="+radius +"&";
	const typeparameter = "type="+type +"&";
	const key = "key=AIzaSyCd-hQBzbOUihAVIpPzyKWYnbPagdj4jmE"
	let link = rooturl + location + radiusparameter + typeparameter + key
	//get data
	return data
}



$('.typebtn').click(function(e) {
	console.log($(this)[0].id);
	const type=($(this)[0].id)
	console.log(data);

	/*var places = getPlacesByType(type)*/
	let places = data.results


	places.forEach(function(place) {
		let el = makeCard(place)
	    console.log(el, place.name);
		$('#places').append(el)
	})
})

// MARKER FOR SEARCHED ITEMS
function callback(results, status) {
  if (status == google.maps.places.getPlacesByType.OK) {
    const marker = new google.maps.Marker({
      map: 'map',
      place: {
        placeId: results[0].place_id,
        location: results[0].geometry.location
      }
    });
  }
}
function createPhotoMarker(place) {
  var photos = place.photos;
  if (!photos) {
    return;
  }

  var marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location,
    title: place.name,
    icon: photos[0].getUrl({'maxWidth': 35, 'maxHeight': 35})
  });
}
// google.maps.event.addDomListener(window, 'load', initialize);

// STYLING FOR DATA

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
// return

// `
// <div class="ui items">
// 	<div class="item">
// 		<div class="ui small image">
// 			<img src="data:image/png;base64,${place.photos[0].photo_reference}"/>
// 		</div>
// 		<div class="content">
// 			<div class="header">${place.name}</div>`;
//     }



// 	<p>
// 		<strong>${place.name}</strong>
// 		<em class="red">${place.rating}</em>
// 		<image width="30" src="data:image/png;base64,${place.photos[0].photo_reference}"/>
// 	</p>
// </div>`;

// // // <div class="ui items">
// //   <div class="item">
// //     <div class="ui small image">
// //       <img src="/images/wireframe/image.png">
// //     </div>
// //     <div class="content">
// //       <div class="header">Arrowhead Valley Camp</div>
// //       <div class="meta">
// //         <span class="price">$1200</span>
// //         <span class="stay">1 Month</span>
// //       </div>
// //       <div class="description">
// //         <p></p>
// //       </div>
// //     </div>
// //   </div>


// // draw places

// // search places 

// // load retrieved content in container 


