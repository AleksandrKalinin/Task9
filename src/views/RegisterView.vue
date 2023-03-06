<template>
  <MainHeader />
  <RegisterComponent />
</template>

<script>
import RegisterComponent from "@/components/RegisterComponent.vue";
import MainHeader from "@/components/MainHeader.vue";

export default {
  name: "RegisterView",
  components: {
    RegisterComponent,
    MainHeader,
  },
};
</script>
