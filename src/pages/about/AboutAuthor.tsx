/**
 * Created by eatong on 2020/1/29.
 */

import React, {Component} from "react";
import {
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonContent,
  IonBackButton,
  IonButtons, withIonLifeCycle, IonCard, IonImg, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent
} from "@ionic/react";
import {PagePropsInterface} from "../../utils/PagePropsInterface";
import {Clipboard} from "@capacitor/core";

interface AboutAuthorState {

}

class AboutAuthor extends Component<PagePropsInterface, AboutAuthorState> {
  state = {};

  copyTelephone(){
    Clipboard.write({string:'18183820756'});
  }

  render() {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton/>
            </IonButtons>
            <IonTitle>关于作者</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonCard>
            <IonCardHeader>
              <IonCardTitle>eaTong</IonCardTitle>
              <IonCardSubtitle>不止程序员，个人主页：https://eatong.cn</IonCardSubtitle>
            </IonCardHeader>
            <IonCardContent>
              <p onClick={()=>this.copyTelephone()}>联系方式：18183820756 ( 点击即可复制 )</p>
            </IonCardContent>
            <IonImg src={require('../../images/eaTong.png')}/>
            <IonCardContent>
              <p>本名周夷东，江西鹰潭人，现居昆明，在一家60多个人的互联网公司担任某一个产品的研发管理工作。 成为程序员之前做过水电施工员、项目实施，再到Java开发，再到web前端开发。</p>
              <p>使用 <code>React</code>四年时间，对相应技术栈比较了解，带团队经验从前端到整个研发管理有一定经验，主要从一个比较混乱的状态逐渐调整，到现在步入正轨。</p>
              <p>技术栈从后台Java、python、node，均有涉猎，本App主要用node作为后台，以JS完成全端开发。</p>
            </IonCardContent>
          </IonCard>

        </IonContent>

      </IonPage>
    )
  }
}

export default withIonLifeCycle(AboutAuthor);
