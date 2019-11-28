import Toast from "./Toast";

function showToast(message: string) {
  new Toast({message, duration: 3000}).show();
}

export default showToast;
