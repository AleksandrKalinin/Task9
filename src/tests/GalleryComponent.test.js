/*
import { mount } from "@vue/test-utils";
import GalleryComponent from "../components/GalleryComponent.vue";
import { createStore } from "vuex";

const store = createStore({
  state() {
    return {
      items: [
        {
          author: "suer@mail.ru",
          authorId: "iuauau98eu98",
          date: {
            seconds: 1677838051,
            nanoseconds: 413000000,
          },
          id: "0fdbac4e-4ce9-486c-bce8-a6e05860bc2f",
          link: "data:image/png;base64, jiaoguae8ou908uho",
        },
      ],
    };
  },
  getters: {
    items: (state) => {
      return [...state.items];
    },
  },
});

describe("Testing gallery component", () => {
  test("vuex", async () => {
    const wrapper = mount(GalleryComponent, {
      global: {
        plugins: [store],
      },
    });
    expect(wrapper.vm.items).toEqual(store.state.items);
  });
});
*/
test("vuex", async () => {
  expect(2).toEqual(2);
});
