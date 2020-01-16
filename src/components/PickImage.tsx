/**
 * Created by eatong on 2020/1/3.
 */

import React from 'react';
import {getThumbnail, getThumbnailList, takePicture} from "../utils/utils";
import {IonIcon} from "@ionic/react";
import {add, close} from "ionicons/icons";
import PreviewImage from "../utils/image-preview";

interface ImagePickerInterface {
  onChange?: Function,
  value?: Array<string>,
}

const PickImage: React.FC<ImagePickerInterface> = (props: ImagePickerInterface) => {

  const {value, onChange} = props;

  async function pickImage() {
    const images = await takePicture();
    onChange && onChange(value ? [...value, ...images] : images);
  }

  function deleteImage(index: number) {
    const newList = [...(value || [])];
    newList.splice(index, 1);
    onChange && onChange(newList);
  }

  function previewImage(index: number) {
    new PreviewImage({urls: value, index}).preview();
  }

  return (
    <div className='et-pick-image-list'>
      {getThumbnailList(value).map((src: string, index: number) => (
        <div className={'et-image-item'} key={src + index} onClick={() => previewImage(index)}>
          <div className="et-image-box">
            {onChange && <IonIcon className={'delete-icon'} icon={close} onClick={() => deleteImage(index)}/>}
            <img alt={src} src={getThumbnail(src)}/>
          </div>
        </div>
      ))}
      {onChange && (
        <div className={'add-picture-container et-image-item'} onClick={() => pickImage()}>
          <div className="et-image-box">
            <IonIcon icon={add} className={'add-picture'}/>
            <div className={'label'}>选择图片</div>
          </div>
        </div>
      )}
    </div>
  )
};


export default PickImage;
