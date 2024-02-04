import { ControlRegistry } from "../registery";
import Toggle from "./Toggle";
import query from "../query"

const Flyout = {
  async attach(element: HTMLElement) {
    console.log("Flyout::attach()", element);

    const flyoutPanelElement = query(element, "[data-flyout-panel]") as HTMLElement;
    const toggle = Toggle.attach(flyoutPanelElement, {
      async toggleClosed() {
        element.parentElement?.removeChild(element);
      }
    });

    await toggle.open();
  }
};

function init(registry: ControlRegistry) {
  registry.registerControl("flyout", Flyout);
}

export default {
  init,
}