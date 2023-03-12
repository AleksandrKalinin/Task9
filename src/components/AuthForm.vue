<template>
  <form class="auth-form" @submit.prevent="onSubmit({ email, password })">
    <h2 class="auth-form__title">{{ title }}</h2>
    <input
      type="email"
      name=""
      class="auth-form__input auth-input"
      v-model="email"
    />
    <input
      type="text"
      name=""
      class="auth-form__input auth-input"
      v-model="password"
    />
    <Button
      class="button button_regular button_large button_centered"
      :style="{ backgroundColor: themeSelected }"
      >Submit</Button
    >
    <p class="auth-form__text">
      {{ text }}
      <router-link class="auth-form__link" :to="{ name: routeLink }">{{
        routeText
      }}</router-link>
    </p>
    <p v-if="errorMessage" class="auth-form__error">{{ errorMessage }}</p>
  </form>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits, toRefs, Ref } from "vue";
import { useThemeSelected } from "../composables/useThemeSelected";
import Button from "@/components/Button.vue";

const password: Ref<string> = ref("");
const email: Ref<string> = ref<string>("");
const errorMessage: Ref<null | string> = ref(null);

const { themeSelected } = useThemeSelected();
const emit = defineEmits(["submit-user"]);

const props = defineProps({
  title: String,
  routeLink: String,
  routeText: String,
  text: String,
});

const { title, routeLink, routeText, text } = toRefs(props);

async function onSubmit({ email, password }) {
  emit("submit-user", { email, password });
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="sass">
@import "@/assets/styles/colorScheme.sass"
.register
  font-size: 18px
  min-height: calc(100vh - 80px)
  width: 100%
  display: flex
  justify-content: center
  align-items: center

.auth-form
  width: 500px
  display: flex
  flex-direction: column
  align-items: center
  border: 1px solid $main-color
  padding: 30px 20px

.auth-form__title
  text-align: center
  font-size: 24px
  text-transform: uppercase
  letter-spacing: 2px
  font-weight: 600
  margin-bottom: 20px

.auth-form__input
  width: 100%
  margin-bottom: 20px
  border: 1px solid $main-color
  outline: none
  font-size: 18px
  padding: 7px

.auth-form__text
  margin-top: 20px

.auth-form__error
  margin-top: 20px
</style>
