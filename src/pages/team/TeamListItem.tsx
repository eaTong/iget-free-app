/**
 * Created by eatong on 2020/1/2.
 */

import React from 'react';
import {IonItem, IonLabel, IonNote, IonIcon} from "@ionic/react";
import {lock} from "ionicons/icons";

interface TeamListItemInterface {
  team: any,
  key: any
}

const TeamListItem: React.FC<TeamListItemInterface> = (props: TeamListItemInterface) => {
  const {team} = props;
  return (
    <IonItem button routerLink={`/team/detail/${team.id}`}>
      <IonLabel>{team.name}</IonLabel>
      {team.needPassword &&(
        <IonNote color="success" slot={'end'}>
          <IonIcon icon={lock}/>
        </IonNote>
      )}
    </IonItem>
  )
};
export default TeamListItem;
