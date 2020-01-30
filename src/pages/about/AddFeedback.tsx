/**
 * Created by eatong on 2020/1/29.
 */

import React, {Component} from "react";
import {
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonContent,
  IonBackButton,
  IonButtons, withIonLifeCycle, IonInput, IonButton, IonList, IonItem, IonLabel, IonTextarea
} from "@ionic/react";
import {FormPageProps} from "../../utils/PagePropsInterface";
import formWrapper from "../../utils/formWrapper";
import ajax from "../../utils/ajax";
import PickImage from "../../components/PickImage";

interface AddFeedbackState {

}

class AddFeedback extends Component<FormPageProps, AddFeedbackState> {
  state = {};

  componentDidMount(): void {

  }

  async onSaveData() {
    const values = this.props.form.getFieldsValue();
    await ajax({url: '/api/feedback/add', data: values});
    this.props.history.goBack();
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
            <IonTitle>意见反馈</IonTitle>
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
              <IonLabel position={'fixed'}>标题</IonLabel>
              {form.getFieldDecorator('name')(
                <IonInput required placeholder={'请输入名称'}/>
              )}
            </IonItem>
            <IonItem>
              <IonLabel position={'fixed'}>详细描述</IonLabel>
              {form.getFieldDecorator('description')(
                <IonTextarea
                  rows={3}
                  required
                  autoGrow
                  placeholder={'详细描述。'}
                />
              )}
            </IonItem>
            <IonItem>
              <IonLabel position={'fixed'}>图片</IonLabel>
              {form.getFieldDecorator('images')(
                <PickImage/>
              )}
            </IonItem>
          </IonList>

        </IonContent>

      </IonPage>
    )
  }
}

export default withIonLifeCycle(formWrapper(AddFeedback));
