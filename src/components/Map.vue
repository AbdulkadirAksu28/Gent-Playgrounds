<template>
  <div class="d-flex flex-column">
    <myFilterBox @selected-data="selectedData" />
    <div class="d-flex flex-row">
      <myListCard class="ctmtop" @selected-index="selectedIndex" />
      <gmap-map
        ref="map"
        :center="myCoordinates"
        :zoom="zoom"
        :zoom-on-click="false"
        :options="{
          zoomControl: true,
          streetViewControl: false,
          mapTypeControl: false,
          scaleControl: false,
          disableDefaultUi: true,
          getclickable: false,
          clickableIcons: false,
        }"
        style="width: 70rem; height: 42rem; margin: 32px auto"
      >
        <gmap-info-window
          :options="{
            maxWidth: 300,
            pixelOffset: { width: 0, height: -35 },
          }"
          :position="position"
          :opened="infoWindow.open"
          @closeclick="infoWindow.open = false"
        >
          <div v-html="infoWindow.template"></div>
        </gmap-info-window>

        <gmap-polygon
          :key="m + index"
          v-for="(m, index) in polygons"
          :paths="m"
          :clickable="true"
          :options="{
            fillColor: 'black',
            fillOpacity: 0.5,
            strokeColor: 'yellow',
            strokeOpacity: 0.9,
            strokeWeight: 3,
          }"
          @click="openInfoWindowTemplate(index)"
        />

        <gmap-marker
          :key="index"
          v-for="(m, index) in markers"
          :position="m"
          :icon="require('../assets/marker-yellow.png')"
          @click="openInfoWindowTemplate(index)"
        />
      </gmap-map>
    </div>
  </div>
</template>

<style>
.d-flex {
  display: flex;
}

.ctmtop {
  margin-top: 2em;
  margin-left: 3em;
}
</style>

<script>
import speelterreinen from "../data/speelterreinen-gent.json";
import myListCard from "./ListCard";
import myFilterBox from "./section/FilterBox";
export default {
  name: "myMap",
  components: {
    myListCard,
    myFilterBox,
  },
  data() {
    return {
      map: null,
      infoWindow: {
        open: false,
        template: "",
      },
      position: {
        lat: 51.05,
        lng: 3.73,
      },
      markers: [],
      myCoordinates: {
        lat: 51.05,
        lng: 3.7303,
      },
      polygons: [],
      zoom: 15,
      dataSelected: [],
      indexSelected: [],
    };
  },
  created() {},
  watch: {
    dataSelected(item) {
      this.pushMarkers(item);
    },
  },
  mounted() {
    // add the map to a data object
    this.geolocate();
    this.pushMarkers();
  },
  computed: {},
  methods: {
    selectedData(select) {
      // loop through emitted dataselect and push in dataSelect array
      // clean dataSelected
      this.dataSelected = [];
      for (let i = 0; i < select.length; i++) {
        this.dataSelected.push(select[i]);
      }
    },
    selectedIndex(index) {
      this.openInfoWindowTemplate(index);
      console.log(index);
    },
    openInfoWindowTemplate(index) {
      var { geo_point_2d, naam, functies } = speelterreinen[index];
      var lat = geo_point_2d.lat;
      var lng = geo_point_2d.lon;
      this.position = { lat, lng };
      // if value of functie is null then then write 'Geen functie'
      if (functies == null) {
        functies = "Rustig parkje";
      }
      // capitalize first letter after a space
      functies = functies.replace(/\w\S*/g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      });

      this.infoWindow.template = `<p>${naam}</p><br><p>${functies}</p>`;
      this.infoWindow.open = true;
      // center after click`
      this.$refs.map.panTo(this.position);
      // zoom after click
      this.zoom = 16;
    },

    filteredMarkers() {},
    pushMarkers() {
      // clean all markers
      this.markers = [];
      for (var m = 0; m < speelterreinen.length; m++) {
        // get geo_point_2d lon and lat value
        var lon = speelterreinen[m].geo_point_2d.lon;
        var lat = speelterreinen[m].geo_point_2d.lat;

        // speelterreinen.functies should be put in an array
        var functies = speelterreinen[m].functies;
        // if functies is null then write 'Rustig parkje'
        if (functies == null) {
          functies = "Rustig parkje";
        }
        // add functies in a new array
        var functiesArray = functies.split(", ");

        // if selectdata is empty then push all markers
        if (this.dataSelected.length == 0) {
          this.markers.push({
            lat: lat,
            lng: lon,
            description: functies,
          });
        } else {
          // loop through selected data
          for (let i = 0; i < this.dataSelected.length; i++) {
            // loop through functies array
            for (let j = 0; j < functiesArray.length; j++) {
              // if functies array contains selected data then push marker
              if (
                functiesArray[j].toLowerCase() ==
                this.dataSelected[i].toLowerCase()
              ) {
                this.markers.push({
                  lat: lat,
                  lng: lon,
                  description: functies,
                });
              }
            }
          }
        }
      }
    },
    geolocate: function () {
      // loop through the speelterreinen data
      for (var i = 0; i < speelterreinen.length; i++) {
        this.polygons.push([]);
        for (
          var j = 0;
          j < speelterreinen[i].geometry.geometry.coordinates[0].length;
          j++
        ) {
          // add the polygons to the polygon array
          this.polygons[i].push({
            lng: speelterreinen[i].geometry.geometry.coordinates[0][j][0],
            lat: speelterreinen[i].geometry.geometry.coordinates[0][j][1],
          });
        }
      }
    },
  },
};
</script>


