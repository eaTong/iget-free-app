import React from 'react';
import {Redirect, Route} from 'react-router-dom';
import {
  IonApp,
  IonRouterOutlet,
  IonSplitPane
} from '@ionic/react';
import {IonReactRouter} from '@ionic/react-router';
import Home from './pages/Home';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';
/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';
import './styles/variables.css';
import './styles/index.scss'

import LoginPage from "./pages/LoginPage";
import SearchBookPage from "./pages/book/SearchBookPage";
import BookDetailPage from "./pages/book/BookDetailPage";
import AddNotePage from "./pages/book/AddNotePage";
import RageBookPage from "./pages/book/RageBookPage";
import BookListPage from "./pages/book/BookListPage";
import {school} from "ionicons/icons";
import Menu from './components/Menu';
import BookHomePage from "./pages/book/BookHomePage";
import MineHomePage from "./pages/mine/MineHomePage";
import TeamPage from "./pages/team/TeamPage";
import OKRHomePage from "./pages/OKR/OKRHomePage";
import CreateTeamPage from "./pages/team/CreateTeamPage";

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

const App: React.FC = () => (
    <IonApp>
      <IonReactRouter>
        <IonSplitPane contentId="main">
          <Menu appPages={appPages}/>
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
    </IonApp>
  )
;

export default App;
