import React, {Component} from "react";
import {
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonContent,
  IonBackButton,
  IonButtons, withIonLifeCycle
} from "@ionic/react";
import {PagePropsInterface} from "../../utils/PagePropsInterface";

interface CreateTeamPageState {

}

class CreateTeamPage extends Component<PagePropsInterface, CreateTeamPageState> {
  state = {};


  render() {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton/>
            </IonButtons>
            <IonTitle>创建团队</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>

        </IonContent>

      </IonPage>
    )
  }
}

export default withIonLifeCycle(CreateTeamPage);
