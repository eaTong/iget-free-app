/**
 * Created by eatong on 2020/2/14.
 */

import React, {Component} from "react";
import {
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonContent,
  IonBackButton,
  IonButtons, withIonLifeCycle
} from "@ionic/react";
import {PagePropsInterface} from "../utils/PagePropsInterface";
import ReactEcharts from "echarts-for-react";

interface TestPageState {

}

class TestPage extends Component<PagePropsInterface, TestPageState> {
  state = {};


  getOption() {
    return {
      tooltip: {},
      animationDurationUpdate: 1500,
      animationEasingUpdate: 'quinticInOut',
      series: [
        {
          type: 'graph',
          layout: 'circular',
          symbol: 'roundRect',
          roam: true,
          label: {
            show: true
          },
          edgeLabel: {
            fontSize: 20
          },
          categories: [{name: '联系人'}, {name: '标签'}, {name: '人脉女'}],
          nodes:
            [
              {value: 0, category: 0, name: '丁小明', symbolSize: 30, top: 0, left: 0},
              {value: 1, category: 2, name: '左太记',},
              {value: 2, category: 2, name: '何镖',},
              {value: 3, category: 2, name: '姜雨',},

            ],
          links: [
            {source: 0, target: 1, label: {show: true, formatter: () => '夫妻', fontSize: 10}},
            {source: 0, target: 2, label: {show: true, formatter: () => '大学同学', fontSize: 10}},
            {source: 0, target: 3, label: {show: true, formatter: () => '大学同学', fontSize: 10}},
          ],
          // links: [],
          lineStyle: {
            opacity: 0.9,
            width: 2,
            curveness: 0
          }
        }
      ]
    }
  }

  render() {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton/>
            </IonButtons>
            <IonTitle>我的</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <ReactEcharts
            style={{height: 500}}
            option={this.getOption()}
            notMerge={true}
            lazyUpdate={true}
            theme={"theme_name"}
          />
        </IonContent>

      </IonPage>
    )
  }
}

export default withIonLifeCycle(TestPage);
