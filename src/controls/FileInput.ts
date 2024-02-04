import { ControlRegistry } from "../registery";
import query from "../query"
import { FileChangeInfo } from "fs/promises";
import { file } from "bun";

const FileInput = {
  async attach(element: HTMLElement) {
    console.log("FileInput::attach()", element);

    const selectedMessageElement = query(element, "[data-file-input-selected-message]");
    const fileInput = query(element, "input[type=file]") as HTMLInputElement;

    element.addEventListener("dragover", handleDragover);
    element.addEventListener("drop", handleDrop);
    element.addEventListener("dragleave", handleDragleave);
    fileInput.addEventListener("change", handleFileInputChange);

    function handleDragover(ev: DragEvent) {
      ev.preventDefault();
      ev.stopPropagation();
      element.dataset.dragover = "true";
    }

    function handleDragleave(ev: DragEvent) {
      ev.preventDefault();
      ev.stopPropagation();
      delete element.dataset.dragover;
    }

    function handleDrop(ev: DragEvent) {
      ev.preventDefault();
      ev.stopPropagation();

      fileSelected();

      fileInput.files = ev.dataTransfer!.files;
      showSelectedFiles()
    }

    function fileSelected() {
      delete element.dataset.dragover;
      element.classList.add("file-selected");
    }

    function handleFileInputChange(ev: Event) {
      fileSelected();
      showSelectedFiles();
    }

    function showSelectedFiles() {
      [...fileInput.files!].forEach((file, i) => {
        selectedMessageElement.textContent = `File selected: ${file.name}`;
      });
    }
  },
};

function init(registry: ControlRegistry) {
  registry.registerControl("file-input", FileInput);
}

export default {
  init,
}