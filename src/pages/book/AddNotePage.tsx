import React, {Component} from "react";
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonTextarea,
  IonTitle,
  IonToolbar
} from "@ionic/react";
import {FormPageProps} from "../../utils/PagePropsInterface";
import ajax from "../../utils/ajax";
import {parse} from "querystring";
import PickImage from "../../components/PickImage";
import formWrapper from "../../utils/formWrapper";
import BackButton from "../../components/BackButton";


class AddNotePage extends Component<FormPageProps, {}> {

  async saveNote() {
    const {location} = this.props;
    const query = parse(location.search.replace('?', ""));
    await ajax({url: '/api/bookNote/add', data: {...this.props.form.getFieldsValue(), bookId: query.id}});
    this.props.history.goBack();
  }

  render() {
    const {form} = this.props;
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <BackButton history={this.props.history}/>
            </IonButtons>
            <IonTitle>添加笔记</IonTitle>
            <IonButtons slot="end">
              <IonButton color={'primary'} onClick={() => this.saveNote()}>保存</IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonList>
            <IonItem>
              <IonLabel position={'fixed'}>笔记</IonLabel>
              {form.getFieldDecorator('content', {trigger: 'onIonChange'})(
                <IonTextarea
                  rows={2}
                  autoGrow
                  required
                  placeholder={'记录您的读书灵感吧。'}
                />
              )}
            </IonItem>
            <IonItem>
              <IonLabel position={'fixed'}>内容引用</IonLabel>

              {form.getFieldDecorator('reference', {trigger: 'onIonChange'})(
                <IonTextarea
                  rows={2}
                  required
                  autoGrow
                  placeholder={'书籍金句引用。'}
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

export default formWrapper(AddNotePage);
