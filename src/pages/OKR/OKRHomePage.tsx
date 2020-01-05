import React, {Component} from "react";
import {
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonContent,
  IonButtons, IonBackButton
} from "@ionic/react";
import {PagePropsInterface} from "../../utils/PagePropsInterface";

interface OKRHomePageState {

}

class OKRHomePage extends Component<PagePropsInterface, OKRHomePageState> {
  state = {};


  render() {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton/>
            </IonButtons>
            <IonTitle>我的OKR</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>

        </IonContent>

      </IonPage>
    )
  }
}

export default OKRHomePage;
