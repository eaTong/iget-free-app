import React from 'react';
import {IonApp,} from '@ionic/react';
import {Provider} from 'mobx-react';
import store from './stores'

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
import './styles/index.scss';
import 'swiper/css/swiper.min.css'

import AppContainer from "./AppContainer";
import {IonReactRouter} from "@ionic/react-router";


const App: React.FC = () => (
    <IonApp>
      <Provider {...store}>
        <IonReactRouter>
          <AppContainer/>
        </IonReactRouter>
      </Provider>
    </IonApp>
  )
;

export default App;
