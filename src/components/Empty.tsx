import React, {ReactChild} from 'react';
import {IonIcon} from "@ionic/react";
import {school} from "ionicons/icons";

interface EmptyInterface {
  children?: ReactChild,
  title?: string
}

const Empty: React.FC<EmptyInterface> = (props: EmptyInterface) => {
  return (
    <div className={'et-empty'}>
      <IonIcon icon={school} className={'empty-icon'}/>
      <p className="title">{props.title}</p>
      {props.children || '糟糕，找不到想要的信息！'}
    </div>
  )
};
export default Empty;
