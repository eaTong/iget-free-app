import React, {Component} from 'react';
import {IonIcon, IonRouterOutlet, IonTabBar, IonTabButton, IonLabel, IonTabs } from "@ionic/react";
import {Redirect, Route} from "react-router-dom";
import Home from "./pages/Home";
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
import {IonReactRouter } from "@ionic/react-router";
import {apps, home, person} from "ionicons/icons";
import {inject, observer} from "mobx-react";
import TeamDetailPage from "./pages/team/TeamDetailPage";
import AppsHomePage from "./pages/AppsHomePage";
import {hideTabBar} from "./utils/utils";

export interface AppPage {
  url: string;
  icon: object;
  title: string;
}


@inject('app') @observer
class AppContainer extends Component<any, any> {
  componentDidMount(): void {
    hideTabBar();
    this.props.app.autoLogin();
  }

  renderRouters() {
    return (
      <IonRouterOutlet>
        <Route exact path="/" render={() => <Redirect to="/home"/>} />
        <Route path="/home" component={Home} exact/>
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
    return (
      <IonReactRouter >
        {this.props.app.logged ? this.renderRoutersWithTab() : this.renderRouters()}

      </IonReactRouter>
    )
  }
}

export default AppContainer
