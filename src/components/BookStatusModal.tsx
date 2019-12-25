import React, {Component} from "react";
import {
  IonButtons,
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonLabel,
  IonItem,
  IonList,
  IonModal, IonButton, IonItemGroup, IonItemDivider, IonRadioGroup, IonRadio, IonDatetime
} from "@ionic/react";
import {bookMarkStatus, bookMarkListenedStatus} from "../utils/enums";
import moment from "moment";

interface BookStatusProps {
  onDismiss: Function,
  onSubmit: Function,
  title: string,
  mark: any
}

interface BookStatusState {
  mark: any
}

class BookStatusModal extends Component<BookStatusProps, BookStatusState> {
  constructor(props: any) {
    super(props);
    this.state = {
      mark: {}
    }
  }

  componentDidMount() {
    const {mark} = this.props;
    this.setState({mark: {...mark}})
  }

  onChangeMark(value: number, key: string) {
    const {mark} = this.state;
    mark[key] = value;
    if (key === 'status' && value === 3) {
      mark.finishTime = mark.finishTime || moment().format('YYYY-MM-DD');
    }
    if (key === 'listenedStatus' && value === 1) {
      mark.finishListeningTime = mark.finishListeningTime || moment().format('YYYY-MM-DD');
    }
    this.setState({mark});
  }

  render() {
    const {onSubmit, onDismiss, title} = this.props;
    const {mark} = this.state;
    return (
      <IonModal isOpen onDidDismiss={() => onDismiss()}>
        <IonHeader>
          <IonToolbar>
            <IonTitle>{`标记：${title}`}</IonTitle>
            <IonButtons slot="end">
              <IonButton color='primary' onClick={() => onDismiss()}>取消</IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonList>
            <IonItemGroup>
              <IonItemDivider>
                <IonLabel>读书状态</IonLabel>
              </IonItemDivider>
              <IonRadioGroup
                value={mark.status}
                onIonChange={(event: any) => this.onChangeMark(event.target.value, 'status')}>
                {bookMarkStatus.map((status: string, index: number) => (
                  <IonItem key={status}>
                    <IonLabel>{status}</IonLabel>
                    <IonRadio value={index}/>
                  </IonItem>

                ))}
              </IonRadioGroup>
              {mark.status === 3 && (
                <IonItem>
                  <IonLabel>读完日期</IonLabel>
                  <IonDatetime
                    displayFormat="YYYY-MM-DD"
                    value={mark.finishTime}
                    onIonChange={(event: any) => this.onChangeMark(event.target.value, 'finishTime')}/>
                </IonItem>
              )}


            </IonItemGroup>
            <IonItemGroup>
              <IonItemDivider>
                <IonLabel>听书状态</IonLabel>
              </IonItemDivider>
              <IonRadioGroup value={mark.listenedStatus || 0}
                             onIonChange={(event: any) => this.onChangeMark(event.target.value, 'listenedStatus')}>
                {bookMarkListenedStatus.map((status: string, index: number) => (
                  <IonItem key={status}>
                    <IonLabel>{status}</IonLabel>
                    <IonRadio value={index}/>
                  </IonItem>

                ))}
              </IonRadioGroup>
              {mark.listenedStatus === 1 && (
                <IonItem>
                  <IonLabel>听书日期</IonLabel>
                  <IonDatetime
                    displayFormat="YYYY-MM-DD"
                    value={mark.finishListeningTime}
                    onIonChange={(event: any) => this.onChangeMark(event.target.value, 'finishListeningTime')}/>
                </IonItem>
              )}
            </IonItemGroup>
          </IonList>
        </IonContent>
        <IonButton color='primary' onClick={() => onSubmit(this.state.mark)}>确定</IonButton>
      </IonModal>
    )
  }
}

export default BookStatusModal;
