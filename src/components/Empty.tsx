import React, {ReactChild} from 'react';
import {IonItem, IonLabel, IonIcon} from "@ionic/react";
import {school} from "ionicons/icons";

interface EmptyInterface {
  children: ReactChild,
}

const Empty: React.FC<EmptyInterface> = (props: EmptyInterface) => {
  return (
    <div className={'et-empty'}>
      <IonIcon icon={school} className={'empty-icon'}/>
      {props.children}
    </div>
  )
};
export default Empty;
