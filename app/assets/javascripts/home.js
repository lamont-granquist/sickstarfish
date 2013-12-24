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
var tweetlayers={};

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
    state["z"] = 9
  }
}

function pushState() {
  querystr = "?ll=" + state["ll"] + "&z=" + state["z"]
  history.pushState( state, "NewTitle", querystr )
}

function updateState() {
  var center = map.getCenter()
  state["ll"] = center.lat + "," + center.lng
  state["z"] = map.getZoom()
}

function onMapMove() { updateState(); pushState();  makeAjaxRequests();  }
function onContextMenu() { console.log("contextmenu") }

function getDeltas(data, hash) {
  var deltas = { 'retained': {}, 'added': {}, 'removed': {} }
  for(i=0;i<data.length;i++) {
    id = data[i].id
    if (id in hash ) {
      deltas['retained'][id] = true
    } else {
      deltas['added'][id] = true
    }
  }
  for(var id in hash) {
    if ( !(id in deltas['retained']) ) {
      deltas['removed'][id] = true
    }
  }
  return deltas
}

function removeLayers(deltas, hash) {
  for(var id in deltas['removed']) {
    map.removeLayer(hash[id])
    delete hash[id]
  }
}

function updateTweets(data, status) {
  if (status == "success") {
    deltas = getDeltas(data, tweetlayers)
    removeLayers(deltas, tweetlayers)
    for(var i=0;i<data.length;i++) {
      if ( data[i].id in deltas['added'] ) {
        var point = new L.LatLng(data[i].lat,data[i].lng)
        var marker = new L.marker(point)
        marker.data = data[i]
        map.addLayer(marker)

        marker_html = "<img src=\"" + data[i].image_uri + "\" alt=\"image from instagram\" width=\"120\" height=\"120\" style=\"float:left;\">"
        marker_html += "<a href=\"" + data[i].uri + "\" target=\"_blank\">" + data[i].full_text + "</a></br>"
        marker_html += data[i].user_name + "<br/>"
        marker.bindPopup(marker_html)

        tweetlayers[data[i].id] = marker
      }
    }
  }
}

function makeAjaxRequests() {
  var bounds = map.getBounds()
  var minll=bounds.getSouthWest()
  var maxll=bounds.getNorthEast()
  var bbstr=bounds.toBBoxString()

  console.log('new bounding box: '+bbstr)

  /* get sites */
  var url = '/tweets.json?bb='+bbstr
  $.ajax({
    type: 'GET',
    url: url,
    success: updateTweets
  })
}

function initmap() {

  hookPopStateForHistory()

  getStateFromURL()

  map = new L.map('map', {
    maxZoom: 22,
  })

  var osmUrl='http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
  var osmAttrib='Map data © OpenStreetMap contributors'

  var osm = new L.TileLayer(osmUrl, {attribution: osmAttrib})

  var a   = state["ll"].split(",")
  var lat = a[0]
  var lng = a[1]

  map.setView(new L.LatLng(lat, lng), state["z"])

  map.addLayer(osm)

  $(window).on('orientationchange pageshow resize', function () {
    $("#map").height($(window).height() - 51);
    map.invalidateSize();
    makeAjaxRequests()

  }).trigger('resize');

  map.on('moveend', onMapMove);
  map.on('contextmenu', onContextMenu);

  makeAjaxRequests()
}


$('document').ready(function() {
  if($('#map').length) {
    initmap()
  }
});

