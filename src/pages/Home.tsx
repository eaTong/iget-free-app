import {
  IonContent,
  IonHeader,
  IonLoading,
  IonPage,
  IonTitle,
  IonToolbar
} from '@ionic/react';
import React, {Component} from 'react';
import {PagePropsInterface} from "../utils/PagePropsInterface";

class Home extends Component<PagePropsInterface, {}> {
  state = {
    loading: false,
    notes: [],
  };

  async componentDidMount() {
  }
  toggleLoading(loading: Boolean): void {
    this.setState({loading: loading})
  }

  render() {
    const {loading} = this.state;
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>得到-书香</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonLoading
            isOpen={loading}
            onDidDismiss={() => this.toggleLoading(false)}
            message={'自动登录中...'}
            duration={5000}
          />
        </IonContent>
      </IonPage>
    );
  }
}

export default Home;
