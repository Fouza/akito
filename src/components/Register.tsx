import React, { useState } from "react";
import {
  IonCard,
  IonCardHeader,
  IonCardContent,
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonItem,
  IonItemDivider,
  IonInput,
  IonList,
  IonButton,
  IonRouterOutlet,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Route } from "react-router-dom";
import Login from "./Login";
import "./login-register.css";
const Register: React.FC = () => {
  const [email, setEmail] = useState<String>();
  const [pwd, setPwd] = useState<String>();
  const [pwdConf, setPwdConf] = useState<String>();
  //const [poids, setpoids] = useState(initialState)

  //const [connected, setConnected] = uCeState(false)
  return (
    <IonContent class="content">
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
              <IonCardContent>
                <IonList>
                  <IonItem>
                    <IonInput
                      type="email"
                      placeholder="E-mail"
                      onIonChange={(e) => setEmail(e.detail.value!)}
                    ></IonInput>
                  </IonItem>
                  <IonItem>
                    <IonInput
                      type="password"
                      placeholder="Mot de passe"
                      onIonChange={(e) => setPwd(e.detail.value!)}
                    ></IonInput>
                  </IonItem>
                  <IonItem>
                    <IonInput
                      type="password"
                      placeholder="Confirmez le mot de passe"
                      onIonChange={(e) => setPwdConf(e.detail.value!)}
                    ></IonInput>
                  </IonItem>
                  <IonRow>
                    <IonCol>
                      <IonButton
                        href="/login"
                        class="btn-connec"
                         
                        expand="block"
                        fill="clear"
                      >
                        Connexion
                      </IonButton>
                    </IonCol>
                    <IonCol>
                      <IonButton
                        href="/"
                        class="btn-connec"
                         
                        expand="block"
                        fill="clear"
                      >
                        Inscription
                      </IonButton>
                    </IonCol>
                  </IonRow>
                </IonList>
              </IonCardContent>
            </IonCard>
          </IonCol>
        </IonRow>
      </IonGrid>
      <Route path="/login" component={Login} exact></Route>
    </IonContent>
  );
};

export default Register;
