import { ControlRegistry } from "./registery";
import query from "./query";

type YcEventDetail = any;
type YcEventHandler = (detail: YcEventDetail, originalEvent: CustomEvent) => void;
type TriggerCommand = {
  target?: Element,
  event: string,
  detail?: YcEventDetail,
};

let appElement: Element | null = null;

/**
 * event name should begin with prefix `yc:`
 */
function trigger({ target = appElement!, event, detail = {} }: TriggerCommand): void {
  target!.dispatchEvent(new CustomEvent(event, { detail }));
}

function on(eventName: string, handler: YcEventHandler) {
  function cb(event: Event) {
    const detail = (event as CustomEvent).detail;
    return handler(detail, event as CustomEvent);
  }

  appElement!.addEventListener(eventName, cb);

  return () => {
    appElement!.removeEventListener(eventName, cb);
  };
}

function init(register: ControlRegistry) {
  appElement = query(document, "[data-yc-app]");

  register.registerGlobalApi({
    on,
    trigger,
  });
}

export default {
  init,
  on,
  trigger,
}
