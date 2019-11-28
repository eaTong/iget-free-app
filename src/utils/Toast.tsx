import React from 'react';
import {render, unmountComponentAtNode} from 'react-dom';
import {IonToast} from '@ionic/react';

export interface ToastOptions {
  duration?: number,
  message?: string,
  key?: string
}

class Toast {
  constructor(options: ToastOptions) {
    this.options = options;
    this.toastContainer = document.createElement('div');
  }

  private toastContainer: HTMLDivElement;
  private options: ToastOptions;

  show() {
    const {message, duration} = this.options;
    document.body.appendChild(this.toastContainer);
    this.toastContainer.id = Math.random().toString();
    render((
      <IonToast
        isOpen
        message={message}
        duration={duration}
        onDidDismiss={() => this.destroy()}
      />), this.toastContainer);
    return this;
  }

  destroy() {
    unmountComponentAtNode(this.toastContainer);
    document.body.removeChild(this.toastContainer);
  }
}

export default Toast;
