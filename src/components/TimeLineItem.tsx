/**
 * Created by eatong on 2020/1/28.
 */

import React, {ReactElement} from 'react';
import {IonIcon} from "@ionic/react";
import {time} from "ionicons/icons";

interface TimeLineItemInterface {
  children: ReactElement,
  title?: any,
  statusTag?: any,
}

const TimeLineItem: React.FC<TimeLineItemInterface> = (props: TimeLineItemInterface) => {
  const {children, title, statusTag} = props;
  return (
    <div className={'et-timeline-item'}>
      <IonIcon icon={time}/>
      <div className="et-timeline-content-container">
        {title && (
          <div className="et-timeline-title">
            <div className="title-content">{title}</div>
            <div className="status-tag">{statusTag}</div>
          </div>
        )}
        <div className="et-timeline-content">
          {children}
        </div>
      </div>
    </div>
  )
};
export default TimeLineItem;
