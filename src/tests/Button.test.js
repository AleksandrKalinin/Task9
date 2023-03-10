import { shallowMount } from "@vue/test-utils";
import Button from "../components/Button.vue";

describe("Testing button component", () => {
  const wrapper = shallowMount(Button, {
    props: {
      onClick: jest.fn(),
    },
    slots: {
      default: "Submit",
    },
  });
  test("Testing button slot value", () => {
    expect(wrapper.html()).toContain("Submit");
  });
  test("Testing button prop function", () => {
    wrapper.find("button").trigger("click");
    expect(wrapper.vm.onClick).toHaveBeenCalledTimes(1);
  });
});
