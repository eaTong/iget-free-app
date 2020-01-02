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
import TeamListItem from "./TeamListItem";

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
    this.getTeams()
  }

  createTeam() {
    this.props.history.push('/team/add')
  }

  async getTeams(page: number = 0) {

    const {list, total} = await ajax({url: '/api/team/get', data: {page, status: this.state.teamStatus}});
    this.setState({fetched: true, teams: page === 0 ? list : [...this.state.teams, ...list], total});
  }

  onChangeTeamStatus(teamStatus: any) {
    this.setState({teamStatus}, () => this.getTeams())
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
              <IonButton onClick={() => this.createTeam()}>创建团队</IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonSegment onIonChange={e => this.onChangeTeamStatus(e.detail.value)} value={teamStatus}>
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
              <IonButton onClick={() => this.createTeam()}>立刻创建</IonButton>
            </Empty>
          )}
          {teams.map((team: any) => (
            <TeamListItem team={team} key={team.id}/>
          ))}

        </IonContent>

      </IonPage>
    )
  }
}

export default withIonLifeCycle(TeamPage);
