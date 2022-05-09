<template>
  <v-footer ref="footer" paddless default class="footer" id="footer">
    <v-container class="social-icons py-0">
      <v-btn
        icon
        @click="scrolltop"
        color="white"
        class="d-inline-block ma-2 pa-2 icon up right"
        elevation="10"
        tile
      >
        <v-icon> mdi-chevron-double-up </v-icon>
      </v-btn>

      <v-btn
        icon
        color="#f1f1f1"
        class="d-inline-block ma-2 pa-2 icon right"
        tile
        v-for="i in socialmedia"
        :key="i.icon"
        :href="i.src"
        target="_blank"
        elevation="10"
        large
      >
        <v-icon>
          {{ i.icon }}
        </v-icon>
      </v-btn>

      <p class="copyright">
        Abdulkadir Aksu
        <span class="text-warning">
          <v-icon color="orange" class="copyright-icon my-auto" size="16px">
            mdi-copyright </v-icon
          >{{ year }}
        </span>
      </p>

      <!-- credits             -->
      <!-- giving credits is not neccessary but keeping this will be considered a token of appreciation and will be helpfull also  -->
      <p class="gray pb-3 credit">
        Designed and Developed for my task at
        <a
          class="text-warning text-decoration-none"
          href="https://www.appwise.be/"
          >Wisemen</a
        >
      </p>
    </v-container>
  </v-footer>
</template>
<script>
export default {
  name: "myFooter",
  components: {},
  data() {
    return {};
  },
  computed: {
    socialmedia() {
      return this.$store.state.Sociallinks;
    },
    year() {
      var d = new Date();
      return d.getFullYear();
    },
  },
  methods: {
    scrolltop() {
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
  },
};
</script>
<style scoped>
#footer {
  background-color: var(--main-bg-color);
  opacity: 95%;
}

.social-icons {
  display: block;

  text-align: center;
  padding: auto;
}
.icon {
  vertical-align: middle;
  background-color: var(--gray);
  margin: auto;
  padding: auto;
  height: 40x;
}

.right {
  float: right;
}

.up {
  height: 44px;
  /* background-color: var(--accent-color); */
  margin: auto;
  margin-top: -18px;
}
.copyright {
  margin-top: 4.2rem;
  font-size: 16px;
  /* text-align: center; */
  color: var(--gray);
  font-weight: bold;
  text-align: right;
}
.copyright > span {
  color: var(--highlight-color);
}

/* .copyright-icon{
     color : white;
     background-color: var(--highlight-color);
} */

.credit {
  color: var(--gray);
  font-family: var(--secondary-font);
  font-weight: medium;
  text-align: right;
}
</style>
