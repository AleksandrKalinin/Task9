import store from "@/store";

export function useToast(action: string, message: string) {
  store.dispatch(action, message);
}
