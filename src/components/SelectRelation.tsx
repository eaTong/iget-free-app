/**
 * Created by eatong on 2020/2/5.
 */

import React, {Component} from 'react';
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonModal,
  IonTitle,
  IonToolbar,
  IonSearchbar,
  IonList,
  IonChip
} from '@ionic/react';
import ajax from "../utils/ajax";
import {DynamicObject} from "../utils/types";

interface SelectRelationInterface {
  showRelationModal: boolean,
  hasSearchText: boolean,
  relations: Array<any>,
  selectedRelations: Array<any>,
  filter: string,
  relationMapping: DynamicObject
}

interface SelectRelationIPropsInterface {
  onChange?: Function,
  value?: Array<string>,
}

class SelectRelation extends Component<SelectRelationIPropsInterface, SelectRelationInterface> {
  constructor(props: any) {
    super(props);
    this.state = {
      showRelationModal: false,
      hasSearchText: false,
      relations: [],
      selectedRelations: [],
      filter: '',
      relationMapping: {}
    };
  }

  async componentDidMount(): Promise<void> {

  }

  async componentDidUpdate(): Promise<void> {

    const relationIdsWithoutMapping = (this.props.value || []).filter((relationId: string) => !this.state.relationMapping.hasOwnProperty(relationId + ''));
    if (relationIdsWithoutMapping.length > 0) {
      const relationsWithoutMapping = await ajax({
        url: '/api/relation/get/ids',
        data: {ids: relationIdsWithoutMapping}
      });
      this.mapRelation(relationsWithoutMapping);
    }
  }

  mapRelation(list: Array<any>) {
    const {relationMapping} = this.state;
    for (const relation of list) {
      relationMapping[relation.id + ''] = relation;
    }
    this.setState({relationMapping});
  }

  onFilterChange(event: any) {
    const filter = event.target.value;
    this.setState({filter}, () => this.getRelations(filter));
  }

  async getRelations(keywords?: string) {
    const {filter, selectedRelations} = this.state;
    const {list} = await ajax({url: '/api/relation/get', data: {keywords}});

    const hasSearchText = list.find((relation: any) => relation.name === filter);
    selectedRelations.forEach((relation: any) => {
      if (!list.find((listRelation: any) => listRelation.id === relation.id)) {
        list.push(relation);
      }
    });
    if (!hasSearchText && filter) {
      list.splice(0, 0, {id: `temp~${filter}`, name: filter})
    }

    this.mapRelation(list);
    this.setState({relations: list})
  }

  async toggleRelationModal(showRelationModal: boolean) {
    if (showRelationModal) {
      this.setState({
        filter: '',
        selectedRelations: (this.props.value || []).map((relationId: string) => this.state.relationMapping[relationId])
      });
      await this.getRelations();
    }
    this.setState({showRelationModal})
  }

  async onSelectRelation() {
    const {onChange} = this.props;
    const {selectedRelations} = this.state;
    if (onChange) {
      await onChange(selectedRelations.map(relation => relation.id), selectedRelations);
    }
    this.setState({showRelationModal: false});
  }

  onChangeRelation(relation: any) {
    this.setState({selectedRelations: [relation]})
  }

  render() {
    const value = this.props.value || [];
    const {showRelationModal, relations, selectedRelations, filter, relationMapping} = this.state;
    return (
      <div className='et-select-relation'>
        {value.length === 0 && (
          <IonButton onClick={() => this.toggleRelationModal(true)} expand={'full'}>添加关系</IonButton>
        )}
        {value.length > 0 && (
          <div className="relation-list">
            {value.map((relationId: string) => (
              <IonChip key={relationId} color={'primary'}>{(relationMapping[relationId + ''] || {}).name}</IonChip>
            ))}
            <IonButton size={'small'} color={'light'} onClick={() => this.toggleRelationModal(true)}>选择标签</IonButton>
          </div>
        )}
        <IonModal isOpen={showRelationModal} onDidDismiss={() => this.toggleRelationModal(false)}
                  cssClass={'relations-modal'}>
          <IonHeader>
            <IonToolbar>
              <IonTitle>{`选择关系`}</IonTitle>
              <IonButtons slot="end">
                <IonButton color='primary' onClick={() => this.toggleRelationModal(false)}>取消</IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent>
            <IonSearchbar
              placeholder={'没有想要的？搜索试试吧。'}
              value={filter}
              onIonChange={(event: any) => this.onFilterChange(event)}
            />
            <IonList>
              <div className="relation-list">
                {relations.map((relation: any) => {
                  const selected = selectedRelations.find((item: any) => item.id === relation.id);
                  return (
                    <IonChip key={relation.id} color={selected ? 'primary' : 'medium'}
                             onClick={() => this.onChangeRelation(relation)}>
                      {relation.name}
                    </IonChip>
                  )
                })}
              </div>
            </IonList>
          </IonContent>
          <IonButton color='primary' onClick={() => this.onSelectRelation()}>确定</IonButton>
        </IonModal>
      </div>
    )
  }
}

export default SelectRelation;
