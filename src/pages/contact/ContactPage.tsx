/**
 * Created by eaTong on 2020-02-01 .
 * Description: auto generated in  2020-02-01
 */

import React, {Component} from "react";
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonItemOption,
  IonItemOptions,
  IonItemSliding,
  IonPage,
  IonTitle,
  IonToolbar,
  withIonLifeCycle
} from "@ionic/react";
import {PagePropsInterface} from "../../utils/PagePropsInterface";
import ajax from "../../utils/ajax";
import Empty from "../../components/Empty";
import ContactListItem from "./ContactListItem";
import {Modals} from "@capacitor/core";
import ScrollTabBar from "../../components/ScrollTabBar";
import BackButton from "../../components/BackButton";

interface ContactPageState {
  contactStatus: string,
  contacts: Array<any>,
  myTags: Array<any>,
  fetched: boolean,
  total: number,
  page: number,
  currentTab: string
}

class ContactPage extends Component<PagePropsInterface, ContactPageState> {
  state = {
    contactStatus: '-1',
    contacts: [],
    myTags: [],
    fetched: false,
    total: 0,
    page: 0,
    currentTab: '0'
  };

  async ionViewDidEnter() {
    this.getContacts();
    this.getMyTags();
  }

  async getMyTags() {
    const myTags = await ajax({
      url: '/api/tag/get/mine',
      data: {statics: true}
    });
    this.setState({
      myTags: [{key: '0', label: `全部`}, ...myTags.map((tag: any) => ({
        key: tag.id + '',
        label: `${tag.name}(${tag.total || 0})`
      }))]
    });
  }

  onChangeTab(currentTab: string) {
    this.setState({currentTab}, () => this.getContacts())
  }

  createContact() {
    this.props.history.push('/contact/add')
  }

  async onIonInfinite(event: any) {
    const {page} = this.state;
    if ((page + 1) * 20 < this.state.total) {

      await this.getContacts(page + 1);
      this.setState({page: page + 1});
    }
    event.target.complete();
  }

  async getContacts(page: number = 0) {
    const {list, total} = await ajax({
      url: '/api/contact/get',
      data: {tagId: this.state.currentTab, pageIndex: page, status: parseInt(this.state.contactStatus)}
    });
    this.setState({fetched: true, contacts: page === 0 ? list : [...this.state.contacts, ...list], total});
  }

  async deleteContact(contact: any) {
    const {value} = await Modals.confirm({title: '操作确认', message: '删除后数据将不可恢复，确认删除？'});
    if (value) {
      await ajax({
        url: '/api/contact/delete',
        data: {ids: [contact.id]}
      });
      this.getContacts(0);
    }
  }

  render() {
    const {contacts, fetched, myTags} = this.state;
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <BackButton history={this.props.history}/>
            </IonButtons>
            <IonTitle>人脉</IonTitle>
            <IonButtons slot="end">
              <IonButton onClick={this.createContact.bind(this)}>添加人脉</IonButton>
            </IonButtons>
          </IonToolbar>
          <ScrollTabBar dataSource={myTags} defaultTab={'0'} onChangeTab={(val: string) => this.onChangeTab(val)}/>
        </IonHeader>
        <IonContent>
          {contacts.length === 0 && fetched && (
            <Empty title={'您还没有添加任何人脉'}>
              <IonButton onClick={this.createContact.bind(this)}>添加人脉</IonButton>
            </Empty>
          )}
          {contacts.map((contact: any) => (
            <IonItemSliding key={contact.id}>
              <ContactListItem history={this.props.history} contact={contact} key={contact.id}/>
              <IonItemOptions side="end">
                <IonItemOption color="danger" onClick={_ => this.deleteContact(contact)}>删除</IonItemOption>
                <IonItemOption color="warning" onClick={_ => this.props.history.push(`/contact/edit/${contact.id}`)}>
                  编辑
                </IonItemOption>
              </IonItemOptions>
            </IonItemSliding>
          ))}

          <IonInfiniteScroll threshold="100px" onIonInfinite={(event) => this.onIonInfinite(event)}>
            <IonInfiniteScrollContent loadingText={'正在加载下一页'}/>
          </IonInfiniteScroll>
        </IonContent>
      </IonPage>
    )
  }
}

export default withIonLifeCycle(ContactPage);
