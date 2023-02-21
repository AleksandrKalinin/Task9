<template>
  <div class="register">
    <AuthForm
      title="Log in"
      text="Don't have an account yet?"
      routeText="Register now"
      routeLink="register"
      @submitUser="signInUser"
    ></AuthForm>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import AuthForm from "@/components/AuthForm.vue";

export default {
  name: "SignInComponent",

  components: {
    AuthForm,
  },

  data() {
    return {};
  },

  computed: {},

  methods: {
    ...mapActions("auth", ["signInUser"]),
  },
};
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
