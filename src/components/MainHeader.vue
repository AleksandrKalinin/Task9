<template>
  <header class="header">
    <nav class="menu">
      <router-link class="menu__link" to="/">Home</router-link>
      <router-link class="menu__link" to="/recent">Gallery</router-link>
    </nav>
    <div class="header_auth">
      <button
        v-if="!username"
        class="button button_small button_outline"
        @click="logIn"
      >
        Log in
      </button>
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
import { mapActions } from "vuex";
import router from "@/router";
import { auth } from "@/database/index";
import { onAuthStateChanged } from "firebase/auth";

export default defineComponent({
  name: "MainHeader",

  data() {
    return {
      username: null as null | string,
    };
  },

  methods: {
    ...mapActions("auth", ["logoutUser"]),

    ...mapActions(["showSuccessToast"]),

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
      background: #EF5C43
</style>
