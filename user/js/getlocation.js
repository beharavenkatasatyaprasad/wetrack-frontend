fetchData();
let longitude;
let latitude;
var map;
async function fetchData(map) {
  const jwt = window.localStorage.getItem("jwt");
  if (jwt) {
    let response = await fetch(`https://wetrack-backend.herokuapp.com/vehicle/${jwt}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    let res = await response.json();
    if (res.type_ == "success") {
      let lat = res.lat;
      let lon = res.lon;
      console.log(lat, lon);
      window.localStorage.setItem("lat", lat);
      window.localStorage.setItem("lon", lon);
      function addMarkersToMap(map) {
        var parisMarker = new H.map.Marker({ lat: lat, lng: lon });
        map.addObject(parisMarker);
      }
      var platform = new H.service.Platform({
        apikey: "CXOjrqXtjglgxvMmZ4uSizjlpdkIjnHdP3B_81hzMEY",
      });
      document.getElementById("map").innerHTML = "";
      var defaultLayers = platform.createDefaultLayers();
      map = new H.Map(
        document.getElementById("map"),
        defaultLayers.vector.normal.map,
        {
          center: { lat: lat, lng: lon },
          zoom: 18,
          pixelRatio: window.devicePixelRatio || 1,
        }
      );
      var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));
      var defaultLayers = platform.createDefaultLayers();
     var ui = H.ui.UI.createDefault(map, defaultLayers);
      window.addEventListener("resize", () => map.getViewPort().resize());
      addMarkersToMap(map);
      var mapSettings = ui.getControl("mapsettings");
      var zoom = ui.getControl("zoom");
      var scalebar = ui.getControl("scalebar");
      mapSettings.setAlignment("top-left");
      zoom.setAlignment("top-left");
      scalebar.setAlignment("top-left");
    }
  }
}

