/**
 * Created by eaTong on 2020-02-01 .
 * Description: auto generated in  2020-02-01
 */


import React, {Component, Fragment} from "react";
import {
  IonButtons,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonContent, IonFab, IonFabButton, IonFabList,
  IonHeader, IonIcon,
  IonNote,
  IonPage,
  IonTitle,
  IonToolbar,
  withIonLifeCycle,
  IonList,
  IonItemDivider,
  IonLabel,
  IonListHeader,
} from "@ionic/react";
import ajax from "../../utils/ajax";
import {RouteComponentProps} from "react-router";
import {inject, observer} from "mobx-react";
import PickImage from "../../components/PickImage";
import SelectTag from "../../components/SelectTag";
import BackButton from "../../components/BackButton";
import {bookmarks, link, ellipsisVertical} from "ionicons/icons";
import TimeLime from "../../components/TimeLime";
import TimeLineItem from "../../components/TimeLineItem";
import {getTimeFormat} from "../../utils/utils";
import ContactListItem from "./ContactListItem";
import showLoading from "../../utils/loadingUtil";

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
      album: [],
      tags: [],
      relations: [],
      contactRecords: [],
    }
  };

  ionViewDidEnter() {
    this.getContactDetail()
  }

  async getContactDetail() {
    const loading = showLoading('正在加载。。。');
    const contactDetail = await ajax({url: '/api/contact/detail', data: {id: this.props.match.params.id}});
    this.setState({
      contactDetail
    });
    loading.destroy();
  }


  async onChangeTags(tags: Array<string>) {
    await ajax({url: '/api/contact/update', data: {id: this.props.match.params.id, tags}});
    this.getContactDetail();
  }

  render() {
    const {contactDetail} = this.state;
    return (
      <IonPage className={'contact-detail-page'}>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <BackButton history={this.props.history}/>
            </IonButtons>
            <IonTitle>{contactDetail.name || ''}</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
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
          <SelectTag
            value={contactDetail.tags.map((tag: any) => tag.id)}
            onChange={(tags: Array<string>) => this.onChangeTags(tags)}
          />
          <IonList>
            <IonListHeader>
              <IonLabel>关系链</IonLabel>
            </IonListHeader>
            {contactDetail.relations.map((relation: any) => (
              <Fragment key={relation.id}>
                <IonItemDivider>
                  <IonLabel>{relation.name}</IonLabel>
                </IonItemDivider>
                {relation.contacts.map((contact: any) => (
                  <ContactListItem key={contact.id} contact={contact} history={this.props.history}/>
                ))}
              </Fragment>
            ))}
          </IonList>

          <IonListHeader>
            <IonLabel>回忆</IonLabel>
          </IonListHeader>
          <TimeLime>
            {(contactDetail.contactRecords || []).map((record: any) => (
              <TimeLineItem title={(<span>{getTimeFormat(record.createdAt)}</span>)} key={record.id}>
                <>
                  <p>{record.content}</p>
                  <PickImage value={record.images}/>
                </>
              </TimeLineItem>
            ))}
          </TimeLime>
        </IonContent>

        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton>
            <IonIcon icon={ellipsisVertical}/>
          </IonFabButton>
          <IonFabList side="top">
            <IonFabButton
              color={'danger'}
              onClick={() => this.props.history.push(`/contact/record/${contactDetail.id}`)}>
              <IonIcon icon={bookmarks}/>
            </IonFabButton>
            <IonFabButton
              color={'warning'}
              onClick={() => this.props.history.push(`/contact/add/relation/${contactDetail.id}`)}>
              <IonIcon icon={link}/>
            </IonFabButton>
          </IonFabList>
        </IonFab>
      </IonPage>
    )
  }
}

export default withIonLifeCycle(ContactDetailPage);
