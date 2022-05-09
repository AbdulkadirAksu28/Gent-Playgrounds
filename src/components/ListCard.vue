<template>
  <div id="app">
    <v-app id="inspire">
      <v-card class="mx-auto" max-width="400">
        <v-list
          id="list"
          flat
          style="max-height: 42rem"
          class="overflow-y-auto"
        >
          <v-text-field
            class="pl-3"
            type="text"
            v-model="search"
            placeholder="Search"
          ></v-text-field>
          <v-list-item-group v-model="model" color="yellow accent-4">
            <v-list-item
              v-for="(item, i) in filteredItems"
              :key="i"
              @click="OnClick(i)"
            >
              <v-list-item-icon>
                <v-icon v-text="item.icon"></v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title v-text="item.text"></v-list-item-title>
                <v-list-item-subtitle
                  v-text="item.functies"
                ></v-list-item-subtitle>
                <v-list-item-subtitle
                  v-text="item.coordinates"
                ></v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-card>
    </v-app>
  </div>
</template>

<script>
import speelterreinen from "../data/speelterreinen-gent.json";

export default {
  name: "ListCard",
  data() {
    return {
      search: "",
      items: [],
      model: 1,
    };
  },
  mounted() {
    this.getItems();
  },
  computed: {
    // make search case filter for items
    filteredItems() {
      return this.items.filter((item) => {
        return item.text.toLowerCase().includes(this.search.toLowerCase());
      });
    },
  },
  methods: {
    getItems() {
      let functies = [];
      // loop trhoug the data and add the items to the items array
      for (let i = 0; i < speelterreinen.length; i++) {
        // add speelterreinen functies in an array
        if (speelterreinen[i].functies) {
          functies = speelterreinen[i].functies.split(", ");
          // capitalise each first letter insdie of the array
          for (let j = 0; j < functies.length; j++) {
            functies[j] =
              functies[j].charAt(0).toUpperCase() + functies[j].slice(1);
          }
        } else {
          functies = ["Rustig parkje"];
        }

        this.items.push({
          icon: "mdi-map-marker",
          text: speelterreinen[i].naam,
          coordinates: speelterreinen[i].geo_point_2d,
          // if functies has a value, add it to the subtitle
          functies: functies,
        });
      }
    },
    OnClick(i) {
      this.$emit("selected-index", i);
    },
  },
};
</script>

<style scoped>
#list {
  width: 30rem;
}
</style>
