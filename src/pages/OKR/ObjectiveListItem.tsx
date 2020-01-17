/**
 * Created by eatong on 2020/1/2.
 */

import React from 'react';
import {IonItem, IonLabel, IonText} from "@ionic/react";
import {Circle} from "../../components/Circle";


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
      {objective.progress > 0 && (
        <IonText slot={'end'}>
          <Circle
            size="30"
            progress={objective.progress}
            textStyle={{fontSize: 150}}
            showPercentageSymbol={false}
          />
        </IonText>
      )}
    </IonItem>
  )
};
export default ObjectiveListItem;
