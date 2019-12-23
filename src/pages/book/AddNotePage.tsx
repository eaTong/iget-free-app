import React, {Component} from "react";
import {
  IonButtons,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonBackButton, IonButton, IonContent, IonItem, IonTextarea, IonList, IonLabel
} from "@ionic/react";
import {PagePropsInterface} from "../../utils/PagePropsInterface";
import ajax from "../../utils/ajax";
import {parse} from "querystring";

class AddNotePage extends Component<PagePropsInterface, {}> {
  state = {
    content: '',
    reference: '',
    imgs: ''
  };

  async saveNote() {
    const {location} = this.props;
    const query = parse(location.search.replace('?', ""));
    await ajax({url: '/api/bookNote/add', data: {...this.state, bookId: query.id}});
    this.props.history.goBack();
  }

  render() {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton/>
            </IonButtons>
            <IonTitle>添加笔记</IonTitle>
            <IonButtons slot="end">
              <IonButton color={'primary'} onClick={() => this.saveNote()}>保存</IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonList>
            <IonItem>
              <IonLabel position={'floating'}>笔记</IonLabel>
              <IonTextarea
                value={this.state.content}
                rows={2}
                autoGrow
                required
                onIonChange={(val: any) => this.setState({content: val.target.value})}
              />
            </IonItem>
            <IonItem>
              <IonLabel position={'floating'}>内容引用</IonLabel>
              <IonTextarea
                value={this.state.reference}
                rows={2}
                required
                autoGrow
                onIonChange={(val: any) => this.setState({reference: val.target.value})}
              />
            </IonItem>
          </IonList>
        </IonContent>
      </IonPage>
    )
  }
}

export default AddNotePage;
