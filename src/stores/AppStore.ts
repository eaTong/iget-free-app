import {observable, action} from 'mobx';
import {Plugins} from "@capacitor/core";
import ajax from "../utils/ajax";
import { CURRENT_LOGIN_USER, HAS_LOGIN} from "../utils/constants";
import {getLoginUser} from "../utils/utils";

export default class AppStore {
  @observable loginUser = {};
  @observable logged = false;


  @action
  async quickLogin() {
    const deviceInfo = await Plugins.Device.getInfo();
    const loginUser = await ajax({url: '/api/pub/quickLogin', data: {uuid: deviceInfo.uuid}});
    this.loginUser = loginUser;
    this.logged = true;
    window.sessionStorage.setItem(HAS_LOGIN, '1');
    window.sessionStorage.setItem(CURRENT_LOGIN_USER, JSON.stringify(loginUser));
  }

  @action async autoLogin(){
    if(window.sessionStorage.getItem(HAS_LOGIN)){
      this.logged = true;
      this.loginUser = getLoginUser();
    }
  }

  @action
  async login(user: any) {
    const loginUser = await ajax({url: '/api/user/login', data: user});
    this.loginUser = loginUser;
    this.logged = true;
    window.sessionStorage.setItem(HAS_LOGIN, '1');
    window.sessionStorage.setItem(CURRENT_LOGIN_USER, JSON.stringify(loginUser));
  }

  @action async logout(){
    this.loginUser = {};
    this.logged = false;
    window.sessionStorage.setItem(HAS_LOGIN, '0');
    await ajax({url: '/api/pub/logout'});
  }

  @action async updateUser(data:any,settingType:string){
    if (settingType === 'password') {
      await ajax({url: '/api/user/changePassword', data});
    } else {
      await ajax({url: '/api/user/update', data});
    }
    this.loginUser = data;
    window.sessionStorage.setItem(CURRENT_LOGIN_USER, JSON.stringify(data));
  }
}
