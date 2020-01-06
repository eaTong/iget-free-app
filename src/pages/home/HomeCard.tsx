/**
 * Created by eatong on 2020/1/6.
 */

import React, {Component, FC} from 'react';
import ajax from "../../utils/ajax";
import {IonCard,  IonSkeletonText, IonCardHeader, IonCardTitle} from "@ionic/react";

interface HomeCardProps {
  ajaxConfig: {
    url: string,
    data?: object
  },
  dataResolve: Function,
  history: any,
  title: string,
  Component: FC<any>
}

interface HomeCardInterface {
  loading: boolean,
  data: any
}

class HomeCard extends Component<HomeCardProps, HomeCardInterface> {
  state = {loading: true, data: {}};

  async componentDidMount() {
    const {ajaxConfig, dataResolve} = this.props;
    const result = await ajax(ajaxConfig);
    this.setState({data: dataResolve(result), loading: false})
  }

  render() {
    const {loading, data} = this.state;
    const {Component, history, title} = this.props;
    if (loading) {
      return (
        <div className="ion-padding custom-skeleton">
          <IonSkeletonText animated style={{width: '60%'}}/>
          <IonSkeletonText animated/>
          <IonSkeletonText animated style={{width: '88%'}}/>
          <IonSkeletonText animated style={{width: '70%'}}/>
          <IonSkeletonText animated style={{width: '60%'}}/>
        </div>
      )
    }
    return (
      <IonCard>
        <IonCardHeader>
          <IonCardTitle>{title}</IonCardTitle>
        </IonCardHeader>
        <Component {...data} history={history}/>
      </IonCard>
    );
  }
}

export default HomeCard;
