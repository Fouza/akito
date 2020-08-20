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
  IonSlides,
  IonSlide,
  IonImg,
  isPlatform,
  IonFab,
  IonFabButton,
  IonAlert,
} from "@ionic/react";
import "./stepper.css";
import axios from "axios";
import customize from "../assets/images/customize.png";
import depart from "../assets/images/depart.png";
import media from "../assets/images/media.png";
import { usePhotoGallery } from "../hooks/usePhotoGallery";
import { camera, trash, close } from "ionicons/icons";
import "@ionic/pwa-elements";
interface StepperProps {
  name: string;
}
const slideOpts = {
  initialSlide: 0,
  speed: 400,
};

const Stepper: React.FC<StepperProps> = ({ name }) => {
  const [nom, setNom] = useState<string>();
  const [prenom, setPrenom] = useState<string>();
  const [poid, setPoid] = useState<string>();
  const [photo, setPhoto] = useState<string>();
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [taille, setTaille] = useState<String>();
  const [sexe, setSexe] = useState<String>();
  const [alert, setAlert] = useState(false);
  const [msg, setMsg] = useState("");

  async function submitMoreInfo() {
    let config = {
      headers: {
        Accept: "application/json",
        "Access-Control-Allow-Headers":
          "Origin, X-Requested-With, Content-Type, Accept",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
    await axios
      .post(
        `http://ef0c96339a16.ngrok.io/api/service/user/${localStorage.getItem(
          "id"
        )}/addProfile`,
        {
          birthdate: selectedDate,
          currentWeight: poid,
          firstname: prenom,
          lastname: nom,
          gender: sexe,
          heightCm: taille,
          image: photos[0].webviewPath,
        },
        config
      )
      .then((res) => {
        localStorage.setItem("fitnessExist", "true");
        window.location.replace("/page/Accueil");
      })
      .catch((err) => console.log(err));
  }

  function handleSubmitMoreInfo() {
    console.log(photos);
    if (photos === undefined) {
      setMsg("Vous devez prendre une photo");
      setAlert(true);
    } else {
      submitMoreInfo();
    }
  }

  const takePhotoComponent = () => {
    // console.log(isPlatform("desktop"));
    if (isPlatform("desktop")) {
      return (
        <IonItem>
          <input
            className="item-input"
            type="file"
            onChange={(e) => setPhoto(e.target.value)}
          ></input>
        </IonItem>
      );
    } else {
      return (
        <IonItem>
          <IonButton>Choisir une photo</IonButton>
          <IonImg class="photoUser" src={photo}></IonImg>
        </IonItem>
      );
    }
  };
  const { photos, takePhoto } = usePhotoGallery();

  return (
    <IonContent className="stepper-content">
      <IonAlert
        isOpen={alert}
        onDidDismiss={() => setAlert(false)}
        header={"Alert"}
        //ubHeader={"Inscription avec succès"}
        message={msg}
        buttons={["OK"]}
      />
      <IonSlides pager={true} options={slideOpts}>
        <IonSlide>
          <IonRow>
            <IonCol sizeXs="12" sizeMd="12">
              <h3>Informations personnelles</h3>
              <IonImg src={customize}></IonImg>
              <IonList>
                <IonItem>
                  <IonLabel>Nom</IonLabel>
                  <IonInput
                    type="text"
                    onIonChange={(e) => setNom(e.detail.value!)}
                  ></IonInput>
                </IonItem>
                <IonItem>
                  <IonLabel>Prénom</IonLabel>
                  <IonInput
                    type="text"
                    onIonChange={(e) => setPrenom(e.detail.value!)}
                  ></IonInput>
                </IonItem>
                <IonItem>
                  <IonLabel>Sexe</IonLabel>
                  <IonSelect onIonChange={(e) => setSexe(e.detail.value)}>
                    <IonSelectOption value="Homme">Homme</IonSelectOption>
                    <IonSelectOption value="Femmme">Femme</IonSelectOption>
                  </IonSelect>
                </IonItem>
                <IonItem>
                  <IonLabel>Date de naissance</IonLabel>
                  <IonDatetime
                    displayFormat="YYYY:MM:DD"
                    value={selectedDate}
                    onIonChange={(e) => setSelectedDate(e.detail.value!)}
                  ></IonDatetime>
                </IonItem>
              </IonList>
            </IonCol>
          </IonRow>
        </IonSlide>
        <IonSlide>
          <IonRow>
            <IonCol sizeXs="12" sizeMd="12">
              <h3>Point de départ</h3>
              <IonImg src={depart}></IonImg>
              <IonList>
                <IonItem>
                  <IonLabel>Taille (Cm)</IonLabel>
                  <IonInput
                    type="number"
                    onIonChange={(e) => setTaille(e.detail.value!)}
                  ></IonInput>
                </IonItem>
                <IonItem>
                  <IonLabel>Poids (Kg)</IonLabel>
                  <IonInput
                    type="number"
                    onIonChange={(e) => setPoid(e.detail.value!)}
                  ></IonInput>
                </IonItem>
              </IonList>
            </IonCol>
          </IonRow>
        </IonSlide>
        <IonSlide>
          <IonRow>
            <IonCol>
              <IonImg src={media}></IonImg>
              <IonCard>
                <IonCardHeader>
                  {" "}
                  <IonContent className="fab-container">
                    <IonFab horizontal="center" slot="fixed">
                      <IonFabButton onClick={() => takePhoto()}>
                        <IonIcon icon={camera}></IonIcon>
                      </IonFabButton>
                    </IonFab>
                  </IonContent>
                  <br />
                  {photos.map((photo, index) => (
                    <IonImg src={photo.base64} className="img-picked" />
                  ))}
                </IonCardHeader>
                <IonCardContent>
                  <IonButton
                    expand="block"
                    fill="clear"
                    color="success"
                    onClick={(e) => handleSubmitMoreInfo()}
                  >
                    Valider
                  </IonButton>
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>
        </IonSlide>
      </IonSlides>
    </IonContent>
  );
};

export default Stepper;
