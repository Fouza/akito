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
import ReactFC from "react-fusioncharts";

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
  const [percentage, setPercentage] = useState(0);
  const [alert, setAlert] = useState(false);
  const [message, setMessage] = useState("");
  const [data, setData] = useState([]);

  async function getNbExo() {
    let config = {
      headers: {
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
    await Axios.get(
      `http://943d9664f0a6.ngrok.io/api/service/user/${localStorage.getItem(
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
      `http://943d9664f0a6.ngrok.io/api/service/user/${localStorage.getItem(
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
      `http://943d9664f0a6.ngrok.io/api/service/user/${localStorage.getItem(
        "id"
      )}/getCaloriesConsumedOfFoodEatenToday`,
      config
    ).then((res) => {
      setCalCons(res.data);
      setPercentage((res.data * 100) / 2500);
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
      `http://943d9664f0a6.ngrok.io/api/service/user/${localStorage.getItem(
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
      `http://943d9664f0a6.ngrok.io/api/service/user/${localStorage.getItem(
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
      `http://943d9664f0a6.ngrok.io/api/service/user/${localStorage.getItem(
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
      `http://943d9664f0a6.ngrok.io/api/service/user/${localStorage.getItem(
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
      `http://943d9664f0a6.ngrok.io/api/service/user/${localStorage.getItem(
        "id"
      )}/getWeightDataForCurrentUser`,
      config
    ).then((res) => {
      console.log(res.data);
      if (res.data.length > 0) {
        setWeight(res.data[res.data.length - 1].poids);
        if (res.data[res.data.length - 1].poids == 0) {
          setMessage(
            "Vous avez mis 0 dans le dernier poids que vous avez enregistré, veuillez enregistrer de nouveau."
          );
          setAlert(true);
        }
      }
      if (res.data.length < 10) {
        let array = res.data;
        let donnee: any = [];
        array.map((element: any, index: any) => {
          donnee[index] = { label: element.date, value: element.poids };
        });
        setData(donnee);
      } else {
        let array = res.data.slice(res.data.length - 10);
        let donnee2: any = [];
        array.map((element: any, index: any) => {
          donnee2[index] = { label: element.date, value: element.poids };
        });
        setData(donnee2);
      }
    });
  }
  console.log(data);
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

  const dataSource = {
    chart: {
      caption: "Date d'enregistrement de poids",
      subCaption: "Poids enregistré",
      xAxisName: "Date",
      yAxisName: "Poids",
      numberSuffix: "K",
      theme: "fusion",
    },
    data: data,
  };

  const chartConfigs = {
    type: "column2d",
    width: 600,
    height: 400,
    dataFormat: "json",
    dataSource: dataSource,
  };

  if (localStorage.getItem("fitnessExist") == "true") {
    return (
      <IonContent>
        <IonAlert
          isOpen={alert}
          onDidDismiss={() => setAlert(false)}
          mode="ios"
          //ubHeader={"Inscription avec succès"}
          message={message}
          buttons={["OK"]}
        />
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
          <IonRow>
            <IonCol>
              <IonCard>
                <IonCardHeader>Evolution du poids</IonCardHeader>
                <IonCardContent>
                  <ReactFC {...chartConfigs} />
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>
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
