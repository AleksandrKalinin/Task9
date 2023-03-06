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
<script setup lang="ts">
import { ref, computed, onMounted, watch, Ref } from "vue";
import { useStore } from "vuex";
import router from "@/router";
import Button from "@/components/Button.vue";
const store = useStore();

const username: Ref<null | string> = ref(null);
const themeSelected = computed(() => store.getters["theme/themeSelected"]);

function logIn() {
  router.push("/signin");
}

function logoutUser(): void {
  store.dispatch("auth/logoutUser");
}

async function getCurrentUser() {
  const user = await store.dispatch("auth/getCurrentUser");
  if (user) {
    username.value = user.email;
  } else {
    username.value = null;
  }
}

watch(username, (newValue) => {
  if (newValue === null) {
    store.dispatch("showSuccessToast", "You are logged out!");
  }
});

onMounted(() => {
  getCurrentUser();
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
