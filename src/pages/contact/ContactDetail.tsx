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
  IonCardContent, IonNote, IonCardSubtitle,
} from "@ionic/react";
import ajax from "../../utils/ajax";
import {RouteComponentProps} from "react-router";
import {inject, observer} from "mobx-react";
import PickImage from "../../components/PickImage";

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
      gender: 0,
      description: '',
      birthday: '',
      phone: '',
      id: '',
      album: []
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
              <IonCardTitle>
                {contactDetail.name}
                <span className="et-remark">
                <IonNote
                  color={contactDetail.gender ? 'danger' : 'primary'}>{contactDetail.gender ? '女' : '男'}</IonNote>
                </span>
              </IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <div className="et-row">
                <div className="label">电话</div>
                <div className="value">{contactDetail.phone}</div>
              </div>
              <div className="et-row">
                <div className="label">生日</div>
                <div className="value">{contactDetail.birthday}</div>
              </div>
              <p className="description">{contactDetail.description}</p>
              <PickImage value={contactDetail.album || []}/>
            </IonCardContent>
          </IonCard>
        </IonContent>
      </IonPage>
    )
  }
}

export default withIonLifeCycle(ContactDetailPage);
