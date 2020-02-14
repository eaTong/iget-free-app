import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonPage,
  IonRouterLink,
  IonTitle,
  IonToolbar,
  withIonLifeCycle,
} from '@ionic/react';
import React, {Component} from 'react';
import {PagePropsInterface} from "../../utils/PagePropsInterface";
import {inject, observer} from "mobx-react";
import {checkTabBarShouldHide, scanQrCode, showTabBar} from "../../utils/utils";
import {scanOutline} from "ionicons/icons";
import HomeCard from "./HomeCard";

interface LoginPageInterface extends PagePropsInterface {
  app?: any
}

@inject('app') @observer
class HomePage extends Component<LoginPageInterface, {}> {


  ionViewWillEnter() {
    showTabBar();
  }

  ionViewDidLeave() {
    checkTabBarShouldHide(this.props.history, this.props.location);
  }



  render() {
    const {app} = this.props;
    return (
      <IonPage className={'home-page'}>
        <IonHeader>
          <IonToolbar>
            <IonTitle>我的主页</IonTitle>
            <IonButtons slot="end">
              <IonButton color={'primary'} onClick={() => scanQrCode(this.props.history)}>
                <IonIcon icon={scanOutline}/>
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          {app.enabledHomeCards.map((card: any) => (
            <HomeCard
              ajaxConfig={card.ajaxConfig}
              dataResolve={card.dataResolve}
              history={this.props.history}
              title={card.title}
              key={card.key}
              subtitle={card.subtitle}
              link={card.link}
              Component={card.Component}
            />
          ))}

          <IonRouterLink color={'medium'} routerLink={'/config/home'} className={'custom-home-link'}>内容不喜欢？试试点我自定义主页吧！</IonRouterLink>

        </IonContent>
      </IonPage>
    );
  }
}

export default withIonLifeCycle(HomePage);
