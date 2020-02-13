/**
 * Created by eatong on 2020/2/7.
 */

import React from 'react';
import {IonButton, IonIcon, IonLabel} from "@ionic/react";
import {arrowBack} from "ionicons/icons";
import * as H from 'history';
import {isPlatform} from '@ionic/react';

interface BackButtonInterface {
  history: H.History
}

const BackButton: React.FC<BackButtonInterface> = (props: BackButtonInterface) => {
  const {history} = props;
  return (
    <IonButton onClick={() => history.goBack()}>
      <IonIcon icon={arrowBack}/>
      {isPlatform('android') || (
        <IonLabel>返回</IonLabel>
      )}
    </IonButton>
  )
};
export default BackButton;
