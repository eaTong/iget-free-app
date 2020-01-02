import React from "react";
import {
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonContent,
  IonBackButton,
  IonButtons, withIonLifeCycle, IonItem, IonLabel, IonTextarea, IonList, IonInput, IonButton
} from "@ionic/react";
import FormBase from "../../components/FormBase";
import ajax from "../../utils/ajax";

interface CreateTeamPageState {
  form: any
}

class CreateTeamPage extends FormBase {
  state = {
    form: {
      name: '',
      description:'',
      password:'',
    }
  };

  async onSaveTeam(){
    await ajax({url: '/api/team/add', data: this.state.form});
    this.props.history.goBack();
  }

  render() {
    const {form} = this.state;
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton/>
            </IonButtons>
            <IonTitle>创建团队</IonTitle>
            <IonButtons slot={'end'}>
              <IonButton onClick={()=>this.onSaveTeam()}>保存</IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonList>
            <IonItem>
              <IonLabel position={'floating'}>团队名称</IonLabel>
              <IonInput
                value={form.name || ''}
                required
                onIonChange={(val: any) => this.onChangeFormItem('name', val.target.value)}
              />
            </IonItem>
            <IonItem>
              <IonLabel position={'floating'}>加入密码</IonLabel>
              <IonInput
                value={form.password || ''}
                required
                onIonChange={(val: any) => this.onChangeFormItem('password', val.target.value)}
              />
            </IonItem>
            <IonItem>
              <IonLabel position={'floating'}>团队介绍</IonLabel>
              <IonTextarea
                value={form.description || ''}
                rows={2}
                autoGrow
                onIonChange={(val: any) => this.onChangeFormItem('description', val.target.value)}
              />
            </IonItem>
          </IonList>
        </IonContent>

      </IonPage>
    )
  }
}

export default withIonLifeCycle(CreateTeamPage);
