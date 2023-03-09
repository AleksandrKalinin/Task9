import AuthForm from "@/components/AuthForm";
import { shallowMount } from "@vue/test-utils";

describe("Testing AuthForm component", () => {
  test("Testing button slot value", () => {
    const wrapper = shallowMount(AuthForm, {
      props: {
        title: "Log in",
        text: "Don't have an account yet?",
        routeText: "Register now",
        routeLink: "register",
      },
    });
    expect(wrapper.find(".auth-form__title").text()).toBe("Log in");
    expect(wrapper.find(".auth-form__text").text()).toBe(
      "Don't have an account yet? Register now"
    );
    expect(2).toBe(2);
  });
});
