import { computed } from "vue";
import store from "@/store";

export function useThemeSelected() {
  return {
    themeSelected: computed(() => {
      return store.getters["theme/themeSelected"];
    }),
  };
}
