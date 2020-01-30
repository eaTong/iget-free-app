/**
 * Created by eatong on 2020/1/28.
 */

import React, {ReactChild} from 'react';
import {IonIcon} from "@ionic/react";
import { checkmarkCircleOutline} from "ionicons/icons";

interface TipsInterface {
  children?: ReactChild,
  title?: string
}

const Tips: React.FC<TipsInterface> = (props: TipsInterface) => {
    return (
      <div className={'et-tips'}>
        <IonIcon icon={checkmarkCircleOutline} className={'tips-icon'}/>
        <p className="title">{props.title}</p>
        {props.children || '糟糕，找不到想要的信息！'}
      </div>
    )
};
export default Tips;
