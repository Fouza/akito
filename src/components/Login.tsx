import React, { useState } from "react";
import {
  IonCard,
  IonCardHeader,
  IonCardContent,
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
  IonAlert,
  IonLabel,
  isPlatform,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Route, Redirect } from "react-router-dom";
import Register from "./Register";

import { useForm, Controller } from "react-hook-form";
import "./login-register.css";
import axios from "axios";
import { register } from "../serviceWorker";
import { connect } from "http2";
import { createHashHistory } from "history";
import { withRouter } from "react-router-dom";

const Login: React.FC = () => {
  const [email, setEmail] = useState<String>();
  const [username, setUsername] = useState<String>();
  const [usernameReg, setUsernameReg] = useState<String>();
  const [pwd, setPwd] = useState<String>();
  const [pwdReg, setPwdReg] = useState<String>();
  const [change, setChange] = useState(false);
  const [alert, setAlert] = useState(false);
  const [message, setMessage] = useState("Inscription avec succès");

  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  //const history = createHashHistory();
  // validation forms
  let initialValues = {
    pseudo: "",
    email: "",
  };

  const { control, handleSubmit, formState, reset, errors } = useForm({
    defaultValues: { ...initialValues },
    mode: "onChange",
  });

  const showError = (_fieldName: string) => {
    let error = (errors as any)[_fieldName];
    return error ? (
      <div style={{ color: "red", fontWeight: "bold" }}>
        {error.message || "Field Is Required"}
      </div>
    ) : null;
  };

  function cnx() {
    setChange(false);
  }
  function inscr() {
    setChange(true);
  }

  async function hasProfile(id: BigInteger, token: String) {
    let config = {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
    await axios
      .get(
        `http://ef0c96339a16.ngrok.io/api/service/user/hasProfile/${id}`,
        config
      )
      .then((res) => {
        if (res.data) {
          localStorage.setItem("fitnessExist", "true");
          window.location.replace("/page/Accueil");
        } else {
          localStorage.setItem("fitnessExist", "false");
          if (!isPlatform("desktop")) {
            window.location.replace("/stepper");
          } else {
            window.location.replace("page/Profile");
          }
        }
        // window.location.replace("/stepper");
      })
      .catch((err) => console.log(err));
  }

  async function connectRequest() {
    await axios
      .post(
        "http://ef0c96339a16.ngrok.io/api/auth/signin",
        {
          username: username,
          password: pwd,
        },
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "*",
          },
        }
      )
      .then((res) => {
        if (res.data.id) {
          localStorage.setItem("token", res.data.accessToken);
          localStorage.setItem("roles", JSON.stringify(res.data.roles));
          localStorage.setItem("id", res.data.id);
          localStorage.setItem("connected", "true");
          localStorage.setItem("username", res.data.username);
          localStorage.setItem("email", res.data.email);
          hasProfile(res.data.id, res.data.accessToken);
        }
      })
      .catch((err) => {
        // console.log(err.response.data.message);
        // setMessage(err.response.data.message);
        // setAlert(true);
        if (err.response.status === 401) {
          setErrorMessage("Identifiant ou mot de passe erroné");
        } else if (err.response.status === 500) {
          setErrorMessage("Connexion impossible");
        }
        setIsError(true);
      });
  }

  async function registerRequest() {
    await axios
      .post(
        "http://ef0c96339a16.ngrok.io/api/auth/signup",
        {
          username: usernameReg,
          password: pwdReg,
          email: email,
          role: ["ROLE_USER"],
        },
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "Origin, Content-Type, Accept",
            "Content-type": "application/json",
          },
        }
      )
      .then((res) => {
        //setChange(false);
        setMessage("Inscription avec succès");
        setAlert(true);
        //window.location.reload();
      })
      .catch((err) => {
        // console.log(err.response.data);
        // //setMessage(err.response.data.errors[0].defaultMessage);
        // setAlert(true);
        if (err.response.status === 500) {
          setMessage("Veuillez remplir les champs correctement");
        } else {
          setMessage("Impossible de s'inscrire");
        }
        setAlert(true);
      });
  }

  function connect() {
    connectRequest();
  }

  function register() {
    registerRequest();
  }

  if (change) {
    return (
      <IonContent class="content">
        <IonAlert
          isOpen={alert}
          onDidDismiss={() => setAlert(false)}
          header={"Alert"}
          //ubHeader={"Inscription avec succès"}
          message={message}
          buttons={["OK"]}
        />
        <IonAlert
          isOpen={alert}
          onDidDismiss={() => setAlert(false)}
          header={"Alert"}
          //ubHeader={"Inscription avec succès"}
          message={message}
          buttons={["OK"]}
        />
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
                    <strong>Créer un nouveau compte</strong>
                  </IonText>
                </IonCardHeader>
                <IonCardContent>
                  <IonList>
                    <IonItem>
                      <IonLabel> Pseudo</IonLabel>
                      <IonInput
                        name="pseudo"
                        placeholder="Pseudo"
                        onIonChange={(e) => setUsernameReg(e.detail.value!)}
                      ></IonInput>
                      {/* <Controller
                              as={IonInput}
                              control={control}
                              onChangeName="onIonChange"
                              onChange={([selected]) => {
                                console.log("fullName", selected.detail.value);
                                return selected.detail.value;
                              }}
                              name="pseudo"
                              rules={{
                                required: true,
                                minLength: { value: 4, message: "Must be 4 chars long" }
                              }}
                            /> 
                      
                    </IonItem> */}
                      {/* <IonItem>
                      <Controller
                        as={<IonInput />}
                        name="pseudo"
                        control={control}
                        rules={{ required: true ,  minLength: { value: 4, message: "Must be 4 chars long" }}}
                        onChangeName="onIonChange"
                        onChange={([e]: any) => {
                          return e.detail.value;
                        }}
                      />*/}
                    </IonItem>
                    <IonItem>
                      <IonInput
                        type="email"
                        name="email"
                        placeholder="E-mail"
                        onIonChange={(e) => setEmail(e.detail.value!)}
                      ></IonInput>
                    </IonItem>
                    <IonItem>
                      <IonInput
                        type="password"
                        placeholder="Mot de passe"
                        onIonChange={(e) => setPwdReg(e.detail.value!)}
                      ></IonInput>
                    </IonItem>
                    <br />
                    <IonRow class="ion-justify-content-center">
                      <IonButton
                        class="btn-inscrip"
                        expand="block"
                        color="success"
                        onClick={() => register()}
                      >
                        Inscrivez-vous
                      </IonButton>
                    </IonRow>
                    {/* <IonRow>
                      <IonCol>
                        <IonButton
                          class="btn-connec"
                           
                          expand="block"
                          fill="clear"
                          onClick={() => connect()}
                        >
                          Connexion
                        </IonButton>
                      </IonCol>
                      <IonCol>
                        <IonButton
                          class="btn-connec"
                          
                          expand="block"
                          fill="clear"
                          onClick={() => inscr()}
                        >
                          Inscription
                        </IonButton>
                      </IonCol>
                    </IonRow> */}
                    <br></br>
                    <IonRow class="ion-justify-content-center">
                      <a href="/login">Vous avez déja un compte ?</a>
                    </IonRow>
                  </IonList>
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    );
  } else {
    return (
      <IonContent class="content">
        <IonAlert
          isOpen={isError}
          onDidDismiss={() => setIsError(false)}
          message={errorMessage}
        ></IonAlert>
        <IonAlert
          isOpen={alert}
          onDidDismiss={() => setAlert(false)}
          header={"Alert"}
          //ubHeader={"Inscription avec succès"}
          message={message}
          buttons={["OK"]}
        />
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
                    <strong>
                      Connectez-vous pour un mode de vie sain. En toute
                      simplicité.
                    </strong>
                  </IonText>
                </IonCardHeader>
                <IonCardContent>
                  <IonList>
                    <IonItem>
                      <IonInput
                        placeholder="pseudo"
                        // formControlName="Pseudo"
                        required
                        onIonChange={(e) => setUsername(e.detail.value!)}
                      ></IonInput>
                    </IonItem>
                    <IonItem>
                      <IonInput
                        type="password"
                        placeholder="Mot de passe"
                        onIonChange={(e) => setPwd(e.detail.value!)}
                      ></IonInput>
                    </IonItem>

                    <IonRow class="ion-justify-content-center">
                      <IonCol class="text-center" sizeMd="12" sizeXs="12">
                        <IonButton
                          class="btn-connec"
                          expand="block"
                          color="success"
                          onClick={() => connect()}
                        >
                          Connectez-vous
                        </IonButton>
                      </IonCol>

                      <IonCol class="text-center" sizeMd="12" sizeXs="12">
                        <IonButton
                          class="btn-inscrip"
                          expand="block"
                          color="primary"
                          fill="clear"
                          onClick={() => inscr()}
                        >
                          Inscription
                        </IonButton>
                      </IonCol>
                    </IonRow>

                    <IonRow class="ion-justify-content-center">
                      {" "}
                      <br />
                      <a href="#">Mot de passe oublié ?</a> <br />
                    </IonRow>
                    <IonRow class="ion-justify-content-center">
                      <a href="#">Contactez-nous ?</a> <br />
                    </IonRow>
                  </IonList>
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    );
  }
};

export default Login;
