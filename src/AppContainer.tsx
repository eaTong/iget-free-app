import React, {Component} from 'react';
import {IonRouterOutlet, IonSplitPane} from "@ionic/react";
import Menu from "./components/Menu";
import {Redirect, Route} from "react-router-dom";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import BookHomePage from "./pages/book/BookHomePage";
import SearchBookPage from "./pages/book/SearchBookPage";
import BookDetailPage from "./pages/book/BookDetailPage";
import BookListPage from "./pages/book/BookListPage";
import AddNotePage from "./pages/book/AddNotePage";
import RageBookPage from "./pages/book/RageBookPage";
import MineHomePage from "./pages/mine/MineHomePage";
import TeamPage from "./pages/team/TeamPage";
import CreateTeamPage from "./pages/team/CreateTeamPage";
import OKRHomePage from "./pages/OKR/OKRHomePage";
import {IonReactRouter} from "@ionic/react-router";
import {school} from "ionicons/icons";
import {inject,observer} from "mobx-react";

export interface AppPage {
  url: string;
  icon: object;
  title: string;
}

const appPages: AppPage[] = [
  {
    title: '书香',
    url: '/book/home',
    icon: school
  },
  // {
  //   title: '团队',
  //   url: '/team/home',
  //   icon: people
  // },
  // {
  //   title: 'OKR',
  //   url: '/okr/home',
  //   icon: options
  // },
];

@inject('app') @observer
class AppContainer extends Component<any, any> {

  render() {
    return (
      <IonReactRouter>
        <IonSplitPane contentId="main">
          {this.props.app.logged && (<Menu appPages={appPages}/>)}

          <IonRouterOutlet id="main">
            <Route exact path="/" render={() => <Redirect to="/home"/>}/>

            <Route path="/home" component={Home} exact={true}/>
            <Route path="/login" component={LoginPage} exact={true}/>
            <Route path="/book/home" component={BookHomePage} exact={true}/>
            <Route path="/book/search" component={SearchBookPage} exact={true}/>
            <Route path="/book/detail" component={BookDetailPage} exact={true}/>
            <Route path="/book/list" component={BookListPage} exact={true}/>
            <Route path="/book/add-note" component={AddNotePage} exact={true}/>
            <Route path="/book/add-rate" component={RageBookPage} exact={true}/>
            <Route path="/mine/home" component={MineHomePage} exact={true}/>
            <Route path="/team/home" component={TeamPage} exact={true}/>
            <Route path="/team/add" component={CreateTeamPage} exact={true}/>
            <Route path="/okr/home" component={OKRHomePage} exact={true}/>
          </IonRouterOutlet>
        </IonSplitPane>
      </IonReactRouter>
    )
  }
}
export default  AppContainer
