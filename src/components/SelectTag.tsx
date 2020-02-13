/**
 * Created by eatong on 2020/2/5.
 */

import React, {Component} from 'react';
import Empty from "./Empty";
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

interface SelectTagInterface {
  showTagModal: boolean,
  hasSearchText: boolean,
  tags: Array<any>,
  selectedTags: Array<any>,
  filter: string,
  tagMapping: DynamicObject
}

interface SelectTagIPropsInterface {
  onChange?: Function,
  value?: Array<string>,
}

class SelectTag extends Component<SelectTagIPropsInterface, SelectTagInterface> {
  constructor(props: any) {
    super(props);
    this.state = {
      showTagModal: false,
      hasSearchText: false,
      tags: [],
      selectedTags: [],
      filter: '',
      tagMapping: {}
    };
  }

  async componentDidMount(): Promise<void> {

  }

  async componentDidUpdate(): Promise<void> {

    const tagIdsWithoutMapping = (this.props.value || []).filter((tagId: string) => !this.state.tagMapping.hasOwnProperty(tagId + ''));
    if (tagIdsWithoutMapping.length > 0) {
      const tagsWithoutMapping = await ajax({url: '/api/tag/get/ids', data: {ids: tagIdsWithoutMapping}});
      this.mapTag(tagsWithoutMapping);
    }
  }

  mapTag(list: Array<any>) {
    const {tagMapping} = this.state;
    for (const tag of list) {
      tagMapping[tag.id + ''] = tag;
    }
    this.setState({tagMapping});
  }

  onFilterChange(event: any) {
    const filter = event.target.value;
    this.setState({filter}, () => this.getTags(filter));
  }

  async getTags(keywords?: string) {
    const {filter, selectedTags} = this.state;
    const {list} = await ajax({url: '/api/tag/get', data: {keywords}});

    const hasSearchText = list.find((tag: any) => tag.name === filter);
    selectedTags.forEach((tag: any) => {
      if (!list.find((listTag: any) => listTag.id === tag.id)) {
        list.push(tag);
      }
    });
    if (!hasSearchText && filter) {
      list.splice(0, 0, {id: `temp~${filter}`, name: filter})
    }

    this.mapTag(list);
    this.setState({tags: list})
  }

  async toggleTagModal(showTagModal: boolean) {
    if (showTagModal) {
      this.setState({
        filter: '',
        selectedTags: (this.props.value || []).map((tagId: string) => this.state.tagMapping[tagId])
      });
      await this.getTags();
    }
    this.setState({showTagModal})
  }

  async onSelectTag() {
    const {onChange} = this.props;
    const {selectedTags} = this.state;
    if (onChange) {
      await onChange(selectedTags.map(tag => tag.id), selectedTags);
    }
    this.setState({showTagModal: false});
  }

  onChangeTag(tag: any) {
    const {selectedTags} = this.state;
    if (selectedTags.find((item: any) => item.id === tag.id)) {
      const index = selectedTags.findIndex((item: any) => item.id === tag.id);
      selectedTags.splice(index, 1);
      this.setState({selectedTags});
    } else {
      selectedTags.push(tag);
      this.setState({selectedTags})
    }
  }

  render() {
    const value = this.props.value || [];
    const {showTagModal, tags, selectedTags, filter, tagMapping} = this.state;
    return (
      <div className='et-select-tag'>
        {value.length === 0 && (
          <Empty title={'给你的联系人一个合适的标签描述吧'} hideIcon>
            <IonButton onClick={() => this.toggleTagModal(true)}>选择标签</IonButton>
          </Empty>
        )}
        {value.length > 0 && (
          <div className="tag-list">
            {value.map((tagId: string) => (
              <IonChip key={tagId} color={'primary'}>{(tagMapping[tagId + ''] || {}).name}</IonChip>
            ))}
            <IonButton size={'small'} color={'light'} onClick={() => this.toggleTagModal(true)}>选择标签</IonButton>
          </div>
        )}
        <IonModal isOpen={showTagModal} onDidDismiss={() => this.toggleTagModal(false)} cssClass={'tags-modal'}>
          <IonHeader>
            <IonToolbar>
              <IonTitle>{`选择标签`}</IonTitle>
              <IonButtons slot="end">
                <IonButton color='primary' onClick={() => this.toggleTagModal(false)}>取消</IonButton>
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
              <div className="tag-list">
                {tags.map((tag: any) => {
                  const selected = selectedTags.find((item: any) => item.id === tag.id);
                  return (
                    <IonChip key={tag.id} color={selected ? 'primary' : 'medium'} onClick={() => this.onChangeTag(tag)}>
                      {tag.name}
                    </IonChip>
                  )
                })}
              </div>
              {/*<IonItemDivider>*/}
              {/*  <IonLabel>*/}
              {/*    常用标签*/}
              {/*  </IonLabel>*/}
              {/*</IonItemDivider>*/}
              {/*<div className="tag-list">*/}
              {/*  {tags.map((tag: any) => {*/}
              {/*    const selected = selectedTags.find((item: any) => item.id === tag.id);*/}
              {/*    return (*/}
              {/*      <IonBadge key={tag.id} color={selected ? 'primary' : 'light'} onClick={() => this.onChangeTag(tag)}>*/}
              {/*        {tag.name}*/}
              {/*      </IonBadge>*/}
              {/*    )*/}
              {/*  })}*/}
              {/*</div>*/}
            </IonList>
          </IonContent>
          <IonButton color='primary' onClick={() => this.onSelectTag()}>确定</IonButton>
        </IonModal>
      </div>
    )
  }
}

export default SelectTag;
