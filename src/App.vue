<template>
  <v-app>
    <v-main>
      <myNavbar />
      <myMap />
      <myFooter />
    </v-main>
  </v-app>
</template>

<script>
import myFooter from "./components/Footer";
import myMap from "./components/Map";
import myNavbar from "./components/Navbar";

export default {
  name: "App",

  components: {
    myMap,
    myFooter,
    myNavbar,
  },

  data: () => ({
    //
  }),
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Montserrat&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Work+Sans&display=swap");
:root {
  --main-bg-color: #1a1a1d;
  --gray: #4e4e50;
  --highlight-color: #950740;
  --accent-color: #c30734;
  --dark-accent: #6f2232;
  --primary-font: "Montserrat", sans-serif;
  --secondary-font: "Work Sans", sans-serif;
}
.work-sans {
  font-family: "Work Sans", sans-serif;
}

.montserrat {
  font-family: "Montserrat", sans-serif;
}

* {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body {
  font-family: "Work Sans", sans-serif;
  font-weight: 300;
  overflow: hidden;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  font-family: "Montserrat", sans-serif;
  font-weight: 900;
}

html {
  scrollbar-width: thin !important;
}
</style>
