import React, {Component} from "react";
import {
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonContent,
  IonButtons, IonBackButton, IonButton, IonSegment, IonSegmentButton, IonLabel, withIonLifeCycle
} from "@ionic/react";
import {PagePropsInterface} from "../../utils/PagePropsInterface";
import Empty from "../../components/Empty";
import ajax from "../../utils/ajax";
import ObjectiveList from "../../components/cards/ObjectiveList";

interface OKRHomePageState {

}

class OKRHomePage extends Component<PagePropsInterface, OKRHomePageState> {
  state = {
    objectiveStatus: '-1',
    objectives: [],
    fetched: false,
    total: 0
  };

  async ionViewDidEnter() {
    this.getObjectives()
  }

  createObjective() {
    this.props.history.push('/objective/add')
  }

  async getObjectives(page: number = 0) {
    const {list, total} = await ajax({
      url: '/api/objective/get',
      data: {page, status: parseInt(this.state.objectiveStatus)}
    });
    this.setState({fetched: true, objectives: page === 0 ? list : [...this.state.objectives, ...list], total});
  }

  onChangeObjectiveStatus(objectiveStatus: any) {
    this.setState({objectiveStatus}, () => this.getObjectives())
  }


  render() {
    const {objectiveStatus, objectives, fetched} = this.state;
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton/>
            </IonButtons>
            <IonTitle>我的OKR</IonTitle>
            <IonButtons slot='end'>
              <IonButton onClick={() => this.props.history.push('/okr/add')}>
                创建小目标
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonSegment onIonChange={e => this.onChangeObjectiveStatus(e.detail.value)} value={objectiveStatus}>
            <IonSegmentButton value="-1">
              <IonLabel>全部</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="0">
              <IonLabel>我创建的</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="1">
              <IonLabel>我负责的</IonLabel>
            </IonSegmentButton>
          </IonSegment>
          {objectives.length === 0 && fetched && (
            <Empty title={'还没有定计划？'}>
              <IonButton onClick={() => this.createObjective()}>立刻定下一个小目标</IonButton>
            </Empty>
          )}
          <ObjectiveList objectiveList={objectives} history={this.props.history}/>

        </IonContent>

      </IonPage>
    )
  }
}

export default withIonLifeCycle(OKRHomePage);
