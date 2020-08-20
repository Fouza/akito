import React, { useState } from "react";
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
} from "@ionic/react";
import "./ExploreContainer.css";

interface AddFoodProps {
  name: string;
}

const AddFood: React.FC<AddFoodProps> = ({ name }) => {
  return <IonContent></IonContent>;
};

export default AddFood;
