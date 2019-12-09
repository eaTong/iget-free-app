import React, {ReactChild} from 'react';
import {IonItem, IonLabel, IonIcon} from "@ionic/react";
import {star, starOutline} from "ionicons/icons";

interface RateInterface {
  value: number,
  onChange?: any,
}

const TOTAL_RATE = 5;
const Rate: React.FC<RateInterface> = (props: RateInterface) => {
  const {value, onChange} = props;

  function getStar(num: number, icon: any, offset = 0) {
    return num ? new Array(num).join(',').split(',').map((val, i) => (
      <IonIcon icon={icon} key={i} onClick={() => onChange && onChange(offset + i + 1)}/>
    )) : ''
  }

  return (
    <div className={'et-rate'}>
      {getStar(value, star)}
      {getStar(TOTAL_RATE - value, starOutline, value)}
    </div>
  )
};


export default Rate;
