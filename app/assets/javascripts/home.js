// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.

// jQuery plugin for parsing query string
(function($) {
    $.QueryString = (function(a) {
        if (a == "") return {};
        var b = {};
        for (var i = 0; i < a.length; ++i)
        {
            var p=a[i].split('=');
            if (p.length != 2) continue;
            b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " "));
        }
        return b;
    })(window.location.search.substr(1).split('&'))
})(jQuery);

var map;
var state={};

function hookPopStateForHistory() {
  window.addEventListener('popstate', function(event) {
    if ( event.state != undefined ) {
      state = event.state
      var a = state["ll"].split(",")
      var zoom = state["z"]
      map.setView(new L.LatLng(a[0], a[1]), zoom)
    }
  });
}

function getStateFromURL() {
  // ll = lat/lng
  state["ll"] = $.QueryString["ll"]
  if ( state["ll"] == undefined ) {
    state["ll"] = "47.599313,-122.388049"
  }
  // z = zoom
  state["z"] = $.QueryString["z"]
  if ( state["z"] == undefined ) {
    state["z"] = 2
  }
/*  // t = tags ( can be undefined )
  state["t"] = $.QueryString["t"]
  // sl = show labels ( can be undefined )
  state["sl"] = $.QueryString["sl"] */
}

function pushState() {
  querystr = "?ll=" + state["ll"] + "&z=" + state["z"]
/*  if ( state["t"] != undefined ) {
    querystr += "&t=" + state["t"]
  }
  if ( state["sl"] != undefined ) {
    querystr += "&sl=" + state["sl"]
  } */
  history.pushState( state, "NewTitle", querystr )
}

function updateState() {
  var center = map.getCenter()
  state["ll"] = center.lat + "," + center.lng
  state["z"] = map.getZoom()
}

function onMapMove() { updateState(); pushState(); /* makeAjaxRequests(); */ }

function initmap() {

  hookPopStateForHistory()

  getStateFromURL()

  map = new L.map('map', {
    maxZoon: 22,
  })

  var osmUrl='http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
  var osmAttrib='Map data © OpenStreetMap contributors'

  var osm = new L.TileLayer(osmUrl, {attribution: osmAttrib})

  var a   = state["ll"].split(",")
  var lat = a[0]
  var lng = a[1]

  map.setView(new L.LatLng(lat, lng), state["z"])

  map.addLayer(osm)

/*  makeAjaxRequests() */
  $(window).on('orientationchange pageshow resize', function () {
    $("#map").height($(window).height() - 51);
    map.invalidateSize();
  }).trigger('resize');

  map.on('moveend', onMapMove)
}


$('document').ready(function() {
  if($('#map').length) {
    initmap()
  }
});

