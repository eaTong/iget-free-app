import {
    IonContent,
    IonHeader,
    IonIcon,
    IonItem,
    IonLabel,
    IonList,
    IonMenu,
    IonMenuToggle,
    IonTitle,
    IonToolbar,
    IonFooter,
} from '@ionic/react';
import React, {Component} from 'react';
import {RouteComponentProps, withRouter} from 'react-router-dom';
import {settings} from "ionicons/icons";
import {inject, observer} from "mobx-react";

export interface AppPage {
    url: string;
    icon: object;
    title: string;
}

interface MenuProps extends RouteComponentProps {
    appPages: AppPage[];
}

@inject('app') @observer
class Menu extends Component<any, any> {
    render() {
        const {appPages} = this.props;
        return (
            <IonMenu contentId="main" type="overlay">
                <IonHeader>
                    <IonToolbar>
                        <IonTitle>菜单</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonContent>
                    <IonList>
                        {appPages.map((appPage: any, index: number) => {
                            return (
                                <IonMenuToggle key={index} autoHide={false}>
                                    <IonItem routerLink={appPage.url} routerDirection="none">
                                        <IonIcon slot="start" icon={appPage.icon}/>
                                        <IonLabel>{appPage.title}</IonLabel>
                                    </IonItem>
                                </IonMenuToggle>
                            );
                        })}
                        <IonMenuToggle autoHide={false}>
                            <IonItem routerLink={'/mine/home'} routerDirection="none">
                                <IonIcon slot="start" icon={settings}/>
                                <IonLabel>设置</IonLabel>
                            </IonItem>
                        </IonMenuToggle>
                    </IonList>
                </IonContent>
                <IonFooter class='menu-footer'>
                    <div className="welcome">欢迎您：</div>
                    <div className="user-name">{this.props.app.loginUser.name}</div>
                </IonFooter>
            </IonMenu>
        )
    }
}

export default withRouter(Menu);
