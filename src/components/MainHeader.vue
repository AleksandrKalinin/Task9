<template>
  <header class="header" :style="{ backgroundColor: themeSelected }">
    <nav class="menu">
      <router-link
        class="menu__link"
        :style="{ backgroundColor: themeSelected }"
        to="/"
        >Home</router-link
      >
      <router-link
        class="menu__link"
        :style="{ backgroundColor: themeSelected }"
        to="/recent"
        >Gallery</router-link
      >
    </nav>
    <div class="header_auth">
      <Button
        v-if="!username"
        class="button button_light button_small"
        :style="{ color: themeSelected }"
        @click="logIn"
        >Log in</Button
      >
      <div
        title="Press to log out"
        v-else
        class="header__username"
        v-on:click="logoutUser"
      >
        {{ username }}
      </div>
    </div>
  </header>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapActions, mapGetters } from "vuex";
import router from "@/router";
import { auth } from "@/database/index";
import { onAuthStateChanged } from "firebase/auth";
import Button from "@/components/Button.vue";

export default defineComponent({
  name: "MainHeader",

  components: {
    Button,
  },

  data() {
    return {
      username: null as null | string,
    };
  },

  computed: {
    ...mapGetters("theme", ["themeSelected"]),
  },

  methods: {
    ...mapActions("auth", ["logoutUser"]),

    ...mapActions(["showSuccessToast", "showErrorToast"]),

    logIn() {
      router.push("/signin");
    },
  },

  watch: {
    username(newVal) {
      if (newVal === null) {
        this.showSuccessToast("You are logged out!");
      }
    },
  },

  mounted() {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.username = user.email;
      } else {
        this.username = null;
      }
    });
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="sass">
@import "@/assets/styles/colorScheme.sass"
header
  width: 100%
  height: 80px
  background: $main-color
  display: flex
  justify-content: space-between
  align-items: center
  padding: 0 20px

  .header__username
    color: #ffffff
    cursor: pointer
    text-decoration: underline

  .menu
    height: 100%
    display: flex

    .menu__link
      color: #ffffff
      display: flex
      height: 100%
      padding: 0 20px
      text-decoration: none
      align-items: center
      transition: .1s all

    .menu__link:hover
      filter: brightness(90%)
</style>
