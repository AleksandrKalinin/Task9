require("dotenv").config();
import { defineComponent } from "vue";
import store from "@/store";
import { shallowMount } from "@vue/test-utils";
import { useThemeSelected } from "@/composables/useThemeSelected";

test("Testing value that composable should return", () => {
  const TestComponent = defineComponent({
    template: "<div></div>",
    props: {},
    setup() {
      return {
        ...useThemeSelected(),
      };
    },
  });

  const wrapper = shallowMount(TestComponent, {});

  expect(wrapper.vm.themeSelected).toEqual(
    store.getters["theme/themeSelected"]
  );
});
