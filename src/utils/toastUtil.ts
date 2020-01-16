import {Plugins} from '@capacitor/core';
import {isPlatform} from "@ionic/react";
import WebToast from "./Toast";

const {Toast} = Plugins;

function showToast(text: string, duration: 'short' | 'long' = 'short') {
  if (isPlatform('mobileweb')) {
    new WebToast({message: text, duration: 5000}).show();
  } else {

    Toast.show({
      text, duration
    });
  }
}

export default showToast;
