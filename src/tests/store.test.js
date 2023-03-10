import store from "@/store";

describe("Testing actions in store", () => {
  test("Testing setTheme action in themeModule", () => {
    store.dispatch("theme/setTheme", "#222222");
    expect(store.state.theme.themeSelected).toBe("#222222");
  });

  test("Testing setFillStyle action in canvasModule", () => {
    store.dispatch("canvas/setFillStyle", "outline");
    expect(store.state.canvas.fillStyle).toBe("outline");
  });

  test("Testing setLineWidth action in canvasModule", () => {
    store.dispatch("canvas/setLineWidth", 5);
    expect(store.state.canvas.lineWidth).toBe(5);
  });

  test("Testing setColor action in canvasModule", () => {
    store.dispatch("canvas/setColor", "#222222");
    expect(store.state.canvas.selectedColor).toBe("#222222");
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
