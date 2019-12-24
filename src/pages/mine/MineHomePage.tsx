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
import UserSettingModal from "./UserSettingModal";
import {CURRENT_LOGIN_USER} from "../../utils/constants";

interface MineHomePageState {
  showSettingModal: Boolean,
  settingType: String
}

class MineHomePage extends Component<PagePropsInterface, MineHomePageState> {
  state = {
    showSettingModal: false,
    settingType: ''
  };

  async logout() {
    await ajax({url: '/api/pub/logout'});
    this.props.history.replace('/login')
  }

  async onSaveSettings(data: any) {
    const {settingType} = this.state;
    if (settingType === 'password') {
      await ajax({url: '/api/user/changePassword', data});
    } else {
      await ajax({url: '/api/user/update', data});
    }
    window.sessionStorage.setItem(CURRENT_LOGIN_USER, JSON.stringify(data));
    this.setState({showSettingModal: false})
  }

  toggleSettingModal(showSettingModal: boolean, settingType?: string) {
    this.setState({showSettingModal, settingType: settingType || ''})
  }

  render() {
    const {showSettingModal, settingType} = this.state;
    const loginUser = getLoginUser();
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
            <IonItem detail button onClick={() => this.toggleSettingModal(true, 'name')}>
              <IonLabel>昵称</IonLabel>
              {loginUser.name}
            </IonItem>
            <IonItem detail button onClick={() => this.toggleSettingModal(true, 'account')}>
              <IonLabel>账号</IonLabel>
              {loginUser.account}
            </IonItem>
            <IonItem detail button onClick={() => this.toggleSettingModal(true, 'password')}>
              <IonLabel>修改密码</IonLabel>
            </IonItem>
          </IonList>
          <IonButton color='danger' expand="full" onClick={() => this.logout()}>退出登录</IonButton>
        </IonContent>
        {showSettingModal && (
          <UserSettingModal
            onDismiss={() => this.toggleSettingModal(false)}
            onSubmit={(data: any) => this.onSaveSettings(data)}
            type={settingType}
          />
        )}

      </IonPage>
    )
  }
}

export default MineHomePage;
