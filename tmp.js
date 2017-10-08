ions.push({lat:xy[0], lng:xy[1]})
      }

      <script src="javascripts/MarkerClusterer.js"> </script>
       <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAJ3b4duXGP-7mSiQp-WG8DElJAE-bSs0M">  </script>

      function getLocs(){
          var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 3,
          center: {lat: -28.024, lng: 140.887}
       });

       var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

        var markers = my_locations.map(function(location, i) {
          return new google.maps.Marker({
             position: location,
           label: labels[i % labels.length]
          });
        });

        var markerCluster = new MarkerClusterer(map, markers,
            {imagePath: 'markers/m'});

      }
