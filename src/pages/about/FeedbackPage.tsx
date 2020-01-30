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
  IonButtons, withIonLifeCycle, IonButton
} from "@ionic/react";
import {PagePropsInterface} from "../../utils/PagePropsInterface";
import ajax from "../../utils/ajax";
import TimeLime from "../../components/TimeLime";
import TimeLineItem from "../../components/TimeLineItem";
import {getTimeFormat} from "../../utils/utils";
import Empty from "../../components/Empty";
import PickImage from "../../components/PickImage";

interface FeedbackPageState {
  feedbacks: Array<any>,
  total: number
}

class FeedbackPage extends Component<PagePropsInterface, FeedbackPageState> {
  state = {
    feedbacks: [],
    total: 0
  };

  async ionViewDidEnter() {
    this.getFeedbacks()
  }


  async getFeedbacks(page: number = 0) {
    const {list, total} = await ajax({
      url: '/api/feedback/get',
      data: {pageIndex: page}
    });
    this.setState({feedbacks: page === 0 ? list : [...this.state.feedbacks, ...list], total});
  }


  render() {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton/>
            </IonButtons>
            <IonTitle>意见反馈</IonTitle>
            <IonButtons slot="end">
              <IonButton onClick={() => this.props.history.push('/about/feedback/add')}>提个意见</IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <TimeLime>
            {this.state.feedbacks.map((feedback: any) => (
              <TimeLineItem title={getTimeFormat(feedback.createdAt)} key={feedback.id}>
                <>
                  <strong>{feedback.name}</strong>
                  <p>{feedback.description}</p>
                  <PickImage value={feedback.images}/>
                </>
              </TimeLineItem>
            ))}
          </TimeLime>
          {this.state.feedbacks.length === 0 && (
            <Empty title={'「书香-得寸进尺」期待您的宝贵意见。'}>
              <>
                <IonButton onClick={() => this.props.history.push('/about/feedback/add')}>提个意见</IonButton>
              </>
            </Empty>
          )}
        </IonContent>

      </IonPage>
    )
  }
}

export default withIonLifeCycle(FeedbackPage);
