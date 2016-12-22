
$('.js-main-menu').click(function() {
	$('.ui.sidebar')
		// .sidebar('setting', 'transition', 'overlay')
		.sidebar('setting', 'dimPage', false)
		.sidebar('toggle');
})

function initMap() {

	const height = $('body').height();
	$('#map').css({
		height: height + 'px',
	});

	
	const myLatLng = {
		lat: 40.8200471, 
		lng: -73.9514611
	};
	const map = new google.maps.Map(document.getElementById('map'), {
	  center: myLatLng,
	  zoom: 16
	});

	const marker = new google.maps.Marker({
		position: myLatLng,
		map: map,
		title: 'Hello World!'
	});
}