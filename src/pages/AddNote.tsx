import React, {Component} from "react";
import {
  IonButtons,
  IonContent,
  IonHeader, IonItem, IonPage, IonTextarea,
  IonTitle,
  IonToolbar,
  IonButton,
  IonBackButton
} from "@ionic/react";
import {PagePropsInterface} from "../utils/PagePropsInterface";
import ajax from "../utils/ajax";

class AddNote extends Component<PagePropsInterface, {}> {
  state = {
    note: ''
  };

  async saveNote() {
    const {note} = this.state;
    await ajax({url: '/api/note/add', data: {title: note.slice(0, 20), content: note}});
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
            <IonTitle>add note</IonTitle>
            <IonButtons slot="end">
              <IonButton color={'primary'} onClick={() => this.saveNote()}>保存</IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonItem>
            <IonTextarea
              placeholder="笔记内容。。。"
              autoGrow
              value={this.state.note}
              rows={4}
              required
              onIonChange={(val: any) => this.setState({note: val.target.value})}
            />
          </IonItem>
        </IonContent>
      </IonPage>
    )
  }
}

export default AddNote;
