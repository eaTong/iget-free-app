import React, {Component} from "react";
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonTextarea,
  IonTitle,
  IonToolbar
} from "@ionic/react";
import {PagePropsInterface} from "../../utils/PagePropsInterface";
import Rate from "../../components/Rate";
import {parse} from "querystring";
import ajax from "../../utils/ajax";
import BackButton from "../../components/BackButton";

class RageBookPage extends Component<PagePropsInterface, {}> {
  state = {
    reason: '',
    rate: 0,
  };

  async rate() {
    const {location} = this.props;
    const query = parse(location.search.replace('?', ""));
    await ajax({url: '/api/bookMark/rate', data: {...this.state, bookId: query.id}});
    this.props.history.goBack();
  }

  render() {
    const {reason, rate} = this.state;
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <BackButton history={this.props.history}/>
            </IonButtons>
            <IonTitle>添加评分</IonTitle>
            <IonButtons slot="end">
              <IonButton color={'primary'} onClick={() => this.rate()}>保存</IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonList>
            <IonItem>
              <IonLabel>内容引用</IonLabel>
              <Rate value={rate} onChange={(val: any) => this.setState({rate: val})}/>
            </IonItem>
            <IonItem>
              <IonLabel position={'floating'}>评分说明</IonLabel>
              <IonTextarea
                value={reason}
                rows={4}
                autoGrow
                required
                onIonChange={(val: any) => this.setState({reason: val.target.value})}
              />
            </IonItem>
          </IonList>
        </IonContent>
      </IonPage>
    )
  }
}

export default RageBookPage;
