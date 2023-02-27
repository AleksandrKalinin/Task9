export function authErrorHandler(error: string) {
  switch (error) {
    case "auth/invalid-email":
      return {
        toast: "showErrorToast",
        message: "Incorrect email or password!",
      };
      break;
    case "auth/user-not-found":
      return {
        toast: "showErrorToast",
        message: "No user with such email was found!",
      };
      break;
    case "auth/wrong-password":
      return { toast: "showErrorToast", message: "Incorrect password!" };
      break;
    case "auth/email-already-in-use":
      return {
        toast: "showErrorToast",
        message: "Email already in use!",
      };
      break;
    default:
      return {
        toast: "showErrorToast",
        message: "Incorrect email or password!",
      };
      break;
  }
}
