/**
 * Created by eatong on 2020/1/6.
 */

import React, {Component, FC} from 'react';
import ajax from "../../utils/ajax";
import {IonCardHeader, IonCardSubtitle, IonCardTitle, IonSkeletonText} from "@ionic/react";

interface HomeCardProps {
  ajaxConfig: {
    url: string,
    data?: object
  },
  dataResolve: Function,
  history: any,
  title: string,
  subtitle?: string,
  link: string,
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
    const {Component, history, title, link, subtitle} = this.props;
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
      <div onClick={() => history.push(link)}>
        <IonCardHeader>
          <IonCardTitle>{title}</IonCardTitle>
          {subtitle && (
            <IonCardSubtitle>{subtitle}</IonCardSubtitle>
          )}
        </IonCardHeader>
        <Component {...data} history={history}/>
      </div>
    );
  }
}

export default HomeCard;
