/**
 * Created by eatong on 2020/1/3.
 */

import React from 'react';
import {Plugins, CameraResultType} from '@capacitor/core';

const {Camera} = Plugins;

interface ImagePickerInterface {
  onChange?: Function,
  value?: Array<any>,
}

const ImagePicker: React.FC<ImagePickerInterface> = (props: ImagePickerInterface) => {
  const {onChange, value} = props;

  async function takePicture() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.Uri
    });
    console.log(image, value, onChange);
  }

  return (
    <div onClick={() => takePicture()}>
      takePicture
    </div>
  )
};


export default ImagePicker;
