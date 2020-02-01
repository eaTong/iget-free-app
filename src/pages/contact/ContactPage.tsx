
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
  IonButton,
  IonButtons,
  withIonLifeCycle,
  IonBackButton,
  IonInfiniteScroll,
  IonInfiniteScrollContent
} from "@ionic/react";
import {PagePropsInterface} from "../../utils/PagePropsInterface";
import ajax from "../../utils/ajax";
import Empty from "../../components/Empty";
import ContactList from "../../components/cards/ContactList";

interface ContactPageState {
  contactStatus: string,
    contacts: Array<any>,
    fetched: boolean,
    total: number,
    page: number
}

class ContactPage extends Component<PagePropsInterface, ContactPageState> {
  state = {
    contactStatus: '-1',
    contacts: [],
    fetched: false,
    total: 0,
    page: 0
  };

  async ionViewDidEnter() {
    this.getContacts()
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
      data: {pageIndex: page, status: parseInt(this.state.contactStatus)}
    });
    this.setState({fetched: true, contacts: page === 0 ? list : [...this.state.contacts, ...list], total});
  }

  render() {
    const {contacts, fetched} = this.state;
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton/>
            </IonButtons>
            <IonTitle>我的XXX</IonTitle>
            <IonButtons slot="end">
              <IonButton onClick={this.createContact.bind(this)}>新建</IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          {contacts.length === 0 && fetched && (
            <Empty title={'您还没有加入任何XXX哦'}>
              <IonButton onClick={this.createContact.bind(this)}>新建</IonButton>
            </Empty>
          )}
          <ContactList history={this.props.history} contactList={contacts}/>
          <IonInfiniteScroll threshold="100px" onIonInfinite={(event) => this.onIonInfinite(event)}>
            <IonInfiniteScrollContent loadingText={'正在加载下一页'}/>
          </IonInfiniteScroll>
        </IonContent>
      </IonPage>
    )
  }
}
export default withIonLifeCycle(ContactPage);
