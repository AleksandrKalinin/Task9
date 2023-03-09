import { shallowMount } from "@vue/test-utils";
import Button from "../components/Button.vue";

describe("Testing button component", () => {
  test("Testing button slot value", () => {
    const wrapper = shallowMount(Button, {
      slots: {
        default: "Submit",
      },
    });
    expect(wrapper.html()).toContain("Submit");
  });
});
