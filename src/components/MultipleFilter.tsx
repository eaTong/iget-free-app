/**
 * Created by eatong on 2020/2/6.
 */

import React, {Component} from 'react';
import {
  IonButton, IonButtons,
  IonChip,
  IonContent,
  IonHeader,
  IonIcon,
  IonList, IonModal,
  IonTitle,
  IonToolbar
} from '@ionic/react';
import {filterOutline} from "ionicons/icons";


interface MultipleFilterPropsInterface {
  dataSource: Array<any>
  onChange?: Function,
  label?: string,
  emptyTip: string,
  selectedKeys?: Array<any>,
}

interface ScrollTabBarInterface {
  showModal: boolean,
  selectedItems: Array<any>
}

class MultipleFilter extends Component<MultipleFilterPropsInterface, ScrollTabBarInterface> {
  constructor(props: MultipleFilterPropsInterface) {
    super(props);
    this.state = {showModal: false, selectedItems: []};
  }

  static defaultProps = {
    emptyTip: '请选择'
  };

  toggleModal(showModal: boolean) {
    this.setState({showModal});
  }

  onChangeTag(item: any) {
    const {selectedItems} = this.state;
    if (selectedItems.find((v: any) => v.key === item.key)) {
      const index = selectedItems.findIndex((v: any) => v.key === item.key);
      selectedItems.splice(index, 1);
    } else {
      selectedItems.push(item);
    }
    this.setState({selectedItems})
  }

  onSave() {
    // this.toggleModal(false);
    const {selectedItems} = this.state;
    this.setState({showModal: false});
    this.props.onChange && this.props.onChange(selectedItems.map(item => item.key), selectedItems);
  }

  render() {
    const {dataSource, emptyTip} = this.props;
    const {showModal, selectedItems} = this.state;
    return (
      <div className="et-multiple-filter-line">
        <div className="label-container" onClick={() => this.toggleModal(true)}>
          {selectedItems.length === 0 ? (
            <span className="placeholder">{emptyTip}</span>) : selectedItems.map((item: any) => item.label).join('、')}
        </div>
        <IonIcon icon={filterOutline}/>
        <IonModal isOpen={showModal} onDidDismiss={() => this.toggleModal(false)} cssClass={'tags-modal'}>
          <IonHeader>
            <IonToolbar>
              <IonTitle>{`请选择选择`}</IonTitle>
              <IonButtons slot="end">
                <IonButton color='primary' onClick={() => this.setState({selectedItems: []})}>清空</IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent>
            <IonList>
              <div className="tag-list">
                {dataSource.map((item: any) => {
                  const selected = selectedItems.find((v) => v.key === item.key);
                  return (
                    <IonChip
                      key={item.key}
                      color={selected ? 'primary' : 'medium'}
                      onClick={() => this.onChangeTag(item)}
                    >
                      {item.label}
                    </IonChip>
                  )
                })}
              </div>

            </IonList>
          </IonContent>
          <IonButton color='primary' onClick={() => this.onSave()}>确定</IonButton>
        </IonModal>
      </div>
    )
  }
}

export default MultipleFilter;
