import {observable, action} from 'mobx';
import {Plugins} from "@capacitor/core";
import ajax from "../utils/ajax";
import { CURRENT_LOGIN_USER, HAS_LOGIN} from "../utils/constants";

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
    console.log(this.logged);
    this.logged = true;
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
}
