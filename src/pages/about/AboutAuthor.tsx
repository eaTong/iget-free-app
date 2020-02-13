/**
 * Created by eatong on 2020/1/29.
 */

import React, {Component} from "react";
import {
  IonButtons,
  IonCardHeader,
  IonText,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonImg,
  IonPage,
  IonTitle,
  IonToolbar,
  withIonLifeCycle, IonCardSubtitle
} from "@ionic/react";
import {PagePropsInterface} from "../../utils/PagePropsInterface";
import BackButton from "../../components/BackButton";
import {Browser} from "@capacitor/core";

interface AboutAuthorState {

}

class AboutAuthor extends Component<PagePropsInterface, AboutAuthorState> {
  state = {};

  render() {
    return (
      <IonPage className='about-author'>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <BackButton history={this.props.history}/>
            </IonButtons>
            <IonTitle>关于作者</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonCardHeader>
            <IonCardTitle>eaTong</IonCardTitle>
            <IonCardSubtitle>不止程序员</IonCardSubtitle>
          </IonCardHeader>
          <div className={'content'}>
            <div>个人主页：
              <IonText onClick={() => Browser.open({url: 'https://eatong.cn'})}
                                   color={'primary'}>https://eatong.cn</IonText></div>
            <p>联系方式：18183820756</p>
            <p>本名周夷东，江西鹰潭人，现居昆明，在一家60多个人的互联网公司担任某一个产品的研发管理工作。</p>
            <p>自学转行成为程序员，经历水电施工员、项目实施、Java开发、前端开发，到目前团队管理。</p>
            <p>使用 <code>React</code>四年时间，对相应技术栈比较了解，带团队经验从前端到整个研发管理有一定经验，主要从一个比较混乱的状态逐渐调整，到现在步入正轨。</p>
            <p>技术栈从后台Java、python、node，均有涉猎，本App主要用node作为后台，以JS完成全端开发。</p>
          </div>
          <IonImg src={require('../../images/eaTong.png')}/>
        </IonContent>

      </IonPage>
    )
  }
}

export default withIonLifeCycle(AboutAuthor);
