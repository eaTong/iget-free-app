import React, {Component} from 'react';
import {IonIcon, IonRouterOutlet, IonTabBar, IonTabButton, IonLabel, IonTabs} from "@ionic/react";
import {Redirect, Route} from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import LoginPage from "./pages/LoginPage";
import BookHomePage from "./pages/book/BookHomePage";
import SearchBookPage from "./pages/book/SearchBookPage";
import BookDetailPage from "./pages/book/BookDetailPage";
import BookListPage from "./pages/book/BookListPage";
import AddNotePage from "./pages/book/AddNotePage";
import RageBookPage from "./pages/book/RageBookPage";
import MineHomePage from "./pages/MineHomePage";
import TeamPage from "./pages/team/TeamPage";
import CreateTeamPage from "./pages/team/CreateTeamPage";
import OKRHomePage from "./pages/OKR/OKRHomePage";
import {apps, home, person} from "ionicons/icons";
import {inject, observer} from "mobx-react";
import TeamDetailPage from "./pages/team/TeamDetailPage";
import AppsHomePage from "./pages/AppsHomePage";
import {hideTabBar} from "./utils/utils";
import {appTabLinks} from './utils/enums';
import ConfigurationHomeCardPage from "./pages/mine/ConfigurationHomeCardPage";
import CheckAuth from "./pages/CheckAuth";
import AddObjective from "./pages/OKR/AddObjective";
import ObjectiveDetailPage from "./pages/OKR/ObjectiveDetailPage";
import AddObjectiveRecord from "./pages/OKR/AddObjectiveRecord";

@inject('app') @observer
class AppContainer extends Component<any, any> {
  async componentDidMount() {
    await this.props.app.autoLogin();
    await this.props.app.initialConfigCards();
    if (appTabLinks.indexOf(window.location.pathname) === -1) {
      hideTabBar();
    }
  }

  renderRouters() {
    return (
      <IonRouterOutlet>
        <Route exact path="/" render={() => <Redirect to="/check"/>}/>
        <Route path="/check" component={CheckAuth} exact/>
        <Route path="/home" component={HomePage} exact/>
        <Route path="/apps" component={AppsHomePage} exact/>
        <Route path="/login" component={LoginPage} exact/>
        <Route path="/book/home" component={BookHomePage} exact/>
        <Route path="/book/search" component={SearchBookPage} exact/>
        <Route path="/book/detail" component={BookDetailPage} exact/>
        <Route path="/book/list" component={BookListPage} exact/>
        <Route path="/book/add-note" component={AddNotePage} exact/>
        <Route path="/book/add-rate" component={RageBookPage} exact/>
        <Route path="/mine/home" component={MineHomePage} exact/>
        <Route path="/team/home" component={TeamPage} exact/>
        <Route path="/team/add" component={CreateTeamPage} exact/>
        <Route path="/team/detail/:id" component={TeamDetailPage} exact/>
        <Route path="/okr/home" component={OKRHomePage} exact/>
        <Route path="/okr/add" component={AddObjective} exact/>
        <Route path="/okr/add/:id" component={AddObjective} exact/>
        <Route path="/okr/detail/:id" component={ObjectiveDetailPage} exact/>
        <Route path="/okr/record/:id" component={AddObjectiveRecord} exact/>
        <Route path="/config/home" component={ConfigurationHomeCardPage} exact/>
      </IonRouterOutlet>

    );
  }

  renderTabs() {
    return (
      <IonTabBar slot="bottom">
        <IonTabButton tab="home" href="/home">
          <IonIcon icon={home}/>
          <IonLabel>主页</IonLabel>
        </IonTabButton>
        <IonTabButton tab="apps" href="/apps">
          <IonIcon icon={apps}/>
          <IonLabel>百宝箱</IonLabel>
        </IonTabButton>
        <IonTabButton tab="mine" href="/mine/home">
          <IonIcon icon={person}/>
          <IonLabel>我的</IonLabel>
        </IonTabButton>
      </IonTabBar>
    )
  }

  renderRoutersWithTab() {
    return (
      <IonTabs>
        {this.renderRouters()}
        {this.renderTabs()}
      </IonTabs>
    );
  }

  render() {
    return this.props.app.logged ? this.renderRoutersWithTab() : this.renderRouters()
  }
}

export default AppContainer
