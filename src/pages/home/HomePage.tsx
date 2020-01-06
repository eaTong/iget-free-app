import {
  IonButton,
  IonButtons,
  IonContent, IonHeader, IonIcon,
  IonPage,
  IonTitle,
  IonToolbar,
  withIonLifeCycle,
} from '@ionic/react';
import React, {Component} from 'react';
import {PagePropsInterface} from "../../utils/PagePropsInterface";
import {CACHED_LOGIN_USER, HAS_LOGIN} from "../../utils/constants";
import {inject, observer} from "mobx-react";
import {checkTabBarShouldHide, scanQrCode, showTabBar} from "../../utils/utils";
import {qrScanner} from "ionicons/icons";
import showLoading from "../../utils/loadingUtil";
import BookStaticsCard from "../../components/cards/BookStaticsCard";
import HomeCard from "./HomeCard";

interface LoginPageInterface extends PagePropsInterface {
  app?: any
}

const cardsConfig = [
  {
    title: '书香-总览',
    key: 'book-statics',
    ajaxConfig: {url: '/api/bookMark/statics'},
    dataResolve: (result: any) => ({bookStatics: result}),
    link: '/book/home',
    Component: BookStaticsCard
  },
];

@inject('app') @observer
class HomePage extends Component<LoginPageInterface, {}> {
  async ionViewDidEnter() {

    const hasLogged = window.sessionStorage.getItem(HAS_LOGIN);
    if (hasLogged) {
      this.props.app.autoLogin();
      return;
    }
    const loginUserSting = window.localStorage.getItem(CACHED_LOGIN_USER);
    if (loginUserSting) {
      try {
        const loading = showLoading('自动登陆中...');
        await this.props.app.login(JSON.parse(loginUserSting));
        loading.destroy()
      } catch (e) {
        this.redirectLogin();
      }
    } else {
      this.redirectLogin();
    }
  }

  ionViewWillEnter() {
    showTabBar();
  }

  ionViewDidLeave() {
    checkTabBarShouldHide(this.props.history, this.props.location);
  }

  redirectLogin() {
    this.props.history.replace('/login');
  }


  render() {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>我的主页</IonTitle>
            <IonButtons slot="end">
              <IonButton color={'primary'} onClick={() => scanQrCode(this.props.history)}>
                <IonIcon icon={qrScanner}/>
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          {cardsConfig.map((card: any) => (
            <HomeCard
              ajaxConfig={card.ajaxConfig}
              dataResolve={card.dataResolve}
              history={this.props.history}
              title={card.title}
              key={card.key}
              Component={card.Component}
            />
          ))}

        </IonContent>
      </IonPage>
    );
  }
}

export default withIonLifeCycle(HomePage);
