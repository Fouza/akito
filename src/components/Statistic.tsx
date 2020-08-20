import React, { useState, useEffect } from "react";
import {
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonProgressBar,
  IonCardTitle,
  IonText,
  IonSearchbar,
  IonDatetime,
  IonItem,
  IonLabel,
  IonAlert,
  IonIcon,
} from "@ionic/react";
import {
  barbell,
  timer,
  restaurant,
  pizza,
  flame,
  bonfire,
  recording,
  personCircle,
} from "ionicons/icons";
import "./ExploreContainer.css";
import mobiscroll from "@mobiscroll/react";
import "@mobiscroll/react/dist/css/mobiscroll.min.css";
import "./statistic.css";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import Axios from "axios";

interface StatisticProps {
  name: string;
}

mobiscroll.settings = {
  theme: "ios",
  themeVariant: "dark",
};

const Statistic: React.FC<StatisticProps> = ({ name }) => {
  const [val, setVal] = useState<Date>(new Date());
  const [nbExo, setNbExo] = useState(0);
  const [time, setTime] = useState(0);
  const [calBrul, setCalBrul] = useState(0);
  const [calCons, setCalCons] = useState(0);
  const [protein, setProtein] = useState(0);
  const [salt, setSalt] = useState(0);
  const [vit, setVit] = useState(0);
  const [weight, setWeight] = useState(0);

  async function getNbExo() {
    let config = {
      headers: {
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
    await Axios.get(
      `http://ef0c96339a16.ngrok.io/api/service/user/${localStorage.getItem(
        "id"
      )}/getNbreOfExercisePerformedToday`,
      config
    ).then((res) => {
      setNbExo(res.data);
    });
  }

  async function getTimeDone() {
    let config = {
      headers: {
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
    await Axios.get(
      `http://ef0c96339a16.ngrok.io/api/service/user/${localStorage.getItem(
        "id"
      )}/getTimeDoneExercisePerformedForCurrentUser`,
      config
    ).then((res) => {
      setTime(res.data);
    });
  }

  async function getCalCons() {
    let config = {
      headers: {
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
    await Axios.get(
      `http://ef0c96339a16.ngrok.io/api/service/user/${localStorage.getItem(
        "id"
      )}/getCaloriesConsumedOfFoodEatenToday`,
      config
    ).then((res) => {
      setCalCons(res.data);
    });
  }

  async function getCalBrul() {
    let config = {
      headers: {
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
    await Axios.get(
      `http://ef0c96339a16.ngrok.io/api/service/user/${localStorage.getItem(
        "id"
      )}/countCaloriesBurnedForCurrentUserToday`,
      config
    ).then((res) => {
      setCalBrul(res.data);
    });
  }
  ///api/service/user/{idU}/getProteinsConsumedOfFoodEatenToday
  async function getProtCons() {
    let config = {
      headers: {
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
    await Axios.get(
      `http://ef0c96339a16.ngrok.io/api/service/user/${localStorage.getItem(
        "id"
      )}/getProteinsConsumedOfFoodEatenToday`,
      config
    ).then((res) => {
      setProtein(res.data);
    });
  }
  ///api/service/user/{idU}/getSaltConsumedOfFoodEatenToday
  async function getSaltCons() {
    let config = {
      headers: {
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
    await Axios.get(
      `http://ef0c96339a16.ngrok.io/api/service/user/${localStorage.getItem(
        "id"
      )}/getSaltConsumedOfFoodEatenToday`,
      config
    ).then((res) => {
      setSalt(res.data);
    });
  }
  ///api/service/user/{idU}/getVitaminesConsumedOfFoodEatenToday
  async function getVitCons() {
    let config = {
      headers: {
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
    await Axios.get(
      `http://ef0c96339a16.ngrok.io/api/service/user/${localStorage.getItem(
        "id"
      )}/getVitaminesConsumedOfFoodEatenToday`,
      config
    ).then((res) => {
      setVit(res.data);
    });
  }
  ////api/service/user/{idU}/getWeightDataForCurrentUser
  async function getWeightData() {
    let config = {
      headers: {
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
    await Axios.get(
      `http://ef0c96339a16.ngrok.io/api/service/user/${localStorage.getItem(
        "id"
      )}/getWeightDataForCurrentUser`,
      config
    ).then((res) => {
      if (res.data.length > 0) {
        setWeight(res.data[res.data.length - 1].poids);
      }
    });
  }

  useEffect(() => {
    if (localStorage.getItem("fitnessExist") == "true") {
      getNbExo();
      getTimeDone();
      getCalCons();
      getCalBrul();
      getProtCons();
      getSaltCons();
      getVitCons();
      getWeightData();
    }
  }, []);
  // console.log(val.toLocaleDateString());
  const percentage = 33;
  if (localStorage.getItem("fitnessExist") == "true") {
    return (
      <IonContent>
        <IonGrid>
          <IonRow class="circle-row ion-justify-content-center ion-align-items-center">
            <IonCol sizeLg="4" sizeXs="12">
              <IonItem>
                <IonIcon src={pizza}></IonIcon>
                <IonText>Calories Consommées: {calCons.toFixed(2)}</IonText>
              </IonItem>
              <br />
              <IonItem>
                <IonIcon src={flame}></IonIcon>
                <IonText>Calories Brulées: {calBrul.toFixed(2)}</IonText>
              </IonItem>
              <br />
              <IonItem>
                <IonIcon src={recording}></IonIcon>
                <IonText>Proteins consommés: {protein.toFixed(2)}</IonText>
              </IonItem>
              <br />
              <IonItem>
                <IonIcon src={bonfire}></IonIcon>
                <IonText>Sels consommés: {salt.toFixed(2)}</IonText>
              </IonItem>
            </IonCol>
            <IonCol sizeLg="4" sizeXs="12">
              <IonCard>
                <IonCardHeader>Avancement vers l'objectif</IonCardHeader>
                <IonCardContent>
                  <CircularProgressbar
                    value={percentage}
                    text={`${percentage}%`}
                  />
                </IonCardContent>
              </IonCard>
            </IonCol>
            <IonCol sizeLg="4" sizeXs="12">
              <IonItem>
                <IonIcon src={barbell}></IonIcon>
                <IonText>Nb. d'exercises: {nbExo}</IonText>
              </IonItem>
              <br />
              <IonItem>
                <IonIcon src={timer}></IonIcon>
                <IonText>Temps exercés: {time}</IonText>
              </IonItem>
              <br />
              <IonItem>
                <IonIcon src={restaurant}></IonIcon>
                <IonText>Vitamines consommés: {vit.toFixed(2)}</IonText>
              </IonItem>
              <br />
              <IonItem>
                <IonIcon src={personCircle}></IonIcon>
                <IonText>Poids d'aujourd'hui: {weight.toFixed(2)}</IonText>
              </IonItem>
            </IonCol>
          </IonRow>
          {/* <IonRow>
            <IonCol>
              <IonItem>
                <IonLabel>Date début</IonLabel>
                <IonDatetime displayFormat="YYYY-MM-DD"></IonDatetime>
              </IonItem>
            </IonCol>
            <IonCol>
              <IonItem>
                <IonLabel>Date fin</IonLabel>
                <IonDatetime displayFormat="YYYY-MM-DD"></IonDatetime>
              </IonItem>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonCard>
                <IonCardHeader>
                  <IonText class="cardTitle">Objectif à 34%</IonText> <br />
                  Vous êtes un peu loin ! Allez courage !
                </IonCardHeader>
                <br />
                <IonCardContent>
                  <IonProgressBar color="danger" value={0.3}></IonProgressBar>
                  <br />
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>
          <IonRow> */}
          {/* <IonCol>
              <IonCard>
                <IonCardHeader>
                  <IonText class="cardTitle">Calories brûlés à 56%</IonText>{" "}
                  <br />
                  Vous êtes à moitié de route ! Faites plus d'exercices
                  régulièrement
                </IonCardHeader>
                <br />
                <IonCardContent>
                  <IonProgressBar value={0.5}></IonProgressBar>
                  <br />
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow> */}
        </IonGrid>
      </IonContent>
    );
  } else {
  }
  return (
    <IonAlert
      isOpen={true}
      header={"Information !"}
      mode="ios"
      cssClass="alert-fitness"
      message={
        'Ajouter plus d\'information sur vous dans la page "Profil" pour pouvoir bien profiter de notre produit'
      }
    ></IonAlert>
  );
};

export default Statistic;
