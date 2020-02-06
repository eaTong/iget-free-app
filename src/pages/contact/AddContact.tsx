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
  IonBackButton,
  IonButtons,
  withIonLifeCycle,
  IonInput,
  IonButton,
  IonList,
  IonItem,
  IonLabel,
  IonSelectOption,
  IonSelect,
  IonDatetime,
  IonTextarea
} from "@ionic/react";
import formWrapper from "../../utils/formWrapper";
import {RouteComponentProps} from "react-router";
import {FormWrapperProps} from "../../utils/types";
import ajax from "../../utils/ajax";
import PickImage from "../../components/PickImage";
import showToast from "../../utils/toastUtil";
import SelectTag from "../../components/SelectTag";

interface AddContactProps extends RouteComponentProps<{
  id?: string,
  operation?: string,
}> {
  app: any,
  form: FormWrapperProps,
}

class AddContact extends Component<AddContactProps, any> {
  state = {
    contactDetail: {}
  };

  async componentDidMount(): Promise<void> {
    if (this.isEdit()) {
      const contactDetail = await ajax({url: '/api/contact/detail', data: {id: this.props.match.params.id}});
      this.setState({
        contactDetail
      });
      this.props.form.setFieldsValue({...contactDetail, tags: contactDetail.tags.map((tag: any) => tag.id)});
    }
  }

  isEdit() {
    return /\/edit\//.test(this.props.match.url)
  }

  async onSaveData() {
    const {history, form} = this.props;
    const values = form.getFieldsValue();
    if (!values.name) {
      showToast('别闹，没有名字怎么玩');
      return;
    }
    if (this.isEdit()) {
      await ajax({url: '/api/contact/update', data: {...this.state.contactDetail, ...values}})
    } else {
      await ajax({url: '/api/contact/add', data: {...values}});
    }
    history.goBack();
  }

  render() {
    const {form} = this.props;
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton/>
            </IonButtons>
            <IonTitle>{`${this.isEdit() ? "编辑" : '添加'}联系人`}</IonTitle>
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
              <IonLabel>姓名</IonLabel>
              {form.getFieldDecorator('name')(
                <IonInput required placeholder={'请输入姓名'}/>
              )}
            </IonItem>
            <IonItem>
              <IonLabel>电话</IonLabel>
              {form.getFieldDecorator('phone')(
                <IonInput required placeholder={'请输入电话'} type={'tel'}/>
              )}
            </IonItem>
            <IonItem>
              <IonLabel>性别</IonLabel>
              {form.getFieldDecorator('gender')(
                <IonSelect placeholder="性别">
                  <IonSelectOption value={0}>男</IonSelectOption>
                  <IonSelectOption value={1}>女</IonSelectOption>
                </IonSelect>
              )}
            </IonItem>
            <IonItem>
              <IonLabel>生日</IonLabel>
              {form.getFieldDecorator('birthday')(
                <IonDatetime displayFormat={'YYYY-MM-DD'} placeholder={'生日'}/>
              )}
            </IonItem>

            <IonItem>
              <IonLabel position={'fixed'}>记忆时刻</IonLabel>
              {form.getFieldDecorator('album')(
                <PickImage/>
              )}
            </IonItem>

            <IonItem>
              <IonLabel position={'fixed'}>备注</IonLabel>
              {form.getFieldDecorator('description')(
                <IonTextarea required placeholder={'备注'}/>
              )}
            </IonItem>

            {form.getFieldDecorator('tags')(
              <SelectTag/>
            )}

          </IonList>
        </IonContent>
      </IonPage>
    )
  }
}

export default withIonLifeCycle(formWrapper(AddContact));
