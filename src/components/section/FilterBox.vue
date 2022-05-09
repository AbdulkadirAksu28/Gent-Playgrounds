<template>
  <v-col cols="12" class="mb-10 pb-5">
    <v-combobox
      v-model="select"
      :items="items"
      label="Filter"
      multiple
      chips
      color="yellow"
      @change="onChange()"
    ></v-combobox>
  </v-col>
</template>

<script>
import speelterreinen from "../../data/speelterreinen-gent.json";

export default {
  name: "myFilterBox",
  data() {
    return {
      select: [],
      items: ["Rustig parkje"],
      filteredFunctions: [],
    };
  },
  mounted() {
    this.filterData(), this.getItems();
  },
  methods: {
    // fill items of combobox with data
    filterData() {
      // loop through the data and add the items to the items array
      for (let i = 0; i < speelterreinen.length; i++) {
        // if speelterreinen[i].functies consists a , split it and add it to a new array
        if (speelterreinen[i].functies) {
          let functies = speelterreinen[i].functies.split(", ");
          for (let j = 0; j < functies.length; j++) {
            this.filteredFunctions.push(functies[j]);
          }
        }
      }
    },
    getItems() {
      // loop through filteredFunctions and add the items to the items array if it is not already in the items array
      for (let i = 0; i < this.filteredFunctions.length; i++) {
        if (!this.items.includes(this.filteredFunctions[i])) {
          // capitalise filteredFunctions[i]
          let capitalised =
            this.filteredFunctions[i].charAt(0).toUpperCase() +
            this.filteredFunctions[i].slice(1);

          this.items.push(capitalised);
        }
      }
    },
    onChange() {
      this.$store.commit("getselectdata", this.select);
      this.$emit("selected-data", this.select);
    },
  },
};
</script>

<style >
</style>
