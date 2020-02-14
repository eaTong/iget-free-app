/**
 * Created by eatong on 2020/2/13.
 */

import React, {Component} from 'react';
import ajax from "../utils/ajax";
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonList,
  IonModal,
  IonSearchbar,
  IonTitle,
  IonToolbar,
  IonRadioGroup,
  IonRadio,
  IonLabel,
  IonItem
} from '@ionic/react';

interface AsyncSelectInterfaceProps {
  multiple?: boolean,
  placeholder?: string,
  api: string,
  valueEnsureApi?: string,
  resultResolve: Function,
  dataResolve: Function,
  ensureResultResolve: Function,
  ensureDataResolve: Function,
  onChange?: Function,
  value?: any,
}

interface AsyncSelectInterface {
  showSelectionModal: boolean,
  dataList: Array<any>,
  keywords: string,
  keyMapping: any,
  value: string,
}

class AsyncSelect extends Component<AsyncSelectInterfaceProps, AsyncSelectInterface> {
  static defaultProps = {
    resultResolve: (data: any) => data.list,
    ensureResultResolve: (data: any) => data.list,
    dataResolve: (keywords: string) => ({keywords}),
    ensureDataResolve: (ids: Array<any>) => ({ids}),
    placeholder: '请选择'
  };
  state = {
    dataList: [],
    keyMapping: {},
    keywords: '',
    value: '',
    showSelectionModal: false
  };

  async componentDidMount(): Promise<void> {
    if (this.props.valueEnsureApi) {
      this.ensureValues();
    }
  }

  async ensureValues() {
    const {api, ensureDataResolve, dataResolve} = this.props;
    const {keywords} = this.state;
    const result = await ajax({url: api, data: dataResolve()});
    const dataList = result ? ensureDataResolve(result, keywords) : [];
    this.mapKeys(dataList);
  }

  mapKeys(dataList = []) {
    dataList.forEach((data: any) => {
      const {keyMapping} = this.state;
      keyMapping[data.id + ''] = data;
      this.setState({keyMapping})
    })
  }

  toggleModal(showSelectionModal: boolean) {
    if (showSelectionModal && this.state.dataList.length === 0) {
      this.getData(this.state.keywords)
    } else {
      this.setState({value: this.props.value});
    }
    this.setState({showSelectionModal});
  }

  async getData(keywords = '') {
    const {api, resultResolve, dataResolve} = this.props;
    const result = await ajax({url: api, data: dataResolve(keywords)});
    const dataList = result ? resultResolve(result ,keywords) : [];
    this.mapKeys(dataList);
    this.setState({dataList});
  }

  renderDisplay() {
    const {value, multiple, placeholder} = this.props;
    if (multiple) {
      return value.length > 0 ? `${this.getLabel[value[0]]}等${value.length}项` : placeholder
    }
    return value ? this.getLabel(value) : (<span className="placeholder">{placeholder}</span>)

  }

  getLabel(value: string) {
    const item = this.state.keyMapping[value + ''] || {};
    return item.name || '';
  }

  onSelect() {
    const {onChange} = this.props;
    this.toggleModal(false);
    onChange && onChange(this.state.value)
  }

  onFilterChange(event: any) {
    console.log(event);
    const keywords = event.target.value;
    this.setState({keywords}, () => this.getData(keywords));
  }

  render() {
    const {showSelectionModal, keywords, dataList, value} = this.state;
    return (
      <>
        <div className="et-async-select" onClick={() => this.toggleModal(true)}>
          {this.renderDisplay()}
        </div>
        <IonModal onDidDismiss={() => this.toggleModal(false)} isOpen={showSelectionModal}>
          <IonHeader>
            <IonToolbar>
              <IonTitle>{`选择标签`}</IonTitle>
              <IonButtons slot="end">
                <IonButton color='primary' onClick={() => this.toggleModal(false)}>取消</IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent>
            <IonSearchbar
              placeholder={'没有想要的？搜索试试吧。'}
              value={keywords}
              onIonChange={(event: any) => this.onFilterChange(event)}
            />
            <IonRadioGroup onIonChange={(event: any) => this.setState({value: event.target.value})} value={value}>
              {dataList.map((data: any) => (
                <IonItem key={data.id}>
                  <IonLabel>{this.getLabel(data.id + '')}</IonLabel>
                  <IonRadio value={data.id} slot='end'/>
                </IonItem>
              ))}
            </IonRadioGroup>
            <IonList>

            </IonList>
          </IonContent>
          <IonButton color='primary' onClick={() => this.onSelect()}>确定</IonButton>
        </IonModal>
      </>
    )
  }
}

export default AsyncSelect;
