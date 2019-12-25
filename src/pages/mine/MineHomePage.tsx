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
  IonLabel, IonMenuButton, IonButtons, IonItemDivider
} from "@ionic/react";
import {PagePropsInterface} from "../../utils/PagePropsInterface";
import ajax from "../../utils/ajax";
import {getLoginUser} from "../../utils/utils";
import UserSettingModal from "./UserSettingModal";
import {CURRENT_LOGIN_USER} from "../../utils/constants";
import {AppUpdate} from '@ionic-native/app-update';
import {Plugins} from "@capacitor/core";
import showToast from "../../utils/toastUtil";

interface MineHomePageState {
  showSettingModal: Boolean,
  settingType: String,
  appVersion: String
}

class MineHomePage extends Component<PagePropsInterface, MineHomePageState> {
  state = {
    showSettingModal: false,
    settingType: '',
    appVersion: ''
  };

  async componentDidMount() {

    const deviceInfo = await Plugins.Device.getInfo();
    this.setState({appVersion: deviceInfo.appVersion})
  }

  async logout() {
    await ajax({url: '/api/pub/logout'});
    this.props.history.replace('/login')
  }

  async updateAPP() {
    const deviceInfo = await Plugins.Device.getInfo();
    console.log(deviceInfo);
    AppUpdate.checkAppUpdate('https://iget.eatong.cn/version.xml').then(() => {
      showToast('当前已经是最新版本！')
    }).catch((error: any) => console.log(error));
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
    const {showSettingModal, settingType, appVersion} = this.state;
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
            <IonItemDivider>
              <IonLabel>账号设置</IonLabel>
            </IonItemDivider>
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
          <IonList>
            <IonItemDivider>
              <IonLabel>软件设置</IonLabel>
            </IonItemDivider>
            <IonItem detail button onClick={() => this.updateAPP()}>
              <IonLabel>检查更新</IonLabel>
              {appVersion && `当前版本：${appVersion}`}
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
