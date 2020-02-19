/**
 * Created by eatong on 2020/1/29.
 */

import React, {Component} from "react";
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonNote,
  IonPage,
  IonTitle,
  IonToolbar,
  withIonLifeCycle
} from "@ionic/react";
import {PagePropsInterface} from "../../utils/PagePropsInterface";
import ajax from "../../utils/ajax";
import TimeLime from "../../components/TimeLime";
import TimeLineItem from "../../components/TimeLineItem";
import {getTimeFormat} from "../../utils/utils";
import Empty from "../../components/Empty";
import PickImage from "../../components/PickImage";
import {responseStatusColor, responseStatusLabel} from "../../utils/enums";
import BackButton from "../../components/BackButton";

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
              <BackButton history={this.props.history}/>
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
              <TimeLineItem
                title={getTimeFormat(feedback.createdAt)}
                key={feedback.id}
                statusTag={(<IonNote color={responseStatusColor[feedback.responseStatues || 0]}>
                  {responseStatusLabel[feedback.responseStatues || 0]}
                </IonNote>)}>
                <div className={'feedback-item'}>
                  <strong>{feedback.name}</strong>
                  <p>{feedback.description}</p>
                  <PickImage value={feedback.images}/>
                  {feedback.responseText && (
                    <div className="reply-card">
                      <span className="replier">eaTong:</span>
                      <span>感谢您对「得寸进尺」的宝贵建议。</span>
                      <span className="reply-content">
                      {feedback.responseText}
                    </span>
                    </div>
                  )}
                </div>
              </TimeLineItem>
            ))}
          </TimeLime>
          {this.state.feedbacks.length === 0 && (
            <Empty title={'「得寸进尺」期待您的宝贵意见。'}>
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
