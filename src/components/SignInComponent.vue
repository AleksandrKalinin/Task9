<template>
  <div class="register">
    <AuthForm
      title="Log in"
      text="Don't have an account yet?"
      routeText="Register now"
      routeLink="register"
      @submitUser="signInExistingUser"
    ></AuthForm>
  </div>
</template>

<script setup>
import router from "@/router";
import AuthForm from "@/components/AuthForm.vue";
import store from "@/store";

function redirectToPage() {
  router.push("/");
  store.dispatch("showSuccessToast", "You are logged in!");
}

function signInExistingUser({ email, password }) {
  store
    .dispatch("auth/signInUser", { email, password })
    .then(() => redirectToPage());
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
  padding: 20px

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
