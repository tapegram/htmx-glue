import events from "../events";
import query from "../query";
import { ControlRegistry } from "../registery";
import Toggle from "./Toggle";

type NotificationEventDetails
  = { kind: 'SUCCESS' | 'ERROR' | 'GENERIC' }
  & Partial<NotificationCommand>;

type NotificationCommand = {
  title: string,
  message: string,
}

type RenderTemplateDelegate = {
  iconElement?: Element | undefined,
  notificationWillAppend?: (notificationEl: HTMLElement) => void,
};

function renderStandardTemplate({ title, message, ...delegate }: NotificationCommand & RenderTemplateDelegate) {
  const tpl = query(document, "#tpl-notification") as HTMLTemplateElement;
  const notification = tpl.content.cloneNode(true) as HTMLElement;

  const elements = query.bulk(notification, {
    title: "[data-notification-title]",
    message: "[data-notification-message]",
    defaultIcon: "[data-notification-icon]",
  });

  elements.title.textContent = title;
  elements.message.textContent = message || "Everything is all good!";

  if (delegate.iconElement) {
    elements.defaultIcon.replaceWith(delegate.iconElement);
  }

  delegate.notificationWillAppend?.(notification);
  return Notifications.appendNotification(notification);
};

function renderCustomTemplate(templateSelector: string | HTMLTemplateElement) {
  const tpl = (() => {
    if (typeof templateSelector === "string") {
      return query(document, templateSelector) as HTMLTemplateElement;

    } else if (templateSelector instanceof HTMLTemplateElement) {
      return templateSelector;

    } else {
      throw new Error("Invaliad argument. Expected selector string or HTMLTemplateElement.");
    }
  })();

  const notification = tpl.content.cloneNode(true) as HTMLElement;
  // Ensure notification is clickable (live-region disables pointer events)
  notification.firstElementChild?.classList.add("pointer-events-auto");

  return Notifications.appendNotification(notification);
}

function iconFromTemplate(iconKey: "success" | "error" | "info") {
  const tpl = query(document, "#tpl-notification-icons") as HTMLTemplateElement;
  const iconsTemplate = tpl.content.cloneNode(true) as HTMLElement;

  return query(iconsTemplate, `[data-notification-icon=${iconKey}]`);
}

const Notifications = {
  init() {
    events.on("yc:notificationRequest", (request: NotificationEventDetails) => {
      const { title = "Notification", message = "", } = request;
      switch (request.kind) {
        case "SUCCESS":
          Notifications.showSuccess(message);
          break;
        case "ERROR":
          Notifications.showError(message);
          break;
        case "GENERIC":
          Notifications.show(title, message);
          break;
      }
    });
  },

  async appendNotification(notification: HTMLElement) {
    // Fragments don't provide a reference to DOM element, first child is actual element attached.
    const notificationElement = notification.firstElementChild!;
    const contentElement = query(document, "#notification-live-region [data-notification-content]");

    const toggle = Toggle.attach(notificationElement as HTMLElement, {
      toggleWillOpen: () => contentElement.appendChild(notification),
      toggleClosed: () => contentElement.removeChild(notificationElement),
      shouldToggleCloseOnBodyClick: false,
    });

    return await toggle.open();
  },

  show: (title: string, message: string) => renderStandardTemplate({ title, message }),

  showSuccess: (message: string) => renderStandardTemplate({
    title: "Success!",
    message,
    iconElement: iconFromTemplate("success"),
  }),

  showError: (message: string) => renderStandardTemplate({
    title: "Oops! Something went wrong",
    message,
    iconElement: iconFromTemplate("error"),
  }),
};

function init(registry: ControlRegistry) {
  Notifications.init();

  registry.registerGlobalApi({
    showNotification: Notifications.show,
    showSuccessNotification: Notifications.showSuccess,
    showErrorNotification: Notifications.showError,
    showNotificationWithTemplate: renderCustomTemplate,
  });
}

export default {
  init,
}
