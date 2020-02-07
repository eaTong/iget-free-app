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
  withIonLifeCycle
} from "@ionic/react";
import {PagePropsInterface} from "../utils/PagePropsInterface";
import UserSettingModal from "./mine/UserSettingModal";
import {AppUpdate} from '@ionic-native/app-update';
import {Plugins} from "@capacitor/core";
import showToast from "../utils/toastUtil";
import {inject, observer} from "mobx-react";
import {checkTabBarShouldHide, scanQrCode, showTabBar} from "../utils/utils";
import {qrScanner} from "ionicons/icons";

interface MineHomePageState {
  showSettingModal: Boolean,
  settingType: String,
  appVersion: String
}

interface MineHomePageInterface extends PagePropsInterface {
  app?: any
}

@inject('app') @observer
class MineHomePage extends Component<MineHomePageInterface, MineHomePageState> {
  state = {
    showSettingModal: false,
    settingType: '',
    appVersion: ''
  };

  async componentDidMount() {

    const deviceInfo = await Plugins.Device.getInfo();
    this.setState({appVersion: deviceInfo.appVersion})
  }

  ionViewWillEnter() {
    showTabBar()
  }

  ionViewDidLeave() {
    checkTabBarShouldHide(this.props.history, this.props.location);
  }

  async logout() {
    await this.props.app.logout();
    this.props.history.replace('/login')
  }

  async updateAPP() {
    AppUpdate.checkAppUpdate('https://iget.eatong.cn/version.xml').then(() => {
      showToast('当前已经是最新版本！')
    }).catch((error: any) => console.log(error));
  }

  async onSaveSettings(data: any) {
    this.props.app.updateUser(data, this.state.settingType);
    this.setState({showSettingModal: false})
  }

  toggleSettingModal(showSettingModal: boolean, settingType?: string) {
    this.setState({showSettingModal, settingType: settingType || ''})
  }

  render() {
    const {showSettingModal, settingType, appVersion} = this.state;
    const loginUser = this.props.app.loginUser;
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>我的</IonTitle>
            <IonButtons slot="end">
              <IonButton color={'primary'} onClick={() => scanQrCode(this.props.history)}>
                <IonIcon icon={qrScanner}/>
              </IonButton>
            </IonButtons>
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
            <IonItem routerLink={'/config/home'} detail>首页定制</IonItem>
            <IonItem detail button onClick={() => this.updateAPP()}>
              <IonLabel>检查更新</IonLabel>
              {appVersion && `当前版本：${appVersion}`}
            </IonItem>
          </IonList>
          <IonList>
            <IonItemDivider>
              <IonLabel>帮助</IonLabel>
            </IonItemDivider>
            <IonItem routerLink={'/about/feedback'} detail>意见反馈</IonItem>
            <IonItem routerLink={'/about/app'} detail>关于「书香-得寸进尺」</IonItem>
            <IonItem routerLink={'/about/author'} detail>关于作者</IonItem>
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

export default withIonLifeCycle(MineHomePage);
