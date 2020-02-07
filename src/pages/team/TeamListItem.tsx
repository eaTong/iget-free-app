/**
 * Created by eatong on 2020/1/2.
 */

import React from 'react';
import {IonIcon, IonItem, IonLabel, IonNote} from "@ionic/react";
import {lock} from "ionicons/icons";

interface TeamListItemInterface {
  team: any,
  key: any,
  history: any
}

const TeamListItem: React.FC<TeamListItemInterface> = (props: TeamListItemInterface) => {
  const {team, history} = props;

  function viewDetail(event: any) {
    event.stopPropagation();
    event.preventDefault();
    history.push(`/team/detail/${team.id}`)
  }

  return (
    <IonItem button onClick={viewDetail}>
      <IonLabel>
        <h3>{team.name}</h3>
        <p>{team.description}</p>
      </IonLabel>
      {team.needPassword && (
        <IonNote color="success" slot={'end'}>
          <IonIcon icon={lock}/>
        </IonNote>
      )}
    </IonItem>
  )
};
export default TeamListItem;
