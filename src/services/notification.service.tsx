import React from "react";
import ReactDOM from "react-dom";
import { createRoot} from "react-dom/client";
import CustomToast from "@/components/ui/CustomToast"; // Make sure to import CustomToast correctly

class NotificationService {
  static showCustomToast({ type, message, addedText, position }) {
    const container = document.createElement("div");
    const root = createRoot(container)
    document.body.appendChild(container);

    // log content of message and addedText
    console.log(message);
    console.log(addedText);

    if (message.type === 'p') {
      message = String(message).replace("<p>", "").replace("</p>", "");
    }
    if (addedText.type === 'p') {
      addedText = addedText.props.children;
    }

    // Render the toast component

    root.render(
      <CustomToast
        type={type}
        message={message}
        addedText={addedText}
        position={position}
      />
    );

    // Automatically remove the notification after 3 seconds
    setTimeout(() => {
      root.unmount();
      document.body.removeChild(container);
    }, 3000);
  }

  static success({ message, addedText, position }) {
    this.showCustomToast({
      type: "success",
      message,
      addedText,
      position,
    });
  }

  static error({ message, addedText, position }) {
    this.showCustomToast({
      type: "error",
      message,
      addedText,
      position,
    });
  }

  static warn({ message, addedText, position }) {
    this.showCustomToast({
      type: "warn",
      message,
      addedText,
      position,
    });
  }
}

export default NotificationService;
