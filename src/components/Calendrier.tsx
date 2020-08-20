import React, { useState, useEffect } from "react";
import {
  IonGrid,
  IonRow,
  IonButton,
  IonContent,
  IonHeader,
  IonCol,
  IonIcon,
  IonList,
  IonItem,
  IonItemDivider,
  IonSelect,
  IonLabel,
  IonSelectOption,
  IonInput,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonDatetime,
  IonSegment,
  IonSegmentButton,
  IonText,
} from "@ionic/react";
import mobiscroll from "@mobiscroll/react";
import "@mobiscroll/react/dist/css/mobiscroll.min.css";
import axios from "axios";
import "./Calendrier.css";
import { closeOutline } from "ionicons/icons";

interface AccueilProps {
  name: string;
}

const Calendrier: React.FC<AccueilProps> = ({ name }) => {
  const [poids, setPoids] = useState<Number>(0);
  const [segment, setSegment] = useState("exercises");
  const [exos, setExos] = useState([
    {
      id: 0,
      exercise: {
        id: 0,
        name: "",
        image: "",
        duration: 0,
        caloriesBurned: 0,
        category: {
          id: 0,
          name: "",
          description: "",
          image: "",
          hibernateLazyInitializer: {},
        },
      },
      date: new Date(),
    },
  ]);
  const [food, setFood] = useState([
    {
      id: 0,
      food: {
        id: 0,
        name: "",
        image: null,
        calories: 0,
        category: {
          id: 0,
          name: "",
          description: "",
          image: "",
        },
        detailfood: {
          id: 0,
          name: "",
          calories: 0,
          eau: 0,
          proteins: 0,
          sucres: 0,
          fibres: 0,
          acidessatures: 0,
          cholesterol: 0,
          calcium: 0,
          potasium: 0,
          sodium: 0,
          vitamineB9: 0,
          vitamineB12: 0,
          vitamineB1: 0,
          vitamineE: 0,
          vitamineC: 0,
          vitamineB3: 0,
          vitamineB6: 0,
          vitamineD: 0,
        },
      },
      date: "YYYY-MM-DD",
    },
  ]);
  const [events, setEvents] = useState([]);
  const [date, setDate] = useState("");

  async function getExercisePerformed() {
    let config = {
      headers: {
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
    await axios
      .get(
        `http://ef0c96339a16.ngrok.io/api/service/user/${localStorage.getItem(
          "id"
        )}/getListExercisePerformed`,
        config
      )
      .then((res) => {
        // console.log(res.data);
        let events: any = [
          {
            start: "",
            end: "",
            text: "",
            color: "#f67944",
          },
        ];
        res.data.map((exo: any) => {
          let event = {
            start: "",
            end: "",
            text: "",
            color: "#f67944",
          };
          event.start = exo.date;
          event.end = exo.date;
          event.text = exo.exercise.name;
          events.push(event);
        });
        events = events.splice(1, events.length);
        setEvents(events);
      })
      .catch((err) => console.log(err));
  }
  const datetimeResponsive = {
    xsmall: {
      dateWheels: "|D M d|",
    },
    small: {
      dateWheels: "|D M d|",
      display: "bubble",
    },
    medium: {
      touchUi: false,
    },
  };

  const dateResponsive = {
    small: {
      display: "bubble",
    },
    medium: {
      headerText: false,
      touchUi: false,
    },
  };

  const timeResponsive = {
    small: {
      display: "bubble",
    },
    medium: {
      touchUi: false,
    },
  };
  mobiscroll.settings = {
    theme: "ios",
    themeVariant: "light",
  };

  async function getExercisePerformedToday() {
    let config = {
      headers: {
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
    await axios
      .get(
        `http://ef0c96339a16.ngrok.io/api/service/user/${localStorage.getItem(
          "id"
        )}/getListExercisePerformedToday `,
        config
      )
      .then((res) => {
        console.log(res.data);
        setExos(res.data);
      })
      .catch((err) => console.log(err));
  }

  async function getFoodEatenToday() {
    let config = {
      headers: {
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };

    await axios
      .get(
        `http://ef0c96339a16.ngrok.io/api/service/user/${localStorage.getItem(
          "id"
        )}/getListOfFoodEatenToday `,
        config
      )
      .then((res) => {
        console.log(res.data);
        setFood(res.data);
      })
      .catch((err) => console.log(err));
  }

  async function submitWeight() {
    let config = {
      headers: {
        //Accept: "application/json",
        // "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        //"Access-Control-Allow-Methods": "PUT, GET, POST, DELETE, OPTIONS",
        /*"Access-Control-Allow-Headers":
                "Origin, X-Requested-With, Content-Type, Accept",*/
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };

    await axios
      .post(
        `http://ef0c96339a16.ngrok.io/api/service/user/${localStorage.getItem(
          "id"
        )}/fitnessDetails/addOrUpdateWeight?newWeight=${poids}`,
        {},
        config
      )
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  }

  function handleSubmitWeight() {
    submitWeight();
  }

  async function deleteFoodEaten(id: any) {
    let config = {
      headers: {
        //Accept: "application/json",
        // "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        //"Access-Control-Allow-Methods": "PUT, GET, POST, DELETE, OPTIONS",
        /*"Access-Control-Allow-Headers":
                "Origin, X-Requested-With, Content-Type, Accept",*/
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
    await axios
      .delete(
        `http://ef0c96339a16.ngrok.io/api/service/user/${localStorage.getItem(
          "id"
        )}/removeSelectFoodFromCurrentUser/Food/${id}`,
        config
      )
      .then((res) => {
        const foodFiltered = food.filter((f) => {
          return f.food.id != id;
        });
        setFood(foodFiltered);
      })
      .catch((err) => console.log(err));
  }

  async function deleteExoPerformed(id: any) {
    let config = {
      headers: {
        //Accept: "application/json",
        // "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        //"Access-Control-Allow-Methods": "PUT, GET, POST, DELETE, OPTIONS",
        /*"Access-Control-Allow-Headers":
                "Origin, X-Requested-With, Content-Type, Accept",*/
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
    await axios
      .delete(
        `http://ef0c96339a16.ngrok.io/api/service/user/${localStorage.getItem(
          "id"
        )}/removeSelectExerciseFromCurrentUser/Exercise/${id}`,
        config
      )
      .then((res) => {
        const exoFiltered = exos.filter((exo) => {
          return exo.exercise.id != id;
        });
        setExos(exoFiltered);
      })
      .catch((err) => console.log(err));
  }

  function handleDeleteFoodEaten(e: any) {
    deleteFoodEaten(e.target.id);
  }

  function handleDeleteExoPerformed(e: any) {
    deleteExoPerformed(e.target.id);
  }

  useEffect(() => {
    getExercisePerformedToday();
    getExercisePerformed();
    getFoodEatenToday();
  }, []);

  const exerciseComponent = () => {
    const exo = exos.map((e) => {
      return (
        <IonItem>
          <IonLabel>
            <h2>{e.exercise.name}</h2>
            <h3>{e.exercise.duration + "(mn)"}</h3>
          </IonLabel>
          <IonButton
            shape="round"
            color="danger"
            id={JSON.stringify(e.exercise.id)}
            onClick={(e) => handleDeleteExoPerformed(e)}
          >
            <IonIcon icon={closeOutline} class="icon"></IonIcon>
          </IonButton>
        </IonItem>
      );
    });
    return exo;
  };
  const foodComponent = () => {
    const aliments = food.map((f) => {
      return (
        <IonItem>
          <IonLabel>
            <h2>{f.food.name}</h2>
            <h3>{f.food.calories + "(cal)"}</h3>
          </IonLabel>
          <IonButton
            shape="round"
            color="danger"
            id={JSON.stringify(f.food.id)}
            onClick={(e) => handleDeleteFoodEaten(e)}
          >
            <IonIcon icon={closeOutline} class="icon"></IonIcon>
          </IonButton>
        </IonItem>
      );
    });
    return aliments;
  };

  return (
    <IonContent>
      <IonGrid>
        <IonRow>
          <IonCol sizeLg="12" sizeMd="12" sizeSm="12" sizeXs="12">
            <IonCard>
              <IonCardHeader class="title-card">
                Enregistrer votre poids d'aujourdh'hui
              </IonCardHeader>
              <IonCardContent>
                <IonList>
                  <IonItem>
                    <IonInput
                      type="number"
                      placeholder="Entrez le poids (Kg)"
                      onIonChange={(e) =>
                        setPoids(parseInt(e.detail.value!, 10))
                      }
                    ></IonInput>
                  </IonItem>
                  <br />
                  <IonButton
                    className="btn-enreg"
                    expand="block"
                    fill="clear"
                    onClick={() => handleSubmitWeight()}
                  >
                    Enregistrez
                  </IonButton>
                </IonList>
              </IonCardContent>
            </IonCard>
            <IonCard>
              <IonCardHeader class="title-card">
                Liste d'aujourd'hui
              </IonCardHeader>
              <IonCardContent>
                <IonSegment onIonChange={(e) => setSegment(e.detail.value!)}>
                  <IonSegmentButton value="exercises">
                    <IonLabel>Exercises</IonLabel>
                  </IonSegmentButton>
                  <IonSegmentButton value="aliments">
                    <IonLabel>Aliments</IonLabel>
                  </IonSegmentButton>
                </IonSegment>
                <IonList>
                  {segment === "exercises"
                    ? exerciseComponent()
                    : foodComponent()}
                </IonList>
              </IonCardContent>
            </IonCard>
            <mobiscroll.Eventcalendar
              theme="ios"
              themeVariant="light"
              display="inline"
              view={{
                calendar: { type: "month" },
                eventList: { type: "month", scrollable: true },
              }}
              data={events}
            />
          </IonCol>
        </IonRow>
      </IonGrid>
    </IonContent>
  );
};

export default Calendrier;
