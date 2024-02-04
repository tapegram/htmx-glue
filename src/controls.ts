import registry from "./registery";
import events from "./events";
import Notifications from "./controls/Notification";
import Toggle from "./controls/Toggle";
import Modal from "./controls/Modal";
import Flyout from "./controls/Flyout";
import FileInput from "./controls/FileInput";

const global = (window as any);

function create(attachOnReadyQueue: HTMLElement[] = [], onReadyQueue: CallableFunction[] = []) {
  const controls = {
    ready() {
      attachOnReadyQueue.forEach(controls.attach);
      onReadyQueue.forEach(cb => cb());
    },
    onReady(cb: VoidFunction) {
      queueMicrotask(cb); // YcControls is already loaded and ready. Queue for next tick.
    },
    attach(element: HTMLElement) {
      console.log("[YcControls::attach()]", element);
      const controlKey = element.dataset.ycControl;

      if (!controlKey) {
        console.warn("Element has no `data-yc-control` attribute. Skipping.");
        return;
      }

      const control = registry.get(controlKey);
      if (!control) {
        console.warn(`No control found for key: ${controlKey}. Skipping.`);
        return;
      }

      control.attach(element);
    },
  };

  return controls;
}

function init() {
  const YcControls = global.YcControls = create(global.YcControls.attachOnReadyQueue, global.YcControls.onReadyQueue);

  events.init(registry);
  Notifications.init(registry);
  Toggle.init(registry);
  Modal.init(registry);
  Flyout.init(registry);
  FileInput.init(registry);

  YcControls.ready();
}

export default {
  init,
}
