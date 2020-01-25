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
  IonButtons, withIonLifeCycle, IonItem, IonLabel, IonList, IonCheckbox
} from "@ionic/react";
import {PagePropsInterface} from "../../utils/PagePropsInterface";
import {inject, observer} from "mobx-react";
import {SortableContainer, SortableElement} from 'react-sortable-hoc';

interface ConfigurationHomeCardPageInterface extends PagePropsInterface {
  app?: any
}


const SortableListContainer = SortableContainer((item: any) => {
  return <IonList>{item.children}</IonList>;
});

@inject('app') @observer
class ConfigurationHomeCardPage extends Component<ConfigurationHomeCardPageInterface, any> {
  state = {};

  SortableItem = SortableElement((props: any) => {
    const item = props.value;
    return (
      <IonItem key={item.key}>
        <IonLabel>
          <h3>{item.title}</h3>
          <p>{item.subtitle}</p>
        </IonLabel>
        <IonCheckbox
          slot="end"
          checked={!item.hide} value={item.key} name={'card-config'}
          onIonChange={(event: any) =>{
            console.log(event);
            this.props.app.onChangeVisible(event.target.checked, item.key);
          }}/>
      </IonItem>
    )
  });

  render() {
    const SortableItem = this.SortableItem;
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
          <SortableListContainer onSortEnd={(value: any) => this.props.app.onSortCards(value)} pressDelay={350}>
            {this.props.app.homeCards.map((value: any, index: any) => (
              <SortableItem key={`item-${value.key}`} index={index} value={value}/>
            ))}
          </SortableListContainer>

        </IonContent>

      </IonPage>
    )
  }
}

export default withIonLifeCycle(ConfigurationHomeCardPage);
