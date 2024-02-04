const global = (window as any);

export type ControlRegistry = {
  registerGlobalApi(api: any): void,
  registerControl(controlKey: string, control: any): void,
};

let controls = new Map<string, any>();

const YcControls_ = {
  attach(element: HTMLElement) {
    console.log("[YcControls::attach()]", element);
    const controlKey = element.dataset.ycControl;

    if (!controlKey) {
      console.warn("Element has no `data-yc-control` attribute. Skipping.");
      return;
    }

    const control = controls.get(controlKey);
    if (!control) {
      console.warn(`No control found for key: ${controlKey}. Skipping.`);
      return;
    }

    control.attach(element);
  },
};

function get(controlKey: string) {
  return controls.get(controlKey);
}

function registerControl(controlKey: string, control: any) {
  controls.set(controlKey, control);
}

function registerGlobalApi(api: any) {
  global.YcControls = {
    ...global.YcControls,
    ...api,
  }
}

export default {
  get,
  registerControl,
  registerGlobalApi,
}
