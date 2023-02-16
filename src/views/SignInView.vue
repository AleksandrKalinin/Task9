<template>
  <MainHeader />
  <SignInComponent />
</template>

<script>
import SignInComponent from "@/components/SignInComponent.vue";
import MainHeader from "@/components/MainHeader.vue";

export default {
  name: "SignInView",
  components: {
    SignInComponent,
    MainHeader,
  },
};
</script>
