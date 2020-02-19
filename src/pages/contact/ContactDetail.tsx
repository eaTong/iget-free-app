/**
 * Created by eaTong on 2020-02-01 .
 * Description: auto generated in  2020-02-01
 */


import React, {Component} from "react";
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
  IonLabel,
  IonListHeader,
} from "@ionic/react";
import ajax from "../../utils/ajax";
import {RouteComponentProps} from "react-router";
import {inject, observer} from "mobx-react";
import PickImage from "../../components/PickImage";
import SelectTag from "../../components/SelectTag";
import BackButton from "../../components/BackButton";
import {bookmarks, link, add} from "ionicons/icons";
import TimeLime from "../../components/TimeLime";
import TimeLineItem from "../../components/TimeLineItem";
import {getTimeFormat} from "../../utils/utils";
import showLoading from "../../utils/loadingUtil";
import ReactEcharts from "echarts-for-react";

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
      fromRelations: [],
      toRelations: [],
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

  renderCharts() {
    const {contactDetail} = this.state;
    const nodes = [
      {name: contactDetail.name, value: contactDetail.id + '', category: 1},
    ];
    const links: Array<any> = [];

    (contactDetail.fromRelations || []).forEach((relation: any) => {
      nodes.push({
        name: relation.contactTo.name, value: relation.contactToId + '',
        category: relation.contactTo.gender ? 0 : 2
      },);
      links.push({
        source: contactDetail.name,
        target: relation.contactTo.name + '',
        label: {show: true, formatter: () => relation.relation.name, fontSize: 14}
      })
    });
    (contactDetail.toRelations || []).forEach((relation: any) => {
      nodes.push({
        name: relation.contactFrom.name,
        value: relation.contactToId + '',
        category: relation.contactFrom.gender ? 0 : 2
      });
      links.push({
        source: relation.contactFrom.name + '',
        target: contactDetail.name,
        label: {show: true, formatter: () => relation.relation.name, fontSize: 14}
      })
    });
    if (links.length === 0) {
      return null;
    }
    const option = {
      tooltip: {},
      animationDurationUpdate: 1500,
      animationEasingUpdate: 'quinticInOut',
      series: [
        {
          type: 'graph',
          layout: 'circular',
          symbol: 'roundRect',
          roam: true,
          label: {
            show: true
          },
          edgeSymbol: ['circle', 'arrow'],
          edgeLabel: {
            fontSize: 20
          },
          categories: [{name: '标签男'}, {name: '联系人', symbol: 'roundRect', symbolSize: [50, 30]}, {name: '人脉女'}],
          nodes,
          links: links,
          // links: [],
          lineStyle: {
            opacity: 0.9,
            width: 2,
            curveness: 0
          }
        }
      ]
    };
    return (
      <ReactEcharts
        style={{height: window.screen.availWidth}}
        option={option}
        notMerge={true}
        lazyUpdate={true}
        theme={"theme_name"}
      />
    )
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
            {contactDetail.phone && (
              <div className="et-row">
                <div className="label">电话</div>
                <div className="value">{contactDetail.phone}</div>
              </div>

            )}
            {contactDetail.birthday && (
              <div className="et-row">
                <div className="label">生日</div>
                <div className="value">{contactDetail.birthday}</div>
              </div>

            )}
            <p className="description">{contactDetail.description}</p>
            <PickImage value={contactDetail.album || []}/>
          </IonCardContent>
          <SelectTag
            value={contactDetail.tags.map((tag: any) => tag.id)}
            onChange={(tags: Array<string>) => this.onChangeTags(tags)}
          />
          {this.renderCharts()}

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
            <IonIcon icon={add}/>
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
