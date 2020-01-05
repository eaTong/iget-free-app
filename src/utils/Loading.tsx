import React from 'react';
import {render, unmountComponentAtNode} from 'react-dom';
import {IonLoading} from '@ionic/react';

export interface LoadingOptions {
  duration?: number,
  message?: string,
  key?: string
}

class Loading {
  constructor(options: LoadingOptions) {
    this.options = options;
    this.toastContainer = document.createElement('div');
  }

  private toastContainer: HTMLDivElement;
  private options: LoadingOptions;

  show() {
    const {message, duration} = this.options;
    document.body.appendChild(this.toastContainer);
    this.toastContainer.id = Math.random().toString();
    render((
      <IonLoading
        isOpen
        message={message}
        duration={duration}
      />), this.toastContainer);
    return this;
  }

  destroy() {
    unmountComponentAtNode(this.toastContainer);
    document.body.removeChild(this.toastContainer);
  }
}

export default Loading;
