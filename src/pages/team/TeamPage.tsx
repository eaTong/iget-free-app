import React, {Component} from "react";
import {
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonContent,
  IonButton,
  IonButtons, IonSegment, IonSegmentButton, IonLabel, withIonLifeCycle, IonMenuButton
} from "@ionic/react";
import {PagePropsInterface} from "../../utils/PagePropsInterface";
import ajax from "../../utils/ajax";
import Empty from "../../components/Empty";

interface TeamPageState {
  teamStatus: string,
  teams: Array<any>,
  fetched: boolean,
  total: number
}

class TeamPage extends Component<PagePropsInterface, TeamPageState> {
  state = {
    teamStatus: 'all',
    teams: [],
    fetched: false,
    total: 0
  };

  async ionViewDidEnter() {
    const {list, total} = await ajax({url: '/api/team/get'});
    this.setState({fetched: true, teams: list, total});
    console.log(list, total);
  }

  createTeam(){
    this.props.history.push('/team/add')
  }

  render() {
    const {teamStatus, teams, fetched} = this.state;
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonMenuButton/>
            </IonButtons>
            <IonTitle>我的团队</IonTitle>
            <IonButtons slot="end">
              <IonButton onClick={()=>this.createTeam()}>创建团队</IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonSegment onIonChange={e => console.log('Segment selected', e.detail.value)} value={teamStatus}>
            <IonSegmentButton value="all">
              <IonLabel>全部</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="mine">
              <IonLabel>我创建的</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="joined">
              <IonLabel>我加入的</IonLabel>
            </IonSegmentButton>
          </IonSegment>
          {teams.length === 0 && fetched && (
            <Empty title={'您还没有加入任何团队哦'}>
              <IonButton  onClick={()=>this.createTeam()}>立刻创建</IonButton>
            </Empty>
          )}

        </IonContent>

      </IonPage>
    )
  }
}

export default withIonLifeCycle(TeamPage);
