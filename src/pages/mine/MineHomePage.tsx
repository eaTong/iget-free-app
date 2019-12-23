import React, {Component} from "react";
import {
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonContent,
  IonButton,
  IonList,
  IonItem,
  IonLabel, IonMenuButton, IonButtons
} from "@ionic/react";
import {PagePropsInterface} from "../../utils/PagePropsInterface";
import ajax from "../../utils/ajax";
import {getLoginUser} from "../../utils/utils";

class MineHomePage extends Component<PagePropsInterface, {}> {
  async logout() {
    await ajax({url: '/api/pub/logout'});
    this.props.history.redirect('/login')
  }

  render() {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonMenuButton/>
            </IonButtons>
            <IonTitle>我的</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonList>
            <IonItem detail button>
              <IonLabel>昵称</IonLabel>
              {getLoginUser().name}
            </IonItem>
            <IonItem detail button>
              <IonLabel>账号</IonLabel>
              {getLoginUser().account}
            </IonItem>
            <IonItem detail button>
              <IonLabel>修改密码</IonLabel>
            </IonItem>

          </IonList>

          <IonButton color='danger' expand="full" onClick={() => this.logout()}>退出登录</IonButton>
        </IonContent>
      </IonPage>
    )
  }
}

export default MineHomePage;
