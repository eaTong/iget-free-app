import {observable, action, computed, toJS} from 'mobx';
import {Plugins, Storage} from "@capacitor/core";
import ajax from "../utils/ajax";
import {CACHED_LOGIN_USER, CURRENT_LOGIN_USER, HOME_CARD_CONFIG, USER_HAS_QUITED} from "../utils/constants";
import {getLoginUser} from "../utils/utils";
import {cardsConfig} from "../utils/enums";
import arrayMove from 'array-move';
import {DynamicObject} from '../utils/types';

export default class AppStore {
  @observable loginUser = {};
  @observable logged = false;
  @observable configReady = false;
  @observable homeCardsConfig = cardsConfig;

  @computed get homeCards() {
    return this.homeCardsConfig;
  }

  @computed get enabledHomeCards() {
    return this.configReady ? this.homeCardsConfig.filter((item: any) => !item.hide) : [];
  }

  @action
  async quickLogin() {
    const deviceInfo = await Plugins.Device.getInfo();
    const loginUser = await ajax({url: '/api/pub/quickLogin', data: {uuid: deviceInfo.uuid}});
    this.loginUser = loginUser;
    this.logged = true;
    await Storage.remove({key: USER_HAS_QUITED});
    window.sessionStorage.setItem(CURRENT_LOGIN_USER, JSON.stringify(loginUser));
  }

  @action
  async autoLogin() {
      this.logged = true;
      this.loginUser = getLoginUser();

  }

  @action
  async login(user: any) {
    const loginUser = await ajax({url: '/api/user/login', data: user});
    this.loginUser = {...loginUser, ...user};
    this.logged = true;
    window.sessionStorage.setItem(CURRENT_LOGIN_USER, JSON.stringify(loginUser));
    await Storage.set({key: CACHED_LOGIN_USER, value: JSON.stringify(loginUser)});
  }

  @action
  async logout() {
    this.loginUser = {};
    this.logged = false;
    await Storage.set({key: USER_HAS_QUITED, value: 'true'});
    await ajax({url: '/api/pub/logout'});
  }

  @action
  async updateUser(data: any, settingType: string) {
    if (settingType === 'password') {
      await ajax({url: '/api/user/changePassword', data});
    } else {
      await ajax({url: '/api/user/update', data});
    }
    this.loginUser = data;
    window.sessionStorage.setItem(CURRENT_LOGIN_USER, JSON.stringify(data));
  }

  @action
  async initialConfigCards() {
    const {value} = await Storage.get({key: HOME_CARD_CONFIG});
    if (value) {
      const minimalConfig = JSON.parse(value);
      const config = toJS([...this.homeCardsConfig]);

      this.homeCardsConfig = config.map((item, index) => {
        const minimal = minimalConfig[item.key];
        return {
          ...item,
          sort: minimal ? minimal.sort : index,
          hide: minimal ? minimal.hide : item.hide,
        }
      }).sort((a: any, b: any) => a.sort - b.sort);
    }
    this.configReady = true;
  }

  @action
  onSortCards(detail: any) {
    const {from, to} = detail;
    this.homeCardsConfig = arrayMove(this.homeCardsConfig, from, to);
    this.saveConfiguration();
  }

  @action
  onChangeVisible(value: boolean, key: string) {
    const config = toJS([...this.homeCardsConfig]);
    config.forEach(item => {
      if (item.key === key) {
        item.hide = !value;
      }
    });
    this.homeCardsConfig = config;
    this.saveConfiguration();
  }

  saveConfiguration() {
    const config = toJS(this.homeCardsConfig);
    const minimalConfig: DynamicObject = {};
    config.forEach((item: any, index: number) => {
      minimalConfig[item.key] = {sort: index, hide: item.hide};
    });
    Storage.set({key: HOME_CARD_CONFIG, value: JSON.stringify(minimalConfig)});
  }
}
