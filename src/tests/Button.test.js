import { mount } from "@vue/test-utils";
import Button from "../components/Button.vue";

describe("Testing button component", () => {
  test("Testing button slot value", () => {
    const wrapper = mount(Button, {
      slots: {
        default: "Submit",
      },
    });
    expect(wrapper.html()).toContain("Submit");
  });
});
