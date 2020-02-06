/**
 * Created by eatong on 2020/1/6.
 */

import React, {Component} from "react";
import {
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonContent,
  IonBackButton,
  IonButtons, withIonLifeCycle, IonItem, IonLabel, IonCheckbox, IonReorder, IonReorderGroup
} from "@ionic/react";
import {PagePropsInterface} from "../../utils/PagePropsInterface";
import {inject, observer} from "mobx-react";

interface ConfigurationHomeCardPageInterface extends PagePropsInterface {
  app?: any
}


@inject('app') @observer
class ConfigurationHomeCardPage extends Component<ConfigurationHomeCardPageInterface, any> {
  state = {};

  onSortChange(event: any) {
    this.props.app.onSortCards(event.detail);
    event.detail.complete();
  }

  render() {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton/>
            </IonButtons>
            <IonTitle>首页设置</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonReorderGroup onIonItemReorder={(event: any) => this.onSortChange(event)} disabled={false}>
            {this.props.app.homeCards.map((item: any, index: any) => (
              <IonItem key={item.key}>
                <IonLabel>
                  <h3>{item.title}</h3>
                  <p>{item.subtitle}</p>
                </IonLabel>
                <IonCheckbox
                  slot="start"
                  checked={!item.hide} value={item.key} name={'card-config'}
                  onIonChange={(event: any) => {
                    console.log(event);
                    this.props.app.onChangeVisible(event.target.checked, item.key);
                  }}/>
                <IonReorder slot="end"/>
              </IonItem>
            ))}
          </IonReorderGroup>
        </IonContent>

      </IonPage>
    )
  }
}

export default withIonLifeCycle(ConfigurationHomeCardPage);
