/**
 * Created by eaTong on 2020-02-01 .
 * Description: auto generated in  2020-02-01
 */

import React, {Component} from "react";
import {
  IonButton,
  IonButtons,
  IonContent, IonFab,
  IonHeader,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonItemOption,
  IonItemOptions,
  IonItemSliding,
  IonPage,
  IonTitle,
  IonToolbar,
  IonSearchbar,
  withIonLifeCycle,
  IonFabButton,
  IonIcon
} from "@ionic/react";
import {PagePropsInterface} from "../../utils/PagePropsInterface";
import ajax from "../../utils/ajax";
import Empty from "../../components/Empty";
import ContactListItem from "./ContactListItem";
import {Modals} from "@capacitor/core";
import BackButton from "../../components/BackButton";
import MultipleFilter from "../../components/MultipleFilter";
import {add} from "ionicons/icons";
import {importContact} from "../../utils/utils";
import showToast from "../../utils/toastUtil";
import showLoading from "../../utils/loadingUtil";

interface ContactPageState {
  keywords: string,
  contacts: Array<any>,
  myTags: Array<any>,
  fetched: boolean,
  total: number,
  page: number,
  selectedTabs: Array<string>
}

class ContactPage extends Component<PagePropsInterface, ContactPageState> {
  state = {
    contacts: [],
    myTags: [],
    fetched: false,
    total: 0,
    page: 0,
    keywords: '',
    selectedTabs: []
  };

  async ionViewDidEnter() {
    this.getContacts();
    this.getMyTags();
  }

  async getMyTags() {
    const myTags = await ajax({
      url: '/api/tag/get/mine',
      data: {statics: false}
    });
    this.setState({
      myTags: myTags.map((tag: any) => ({
        key: tag.id + '',
        label: `${tag.name}`
      }))
    });
  }

  async search(keywords: string) {
    this.setState({keywords}, () => this.getContacts());
  }


  onChangeTab(selectedKeys: Array<string>) {
    this.setState({selectedTabs: selectedKeys}, () => this.getContacts())
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
    const {keywords,selectedTabs} = this.state;
    const {list, total} = await ajax({
      url: '/api/contact/get',
      data: {keywords, tagIds: selectedTabs, pageIndex: page}
    });
    this.setState({fetched: true, contacts: page === 0 ? list : [...this.state.contacts, ...list], total});
  }

  async importContact() {
    const contacts = await importContact();
    if(contacts.length ===0 ){
      return;
    }
    const loading = showLoading('正在保存联系人数据');
    await ajax({
      url: '/api/contact/import',
      data: contacts
    });
    loading.destroy();
    showToast(`成功导入${contacts.length}条数据`)
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
              <IonButton onClick={this.importContact.bind(this)}>导入</IonButton>
            </IonButtons>
          </IonToolbar>
          <IonToolbar>
            <IonSearchbar animated placeholder={'输入名称或拼音搜索'} onIonChange={(e: any) => this.search(e.target.value)}>
              <MultipleFilter
                iconOnly
                emptyTip={'全部标签'} dataSource={myTags}
                onChange={(selectedKeys: Array<string>) => this.onChangeTab(selectedKeys)}/>
            </IonSearchbar>

          </IonToolbar>

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

          <IonFab vertical="bottom" horizontal="end" slot="fixed">
            <IonFabButton onClick={() => this.createContact()}>
              <IonIcon icon={add}/>
            </IonFabButton>
          </IonFab>

          <IonInfiniteScroll threshold="100px" onIonInfinite={(event) => this.onIonInfinite(event)}>
            <IonInfiniteScrollContent loadingText={'正在加载下一页'}/>
          </IonInfiniteScroll>
        </IonContent>
      </IonPage>
    )
  }
}

export default withIonLifeCycle(ContactPage);
