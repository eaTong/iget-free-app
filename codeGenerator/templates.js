const {upperFirstLetter} = require("./utils");

module.exports.getAddRoute = function (form) {
  return `      {path: '/${form}/home', component: ${upperFirstLetter(form)}Page},
      {path: '/${form}/add', component: Add${upperFirstLetter(form)}},
      {path: '/${form}/edit/:id', component: Add${upperFirstLetter(form)}},
      {path: '/${form}/detail/:id', component: ${upperFirstLetter(form)}Detail},`
};

module.exports.getImportPage = function (form) {
  return `
import ${upperFirstLetter(form)}Page from "./pages/${form}/${upperFirstLetter(form)}Page";
import Add${upperFirstLetter(form)} from "./pages/${form}/Add${upperFirstLetter(form)}";
import ${upperFirstLetter(form)}Detail from "./pages/${form}/${upperFirstLetter(form)}Detail";
  `
};

module.exports.getFormPage = function (form) {
  return `
import React, {Component} from "react";
import {
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonContent,
  IonButton,
  IonButtons,
  IonItemSliding,
  withIonLifeCycle,
  IonInfiniteScroll,
  IonInfiniteScrollContent, IonItemOptions, IonItemOption
} from "@ionic/react";
import {PagePropsInterface} from "../../utils/PagePropsInterface";
import ajax from "../../utils/ajax";
import Empty from "../../components/Empty";
import ${upperFirstLetter(form)}ListItem from "./${upperFirstLetter(form)}ListItem";
import {Modals} from "@capacitor/core";
import BackButton from "../../components/BackButton";

interface ${upperFirstLetter(form)}PageState {
  ${form}Status: string,
  ${form}s: Array<any>,
  fetched: boolean,
  total: number,
  page: number
}

class ${upperFirstLetter(form)}Page extends Component<PagePropsInterface, ${upperFirstLetter(form)}PageState> {
  state = {
    ${form}Status: '-1',
    ${form}s: [],
    fetched: false,
    total: 0,
    page: 0
  };

  async ionViewDidEnter() {
    this.get${upperFirstLetter(form)}s()
  }

  create${upperFirstLetter(form)}() {
    this.props.history.push('/${form}/add')
  }

  async onIonInfinite(event: any) {
    const {page} = this.state;
    if ((page + 1) * 20 < this.state.total) {

      await this.get${upperFirstLetter(form)}s(page + 1);
      this.setState({page: page + 1});
    }
    event.target.complete();
  }

  async get${upperFirstLetter(form)}s(page: number = 0) {
    const {list, total} = await ajax({
      url: '/api/${form}/get',
      data: {pageIndex: page, status: parseInt(this.state.${form}Status)}
    });
    this.setState({fetched: true, ${form}s: page === 0 ? list : [...this.state.${form}s, ...list], total});
  }

  async delete${upperFirstLetter(form)}(${form}: any) {
    const {value} = await Modals.confirm({title: '操作确认', message: '删除后数据将不可恢复，确认删除？'});
    if (value) {
      await ajax({
        url: '/api/${form}/delete',
        data: {ids: [${form}.id]}
      });
      this.get${upperFirstLetter(form)}s(0);
    }
  }

  render() {
    const {${form}s, fetched} = this.state;
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <BackButton/>
            </IonButtons>
            <IonTitle>我的XXX</IonTitle>
            <IonButtons slot="end">
              <IonButton onClick={this.create${upperFirstLetter(form)}.bind(this)}>新建</IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          {${form}s.length === 0 && fetched && (
            <Empty title={'您还没有加入任何XXX哦'}>
              <IonButton onClick={this.create${upperFirstLetter(form)}.bind(this)}>新建</IonButton>
            </Empty>
          )}
          {${form}s.map((${form}: any) => (
            <IonItemSliding key={${form}.id}>
              <${upperFirstLetter(form)}ListItem history={this.props.history} ${form}={${form}} key={${form}.id}/>
              <IonItemOptions side="end">
                <IonItemOption color="danger" onClick={_=> this.delete${upperFirstLetter(form)}(${form})}>删除</IonItemOption>
                <IonItemOption color="warning" onClick={_=> this.props.history.push(\`/${form}/edit/\${${form}.id}\`)}>
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

export default withIonLifeCycle(${upperFirstLetter(form)}Page);
`
};
module.exports.getListItem = function (form) {
  return `
import React from 'react';
import {IonItem, IonLabel} from "@ionic/react";

interface ${upperFirstLetter(form)}ListItemInterface {
  ${form}: any,
  key: any,
  history: any
}

const ${upperFirstLetter(form)}ListItem: React.FC<${upperFirstLetter(form)}ListItemInterface> = (props: ${upperFirstLetter(form)}ListItemInterface) => {
  const {${form}, history} = props;

  function viewDetail(event: any) {
    event.stopPropagation();
    event.preventDefault();
    history.push(\`/${form}/detail/\${${form}.id}\`)
  }

  return (
    <IonItem button onClick={viewDetail}>
      <IonLabel>
        <h3>{${form}.name}</h3>
      </IonLabel>
    </IonItem>
  )
};
export default ${upperFirstLetter(form)}ListItem;
  `
};
module.exports.getDetailPage = function (form) {
  return `

import React, {Component} from "react";
import {
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonContent,
  IonButtons,
  withIonLifeCycle,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonItem,
  IonList,
  IonLabel,
  IonListHeader, IonNote, IonItemSliding, IonItemOptions, IonItemOption, IonIcon, IonFooter, IonButton, IonInput,
} from "@ionic/react";
import ajax from "../../utils/ajax";
import {RouteComponentProps} from "react-router";
import {inject, observer} from "mobx-react";
import BackButton from "../../components/BackButton";

interface ${upperFirstLetter(form)}DetailPageProps extends RouteComponentProps<{
  id: string,
}> {
  app: any,
}

interface ${upperFirstLetter(form)}DetailPageState {
  ${form}Detail:any
}

@inject('app') @observer
class ${upperFirstLetter(form)}DetailPage extends Component<${upperFirstLetter(form)}DetailPageProps, ${upperFirstLetter(form)}DetailPageState> {
  state = {
    ${form}Detail: {
      name: '',
      id: '',
    }
  };

  ionViewDidEnter() {
    this.get${upperFirstLetter(form)}Detail()
  }
  async get${upperFirstLetter(form)}Detail() {
    const ${form}Detail = await ajax({url: '/api/${form}/detail', data: {id: this.props.match.params.id}});
    this.setState({
      ${form}Detail
    });
  }

  render() {
    const {${form}Detail, inside${upperFirstLetter(form)}} = this.state;
    return (
      <IonPage className={'${form}-detail-page'}>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <BackButton/>
            </IonButtons>
            <IonTitle>{${form}Detail.name || ''}</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonCard>
            <IonCardHeader>
              <IonCardTitle>{${form}Detail.name}</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>

            </IonCardContent>
          </IonCard>
        </IonContent>
      </IonPage>
    )
  }
}

export default withIonLifeCycle(${upperFirstLetter(form)}DetailPage);
`;
};
module.exports.getAddForm = function (form) {
  return `
import React, {Component} from "react";
import {
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonContent,
  IonButtons, withIonLifeCycle, IonInput, IonButton, IonList, IonItem, IonLabel
} from "@ionic/react";
import formWrapper from "../../utils/formWrapper";
import {RouteComponentProps} from "react-router";
import {FormWrapperProps} from "../../utils/types";
import ajax from "../../utils/ajax";
import BackButton from "../../components/BackButton";

interface Add${upperFirstLetter(form)}Props extends RouteComponentProps<{
  id?: string,
  operation?: string,
}> {
  app: any,
  form: FormWrapperProps,
}

class Add${upperFirstLetter(form)} extends Component<Add${upperFirstLetter(form)}Props, any> {
    state = {
      ${form}Detail: {}
    };

    async componentDidMount(): Promise<void> {
      if (this.isEdit()) {
        const ${form}Detail = await ajax({url: '/api/${form}/detail', data: {id: this.props.match.params.id}});
        this.setState({
          ${form}Detail
        });
        this.props.form.setFieldsValue(${form}Detail);
      }
    }

    isEdit() {
      return /\/edit\//.test(this.props.match.url)
    }

    async onSaveData() {
      const {history, form} = this.props;
      const values = form.getFieldsValue();
      if (this.isEdit()) {
        await ajax({url: '/api/contact/update', data: {...this.state.contactDetail, ...values}})
        history.replace(\`/contact/detail/\${this.props.match.params.id}\`)
      } else {
        const contact = await ajax({url: '/api/contact/add', data: {...values}});
        history.replace(\`/contact/detail/\${contact.id}\`)
      }
    }

  render() {
    const {form} = this.props;
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <BackButton/>
            </IonButtons>
            <IonTitle>新建XXX</IonTitle>
            <IonButtons slot='end'>
              <IonButton onClick={() => this.onSaveData()}>
                保存
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonList>
            <IonItem>
              <IonLabel>名称</IonLabel>
              {form.getFieldDecorator('name')(
                <IonInput required placeholder={'请输入名称'}/>
              )}
            </IonItem>
          </IonList>
        </IonContent>
      </IonPage>
    )
  }
}
export default withIonLifeCycle(formWrapper(Add${upperFirstLetter(form)}));
`
};

module.exports.getHomeCard = function (form) {
  return `
import React from 'react';
import ${upperFirstLetter(form)}ListItem from "../../pages/${form}/${upperFirstLetter(form)}ListItem";

interface ${upperFirstLetter(form)}ListInterface {
  ${form}List: Array<any>,
  history: any,
}

const ${upperFirstLetter(form)}List: React.FC<${upperFirstLetter(form)}ListInterface> = (props: ${upperFirstLetter(form)}ListInterface) => {
  const {${form}List, history} = props;
  return (
    <>
      {${form}List.map((${form}: any) => (
        <${upperFirstLetter(form)}ListItem history={history} ${form}={${form}} key={${form}.id}/>
      ))}
    </>
  )
};
export default ${upperFirstLetter(form)}List;
`
};

module.exports.getHomeCardImport = function (form) {
  return `
import ${upperFirstLetter(form)}List from "../components/cards/${upperFirstLetter(form)}List";
`
};
module.exports.getHomeCardConfig = function (form) {
  return `{
    title: '${form}',
    key: '${form}-all',
    subtitle: '',
    ajaxConfig: {url: '/api/${form}/get', data: {pageSize: 5}},
    dataResolve: (result: any) => ({${form}List: result.list}),
    link: '/${form}/home',
    hide: false,
    Component: ${upperFirstLetter(form)}List
  },`;
}
