import React from "react";
import {
  IonCard,
  IonCardHeader,
  IonCardContent,
  IonFooter,
  IonHeader,
  IonContent,
  IonPage,
  IonGrid,
  IonRow,
  IonCol,
  IonItem,
  IonItemDivider,
  IonInput,
  IonList,
  IonButton,
  IonRouterOutlet,
  IonApp,
  IonImg,
  IonNav,
  IonText,
  IonIcon,
  IonTextarea,
} from "@ionic/react";
import { IonRouterLink } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import {
  BrowserRouter as Router,
  Redirect,
  Switch,
  Route,
} from "react-router-dom";
import "./ContactNous.css";

const ContactNous: React.FC = () => {
  return (
    <IonPage>
      <IonHeader class="nav">
        <IonGrid class="grid">
          <IonRow class="top-nav">
            <IonCol class="first a" sizeXl="1" sizeMd="2" sizeXs="4">
              <IonRouterLink href="/">
                <IonText class="nav-logo">OKITO</IonText>
              </IonRouterLink>
            </IonCol>
            <IonCol class="first ion-justify-content-center ion-align-items-left">
              {/* <IonRouterLink class="rest" href="/">
                Accueil
              </IonRouterLink> */}

              <IonRouterLink class="rest" href="/ContactNous">
                Contact
              </IonRouterLink>
            </IonCol>
            <IonCol class="rest ion-justify-content-center ion-align-items-center">
              <IonRouterLink class="rest" href="/login">
                Se connecter
              </IonRouterLink>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonHeader>
      <IonContent class="content">
        <IonContent class="content">
          {/* <IonAlert
            isOpen={alert}
            onDidDismiss={() => setAlert(false)}
            header={"Alert"}
            //ubHeader={"Inscription avec succès"}
            message={message}
            buttons={["OK"]}
          /> */}
          <IonGrid class="form">
            <IonRow class="ion-justify-content-center ion-align-items-center form">
              <IonCol
                sizeXs="10"
                sizeSm="10"
                sizeMd="6"
                sizeLg="6"
                class="login-col"
              >
                <IonCard>
                  <IonCardHeader>
                    <IonText class="textHeader ">
                      <strong>Contactez-nous pour toute clarifications</strong>
                    </IonText>
                  </IonCardHeader>
                  <IonCardContent>
                    <IonList>
                      <IonItem>
                        <IonInput
                          placeholder="Pseudo"
                          // formControlName="Pseudo"
                          required
                        ></IonInput>
                      </IonItem>
                      <IonItem>
                        <IonInput type="email" placeholder="Email"></IonInput>
                      </IonItem>
                      <IonItem>
                        <IonTextarea placeholder="Message"></IonTextarea>
                      </IonItem>
                      <IonRow class="ion-justify-content-center">
                        <IonCol sizeLg="12" sizeXs="12">
                          <IonButton
                            class="btn-connec"
                            expand="block"
                            fill="clear"
                          >
                            Envoyer
                          </IonButton>
                        </IonCol>
                      </IonRow>
                      <IonRow class="ion-justify-content-center">
                        <a href="#">Retour</a> <br />
                      </IonRow>
                    </IonList>
                  </IonCardContent>
                </IonCard>
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonContent>
      </IonContent>
    </IonPage>
  );
};

export default ContactNous;
