//Initialize
$(document).ready(function() {
	document.addEventListener("deviceready", onDeviceReady, false);
});

// Global variables
var map,lat, lon, latlon;

// PhoneGap is loaded and it is now safe to make calls to device API
function onDeviceReady() {
	// iOS. BB. Android
	document.addEventListener("offline", onOffline, false);
	document.addEventListener("online", onOnline, false);
	// Access contacts
	var options = new ContactFindOptions();
	options.filter = "Aoudi";
	var fields = ["displayName", "name"];
	navigator.contacts.find(fields, onSuccess, onError, options);
}

function onOffline() {
	// When device goes offline, display error
	onGetLocationError(4);
}

function onOnline() {
	// When the device goes online, go to homepage
    $.mobile.changePage("#index");
}

// Load the Google maps API script with zoom level and desired proximity
function loadScript() {
  var script = document.createElement("script");
  script.type = "text/javascript";
  script.src = "http://maps.googleapis.com/maps/api/js?sensor=false&v=3&libraries=geometry&callback=initialize&async=2";
  document.head.appendChild(script);
}
// The callback function after loading the script
function initialize() {
	var geoOptions = {'enableHighAccuracy': true, 'timeout': 10000, 'maximumAge':60000};
	navigator.geolocation.getCurrentPosition(onGetLocationSuccess, onGetLocationError, geoOptions);
}



function onGetLocationSuccess(position) {
	lat=position.coords.latitude;
	lon=position.coords.longitude;
	latlon=new google.maps.LatLng(lat, lon);
	
	mapholder=document.getElementById('mapholder');
	mapholder.style.height='200px';
	mapholder.style.width=window.innerWidth;
	
	var myOptions={
	zoom:12,
	center:latlon,
	mapTypeControl:false,
	navigationControlOptions:{style: google.maps.NavigationControlStyle.SMALL},
	mapTypeId:google.maps.MapTypeId.ROADMAP,
	};
	
	google.maps.visualRefresh = true;
	map=new google.maps.Map(document.getElementById("mapholder"),myOptions);
	var marker=new google.maps.Marker({
	  position:latlon,
	  map:map,
	  title:"My Location!"
	  });
} // End onGetLocationSuccess
  

function onGetLocationError(error)
{
	$("#errorholder").show();
	$("#mapholder").hide();
	var x=document.getElementById("errormsg");
	switch(error.code) 
	{
		case 1:
		  x.innerHTML="User denied the request for Geolocation."
		  break;
		case 2:
		  x.innerHTML="Location information is unavailable."
		  break;
		case 3:
		  x.innerHTML="The request to get user location timed out."
		  break;
		default:
		  x.innerHTML="An unknown error occurred."
		  break;
	} // End switch
} // End onGetLocationError
 
function onSuccess(contacts) {
	for (var i = 0; i < contacts.length; i++) {
		$("#contactlist").html("Display Name = " + contacts[i].displayName);
	}
}

// onError: Failed to get the contacts

function onError(contactError) {
	alert('onError!');
}
 

/* ================================================= 
   ================ Events Section ================= 
   ================================================= */

// Main page and Panel: Setup and go to results page
$('#location').on('click', function (e)  {
	loadScript();
	$.mobile.changePage("#location");
});

$('#contacts').on('click', function (e)  {
	$.mobile.changePage("#contacts");
});

$(window).on("orientationchange",function(event){
  // alert("Orientation is: " + event.orientation);
  //location.reload();
});
