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
} from "@ionic/react";
import { IonRouterLink } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import {
  BrowserRouter as Router,
  Redirect,
  Switch,
  Route,
} from "react-router-dom";
import { IonAvatar, IonChip, IonLabel } from "@ionic/react";
import train from "../assets/train.svg";
import food from "../assets/food.svg";
import temoi1 from "../assets/images/temoignage1.png";
import slide1 from "../assets/images/slide1.png";
import slide2 from "../assets/images/slide2.png";
import slide3 from "../assets/images/slide3.png";
import statistics from "../assets/statistics.svg";
import Login from "./Login";
import "./Welcome.css";
import ContactNous from "./ContactNous";

const Welcome: React.FC = () => {
  const slideOpts = {
    initialSlide: 1,
    speed: 400,
  };
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
      <IonContent>
        <IonRow class="part1">
          <IonCol sizeMd="8" sizeXl="8" sizeXs="4"></IonCol>
          <IonCol
            sizeMd="4"
            sizeXl="4"
            sizeXs="8"
            class="ion-align-self-center"
          >
            <IonText class="h-text">
              Un mode de vie sain. En toute simplicité.
            </IonText>
            <br />
            <IonText class="b-text">
              L'application de bien-être qui vous aide à manger sainement pour
              atteindre vos objectifs santé et perte de poids.
            </IonText>
          </IonCol>
        </IonRow>
        <IonRow class="ion-justify-content-around about">
          <IonCol
            sizeXl="4"
            sizeMd="6"
            sizeXs="12"
            class="col-about ion-text-center"
          >
            <IonImg class="about-img" src={train}></IonImg>
            <IonText class="h-about-text ion-align-items-center">
              Entraînez-vous !
            </IonText>
            <br />
            <br />
            <IonText class="b-about-text ">
              Choisissez les entraînements en fonction de votre besoin et le
              nombre de calories que vous voulez brûler.
            </IonText>
          </IonCol>
          <IonCol
            sizeXl="4"
            sizeMd="6"
            sizeXs="12"
            class="col-about ion-text-center"
          >
            <IonImg class="about-img" src={food}></IonImg>
            <IonText class="h-about-text">Mangez bien !</IonText>
            <br />
            <br />
            <IonText class="b-about-text">
              Choisissez les repas en fonction de votre capacité et le nombre de
              calories que vous voulez récupérer.
            </IonText>
          </IonCol>
          <IonCol
            sizeXl="4"
            sizeMd="6"
            sizeXs="12"
            class="col-about ion-text-center"
          >
            <IonImg class="about-img" src={statistics}></IonImg>
            <IonText class="h-about-text">Progressez !</IonText>
            <br />
            <br />
            <IonText class="b-about-text">
              Suivez votre progression grâce à un ensemble de statistiques et
              rapports qui vous permetteront de vous situez par rapport aux
              efforts que vous fournissez.
            </IonText>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol class="witness-title">
            <IonText class="witness-text ion-align-items-center">
              Témoignages
            </IonText>
          </IonCol>
        </IonRow>
        <IonRow class="witness-row ion-justify-content-center  ion-align-items-center ">
          <IonCol sizeLg="4" class="witness-col">
            <IonCard class="witness">
              <IonImg src={slide3}></IonImg>
            </IonCard>
          </IonCol>
          <IonCol sizeLg="4" class="witness-col">
            <IonCard class="witness">
              <IonImg src={slide1}></IonImg>
            </IonCard>
          </IonCol>
          <IonCol sizeLg="4" class="witness-col">
            <IonCard class="witness">
              <IonImg src={slide2}></IonImg>
            </IonCard>
          </IonCol>
        </IonRow>
      </IonContent>
      <IonFooter class="ion-text-end ion-align-items-center footer">
        <IonText class="f-text">
          Developpée par <strong>Nahla VILLA</strong>{" "}
        </IonText>
      </IonFooter>
    </IonPage>
  );
};

export default Welcome;
