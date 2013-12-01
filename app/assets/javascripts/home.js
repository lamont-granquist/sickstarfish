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

function onMapMove() { updateState(); pushState();  makeAjaxRequests();  }

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

/*        var embeds = data[i].embeds
        var embed_html = ""
        for( var j = 0; j < embeds.length; j++ ) {
          embed_html += "<iframe src=\"http://player.vimeo.com/video/" + embeds[j].embed_id + "\" width=\"320\" height=\"180\" frameborder=\"0\" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>"
        }
        marker_html = "<h4><a href=\"/sites/" + data[i].id +"\">" + data[i].name + "</a></h4>"
        if ( data[i].description ) {
          marker_html += data[i].description + "<br/>"
        }
        if ( data[i].awois_history ) {
          marker_html += data[i].awois_history + "<br/>"
        }
        marker.bindPopup(marker_html + embed_html, {maxWidth:640, minWidth:320})
        var labelOpts = {}
        console.log(state["sl"])
        if (state["sl"] != undefined ) { labelOpts = { noHide: true } }
        marker.bindLabel(data[i].name, labelOpts)
        if (state["sl"] != undefined ) { marker.showLabel() } */

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
  var url = 'tweets.json?bb='+bbstr
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

  map.on('moveend', onMapMove)

  makeAjaxRequests()
}


$('document').ready(function() {
  if($('#map').length) {
    initmap()
  }
});

