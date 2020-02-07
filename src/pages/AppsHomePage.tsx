/**
 * Created by eatong on 2020/1/4.
 */

import React, {Component} from "react";
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonItemDivider,
  IonLabel,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
  withIonLifeCycle,
} from "@ionic/react";
import {PagePropsInterface} from "../utils/PagePropsInterface";
import {checkTabBarShouldHide, scanQrCode, showTabBar} from "../utils/utils";
import {qrScanner} from "ionicons/icons";

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
            <IonButtons slot="end">
              <IonButton color={'primary'} onClick={() => scanQrCode(this.props.history)}>
                <IonIcon icon={qrScanner}/>
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonList>
            <IonItem routerLink={'/book/home'} detail>书香</IonItem>
          </IonList>
          <IonList>
            <IonItemDivider>
              <IonLabel>发现</IonLabel>
            </IonItemDivider>
            <IonItem onClick={() => scanQrCode(this.props.history)}>扫一扫</IonItem>
          </IonList>
          <IonList>
            <IonItemDivider>
              <IonLabel>计划管理</IonLabel>
            </IonItemDivider>
            <IonItem routerLink={'/team/home'} detail>团队</IonItem>
            <IonItem routerLink={'/okr/home'} detail>OKR</IonItem>
            <IonItem routerLink={'/contact/home'} detail>人脉管理</IonItem>

          </IonList>

        </IonContent>

      </IonPage>
    )
  }
}

export default withIonLifeCycle(AppsHomePage);
