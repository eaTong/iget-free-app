/**
 * Created by eatong on 2020/1/29.
 */

import React, {Component} from "react";
import {
  IonButtons,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  withIonLifeCycle
} from "@ionic/react";
import {PagePropsInterface} from "../../utils/PagePropsInterface";
import BackButton from "../../components/BackButton";

interface AboutAppState {

}

class AboutApp extends Component<PagePropsInterface, AboutAppState> {
  state = {};


  render() {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <BackButton history={this.props.history}/>
            </IonButtons>
            <IonTitle>关于APP</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonCardHeader>
            <IonCardTitle>得寸进尺</IonCardTitle>
            <IonCardSubtitle>帮助个人精进的APP，祝你「得寸进尺」</IonCardSubtitle>
          </IonCardHeader>
          <IonCardContent>
            <IonCardTitle>取名</IonCardTitle>
            <p><b>"管他什么真理无穷，进一寸有进一寸的欢喜"</b>，APP取名灵感来源于这句名言，我们都是凡人，没法跟无穷的真理抗衡，但是我们"进一寸有进一寸的欢喜"</p>
            <br/>
            <IonCardTitle>目标</IonCardTitle>
            <p>致力于打造一个帮助个人成长的APP，主打个人成长工具，希望每一个用这个APP的人可以见证自己的成长，见证自己的追寻真理的路上，每天都能够<b>得寸进尺</b>。</p>
          </IonCardContent>


        </IonContent>

      </IonPage>
    )
  }
}

export default withIonLifeCycle(AboutApp);
