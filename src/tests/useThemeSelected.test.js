import { defineComponent, computed } from "vue";
import { createStore } from "vuex";
import { mount } from "@vue/test-utils";

const store = createStore({
  state() {
    return {
      themeSelected: "222222",
    };
  },
  getters: {
    themeSelected(state) {
      return state.themeSelected;
    },
  },
  mutations: {
    increment(state) {
      state.count += 1;
    },
  },
});

function useThemeSelected() {
  return {
    themeSelected: computed(() => {
      return store.getters.themeSelected;
    }),
  };
}

test("Testing value that composable should return", () => {
  const TestComponent = defineComponent({
    props: {},
    setup(props) {
      return {
        ...useThemeSelected(),
      };
    },
  });

  const wrapper = mount(TestComponent, {});

  expect(wrapper.vm.themeSelected).toEqual(store.state.themeSelected);
});
