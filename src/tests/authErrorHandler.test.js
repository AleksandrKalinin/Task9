import { authErrorHandler } from "@/helpers/authErrorHandler";

describe("Testing authErrorHandler function", () => {
  test("Invalid email", () => {
    const { toast, message } = authErrorHandler("auth/invalid-email");
    expect(toast).toBe("showErrorToast");
    expect(message).toBe("Incorrect email or password!");
  });

  test("Non-existing user", () => {
    const { toast, message } = authErrorHandler("auth/user-not-found");
    expect(toast).toBe("showErrorToast");
    expect(message).toBe("No user with such email was found!");
  });

  test("Incorrect password", () => {
    const { toast, message } = authErrorHandler("auth/wrong-password");
    expect(toast).toBe("showErrorToast");
    expect(message).toBe("Incorrect password!");
  });

  test("Email already in use", () => {
    const { toast, message } = authErrorHandler("auth/email-already-in-use");
    expect(toast).toBe("showErrorToast");
    expect(message).toBe("Email already in use!");
  });

  test("Default error", () => {
    const { toast, message } = authErrorHandler();
    expect(toast).toBe("showErrorToast");
    expect(message).toBe("Incorrect email or password!");
  });
});
