import store from "@/store";

describe("Testing actions in store", () => {
  test("Testing setTheme action in themeModule", () => {
    store.dispatch("theme/setTheme", "#222222");
    expect(store.state.theme.themeSelected).toBe("#222222");
  });

  test("Testing saveSelectedItem action in canvasModule", () => {
    store.dispatch("canvas/saveSelectedItem", "New item");
    expect(store.state.canvas.selectedItem).toBe("New item");
  });

  test("Testing saveCanvas action in canvasModule", () => {
    const canvas = document.createElement("canvas");
    store.dispatch("canvas/saveCanvas", canvas);
    expect(store.state.canvas.canvas.nodeName.toLowerCase()).toBe("canvas");
  });
});
