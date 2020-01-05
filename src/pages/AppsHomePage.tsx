/**
 * Created by eatong on 2020/1/4.
 */

import React, {Component} from "react";
import {
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonContent,
  withIonLifeCycle, IonList, IonItem,
} from "@ionic/react";
import {PagePropsInterface} from "../utils/PagePropsInterface";
import {checkTabBarShouldHide, showTabBar} from "../utils/utils";

interface AppsHomePageState {

}

class AppsHomePage extends Component<PagePropsInterface, AppsHomePageState> {
  state = {};

  ionViewWillEnter() {
    showTabBar()
  }

  ionViewDidLeave() {
    checkTabBarShouldHide(this.props.history, this.props.location);
  }

  render() {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>百宝箱</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonList>
            <IonItem routerLink={'/book/home'} detail>书香</IonItem>
          </IonList>

        </IonContent>

      </IonPage>
    )
  }
}

export default withIonLifeCycle(AppsHomePage);
