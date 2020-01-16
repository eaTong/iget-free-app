/**
 * Created by eatong on 2020/1/2.
 */

import React from 'react';
import {IonItem, IonLabel} from "@ionic/react";


interface ObjectiveListItemInterface {
  objective: any,
  key: any,
  history: any
}

const ObjectiveListItem: React.FC<ObjectiveListItemInterface> = (props: ObjectiveListItemInterface) => {
  const {objective, history} = props;

  function viewDetail(event: any) {
    event.stopPropagation();
    event.preventDefault();
    history.push(`/okr/detail/${objective.id}`)
  }

  return (
    <IonItem button onClick={viewDetail}>
      <IonLabel>
        <h3>{objective.name}</h3>
        <p>{objective.description}</p>
      </IonLabel>
    </IonItem>
  )
};
export default ObjectiveListItem;
