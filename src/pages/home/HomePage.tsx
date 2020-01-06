import {
  IonButton,
  IonButtons,
  IonContent, IonHeader, IonIcon,
  IonPage, IonRouterLink,
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
import HomeCard from "./HomeCard";

interface LoginPageInterface extends PagePropsInterface {
  app?: any
}

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
    const {app} = this.props;
    return (
      <IonPage className={'home-page'}>
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
