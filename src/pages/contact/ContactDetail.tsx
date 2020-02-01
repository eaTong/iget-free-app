
/**
 * Created by eaTong on 2020-02-01 .
 * Description: auto generated in  2020-02-01
 */


import React, {Component} from "react";
import {
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonContent,
  IonBackButton,
  IonButtons,
  withIonLifeCycle,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
} from "@ionic/react";
import ajax from "../../utils/ajax";
import {RouteComponentProps} from "react-router";
import {inject, observer} from "mobx-react";

interface ContactDetailPageProps extends RouteComponentProps<{
  id: string,
}> {
  app: any,
}

interface ContactDetailPageState {
  contactDetail: any
}

@inject('app') @observer
class ContactDetailPage extends Component<ContactDetailPageProps, ContactDetailPageState> {
  state = {
    contactDetail: {
      name: '',
      id: '',
    }
  };

  ionViewDidEnter() {
    this.getContactDetail()
  }
  async getContactDetail() {
    const contactDetail = await ajax({url: '/api/contact/detail', data: {id: this.props.match.params.id}});
    this.setState({
      contactDetail
    });
  }

  render() {
    const {contactDetail} = this.state;
    return (
      <IonPage className={'contact-detail-page'}>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton/>
            </IonButtons>
            <IonTitle>{contactDetail.name || ''}</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonCard>
            <IonCardHeader>
              <IonCardTitle>{contactDetail.name}</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>

            </IonCardContent>
          </IonCard>
        </IonContent>
      </IonPage>
    )
  }
}

export default withIonLifeCycle(ContactDetailPage);
