import React, { useState, useEffect, useRef } from "react";
import {
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonVirtualScroll,
  IonImg,
  IonSearchbar,
  IonButton,
  IonText,
  IonIcon,
  IonItem,
  IonModal,
  IonList,
  IonInput,
  IonRange,
  IonLabel,
  IonSelect,
  IonSelectOption,
} from "@ionic/react";

import meme from "../assets/meme.jpg";
import unknown from "../assets/unknown.jpg";
import axios from "axios";
import { search } from "ionicons/icons";
import { addOutline } from "ionicons/icons";
import "./Accueil.css";
//
import { withStyles, makeStyles, useTheme } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableFooter from "@material-ui/core/TableFooter";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import TableHead from "@material-ui/core/TableHead";
import FirstPageIcon from "@material-ui/icons/FirstPage";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import LastPageIcon from "@material-ui/icons/LastPage";
import PropTypes from "prop-types";

const useStyles1 = makeStyles((theme) => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },
}));

function TablePaginationActions(props: any) {
  const classes = useStyles1();
  const theme = useTheme();
  const { count, page, rowsPerPage, onChangePage } = props;

  const handleFirstPageButtonClick = (event: any) => {
    onChangePage(event, 0);
  };

  const handleBackButtonClick = (event: any) => {
    onChangePage(event, page - 1);
  };

  const handleNextButtonClick = (event: any) => {
    onChangePage(event, page + 1);
  };

  const handleLastPageButtonClick = (event: any) => {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};
const useStyles2 = makeStyles({
  table: {
    minWidth: 500,
  },
});

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

interface AccueilProps {
  name: string;
}

//
// const useStyles = makeStyles({
//   table: {
//     minWidth: 350,
//   },
//   container: {
//     width: 600,
//     // margin: 50,
//     marginRight: 0,
//     marginLeft: 0,
//   },
// });

const Accueil: React.FC<AccueilProps> = ({ name }) => {
  //const isInitialMount = useRef(true);
  //Exercises
  const [cats, setCats] = useState([
    {
      id: "",
      name: "",
      description: "",
      image: "",
    },
  ]);
  const [catsFood, setCatsFood] = useState([
    {
      id: "",
      name: "",
      description: "",
    },
  ]);
  const [exoCat, setExoCat] = useState<string>("");
  const [exoKey, setExoKey] = useState<string>("");
  const [exoCalFrom, setExoCalFrom] = useState("");
  const [exoCalTo, setExoCalTo] = useState("");
  const [show, setShow] = useState(false);
  const [showFood, setShowFood] = useState(false);
  const [duree, setDuree] = useState(0);
  const [caloriesBurned, setCaloriesBurned] = useState(0);
  const [id, setId] = useState(localStorage.getItem("id"));
  const [notes, setNotes] = useState("");
  const [addedExo, setAddedExo] = useState({
    id: 0,
    name: "",
    image: { unknown },
    duration: 0,
    caloriesBurned: 0.0,
    category: {
      id: 0,
      name: "",
      description: "",
      image: { meme },
      hibernateLazyInitializer: {},
    },
  });
  const [addedFood, setAddedFood] = useState({
    id: 0,
    name: "",
    image: "",
    calories: 0,
    category: {
      id: 0,
      name: "",
      description: "",
      image: "",
    },
    detailfood: {
      idnutritiondetails: 0,
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
      vitamineC: 0,
      vitamineB6: 0,
      vitamineB3: 0,
      vitamineB1: 0,
      vitamineB12: 0,
      vitamineD: 0,
      vitamineE: 0,
    },
  });
  const [isNone, setIsNone] = useState(false);
  const [exoCatResult, setExoCatResult] = useState<any>([
    {
      id: 0,
      name: "",
      image: { unknown },
      duration: 0,
      caloriesBurned: 0.0,
      category: {
        id: 0,
        name: "",
        description: "",
        image: { meme },
        hibernateLazyInitializer: {},
      },
    },
  ]);
  const [exoKeyResult, setExoKeyResult] = useState<any>([
    {
      id: 0,
      name: "",
      image: { unknown },
      duration: 0,
      caloriesBurned: 0.0,
      category: {
        id: 0,
        name: "",
        description: "",
        image: { meme },
        hibernateLazyInitializer: {},
      },
    },
  ]);
  const [exoCalResult, setExoCalResult] = useState<any>([
    {
      id: 0,
      name: "",
      image: { unknown },
      duration: 0,
      caloriesBurned: 0.0,
      category: {
        id: 0,
        name: "",
        description: "",
        image: { meme },
        hibernateLazyInitializer: {},
      },
    },
  ]);

  const [exercices, setExercices] = useState<any>([]);
  //Food
  const [foodCat, setFoodCat] = useState<string>("");
  const [foodKey, setFoodKey] = useState<string>("");
  const [foodCalFrom, setFoodCalFrom] = useState("");
  const [foodCalTo, setFoodCalTo] = useState("");
  const [isNoneFood, setIsNoneFood] = useState(false);

  const [foodCatResult, setFoodCatResult] = useState<any>([
    {
      id: 0,
      name: "",
      image: "",
      calories: 0,
      category: {
        id: 0,
        name: "",
        description: "",
        image: "",
      },
      detailfood: {
        idnutritiondetails: 0,
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
        vitamineC: 0,
        vitamineB6: 0,
        vitamineB3: 0,
        vitamineB12: 0,
        vitamineD: 0,
        vitamineE: 0,
      },
    },
  ]);
  const [foodKeyResult, setFoodKeyResult] = useState<any>([
    {
      id: 0,
      name: "",
      image: "",
      calories: 0,
      category: {
        id: 0,
        name: "",
        description: "",
        image: "",
      },
      detailfood: {
        idnutritiondetails: 0,
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
        vitamineC: 0,
        vitamineB6: 0,
        vitamineB3: 0,
        vitamineB12: 0,
        vitamineD: 0,
        vitamineE: 0,
      },
    },
  ]);
  const [foodCalResult, setFoodCalResult] = useState<any>([
    {
      id: 0,
      name: "",
      image: "",
      calories: 0,
      category: {
        id: 0,
        name: "",
        description: "",
        image: "",
      },
      detailfood: {
        idnutritiondetails: 0,
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
        vitamineC: 0,
        vitamineB6: 0,
        vitamineB3: 0,
        vitamineB12: 0,
        vitamineD: 0,
        vitamineE: 0,
      },
    },
  ]);

  const [food, setFood] = useState<any>([]);

  const classes = useStyles2();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event: any, newPage: any) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  async function getCategories() {
    let config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
    await axios
      .get(
        "http://ef0c96339a16.ngrok.io/api/service/categorieExercise/listCategoriesExercises",
        {
          headers: {
            Accept: "application/json",
            "Access-Control-Allow-Headers":
              "Origin, X-Requested-With, Content-Type, Accept",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        setCats(res.data);
      })
      .catch((err) => console.log(err));
    await axios
      .get(
        "http://ef0c96339a16.ngrok.io/api/service/categoriesFood/listCategoriesFood",
        {
          headers: {
            Accept: "application/json",
            "Access-Control-Allow-Headers":
              "Origin, X-Requested-With, Content-Type, Accept",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        let catsArray: any = [];
        res.data.map((f: any) => {
          catsArray.push({
            id: f.id,
            name: f.name,
            decription: f.description,
          });
        });
        setCatsFood(catsArray);
      })
      .catch((err) => console.log(err));
  }

  async function getListeExercices() {
    let config = {
      //method: "POST", // *GET, POST, PUT, DELETE, etc.
      //mode: "no-cors", // no-cors, *cors, same-origin
      headers: {
        //"Access-Control-Allow-Origin": "*",
        //Accept: "application/json",
        //"Access-Control-Allow-Headers": "Origin, Content-Type, Accept",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
    await axios
      .get("http://ef0c96339a16.ngrok.io/api/service/exercise/listeExercises", {
        headers: {
          Accept: "application/json",
          "Access-Control-Allow-Headers":
            "Origin, X-Requested-With, Content-Type, Accept",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setExercices(res.data);
      })
      .catch((err) => console.log(err));
  }

  async function searchExoCat() {
    await axios
      .get(
        `http://ef0c96339a16.ngrok.io/api/service/exercise/listeExercisesByCategory?category=${exoCat}`,
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        if (res.data.length > 0) {
          //let x = isNone;
          setIsNone(false);
          setExoCatResult(res.data);
        } else {
          //let x = isNone;
          setIsNone(true);
          setExoCatResult([
            {
              id: 0,
              name: "",
              image: { unknown },
              duration: 0,
              caloriesBurned: 0.0,
              category: {
                id: 0,
                name: "",
                description: "",
                image: { meme },
                hibernateLazyInitializer: {},
              },
            },
          ]);
        }
      })
      .catch((err) => console.log(err));
  }

  async function searchExoKey() {
    await axios
      .get(
        `http://ef0c96339a16.ngrok.io/api/service/exercise/listeExercisesByKeyWord?keyword=${exoKey}`,
        {
          headers: {
            //Accept: "application/json",
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            //"Access-Control-Allow-Methods": "PUT, GET, POST, DELETE, OPTIONS",
            /*"Access-Control-Allow-Headers":
                "Origin, X-Requested-With, Content-Type, Accept",*/
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        if (res.data.length > 0) {
          //let x = isNone;
          setIsNone(false);
          setExoKeyResult(res.data);
        } else {
          //let x = isNone;
          setIsNone(true);
          setExoKeyResult([
            {
              id: 0,
              name: "",
              image: { unknown },
              duration: 0,
              caloriesBurned: 0.0,
              category: {
                id: 0,
                name: "",
                description: "",
                image: { meme },
                hibernateLazyInitializer: {},
              },
            },
          ]);
        }
      })
      .catch((err) => console.log(err));
  }

  async function searchExoCal() {
    await axios
      .get(
        `http://ef0c96339a16.ngrok.io/api/service/exercise/listeExercisesByCalories?from=${exoCalFrom}&to=${exoCalTo}`,
        {
          headers: {
            //Accept: "application/json",
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            //"Access-Control-Allow-Methods": "PUT, GET, POST, DELETE, OPTIONS",
            /*"Access-Control-Allow-Headers":
                "Origin, X-Requested-With, Content-Type, Accept",*/
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        if (res.data.length > 0) {
          //let x = isNone;
          setIsNone(false);
          setExoCalResult(res.data);
        } else {
          //let x = isNone;
          setIsNone(true);
          setExoCalResult([
            {
              id: 0,
              name: "",
              image: { unknown },
              duration: 0,
              caloriesBurned: 0.0,
              category: {
                id: 0,
                name: "",
                description: "",
                image: { meme },
                hibernateLazyInitializer: {},
              },
            },
          ]);
        }
      })
      .catch((err) => console.log(err));
  }

  function handleSearchExo() {
    if (exoCat.length > 0) {
      searchExoCat();
    }
    if (exoKey.length > 0) {
      searchExoKey();
    }
    if (exoCalFrom.length > 0 && exoCalTo.length > 0) {
      searchExoCal();
    }
  }

  function handleSearchFood() {
    if (foodCat.length > 0) {
      searchFoodCat();
    }
    if (foodKey.length > 0) {
      searchFoodKey();
    }
    if (foodCalFrom.length > 0 && foodCalTo.length > 0) {
      searchFoodCal();
    }
  }

  function handleViderExercise() {
    setExoCat("");
    setExoCalFrom("");
    setExoCalTo("");
    setExoKey("");
  }

  function handleViderFood() {
    setFoodCat("");
    setFoodCalFrom("");
    setFoodCalTo("");
    setFoodKey("");
  }

  async function getListeFood() {
    await axios
      .get("http://ef0c96339a16.ngrok.io/api/service/food/listeFood", {
        headers: {
          Accept: "application/json",
          "Access-Control-Allow-Headers":
            "Origin, X-Requested-With, Content-Type, Accept",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        // let foodArray: any = [];
        // res.data.map((f: any) => {
        //   foodArray.push({
        //     id: f.id,
        //     name: f.name,
        //     calories: f.calories,
        //   });
        // });
        setFood(res.data);
      })
      .catch((err) => console.log(err));
  }

  async function searchFoodCat() {
    await axios
      .get(
        `http://ef0c96339a16.ngrok.io/api/service/food/listeFoodByCategory?category=${foodCat}`,
        {
          headers: {
            //Accept: "application/json",
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            //"Access-Control-Allow-Methods": "PUT, GET, POST, DELETE, OPTIONS",
            /*"Access-Control-Allow-Headers":
                "Origin, X-Requested-With, Content-Type, Accept",*/
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        if (res.data.length > 0) {
          //let x = isNone;
          setIsNoneFood(false);
          setFoodCatResult(res.data);
        } else {
          //let x = isNone;
          setIsNoneFood(true);
          setFoodCatResult([
            {
              id: 0,
              name: "",
              calories: 0,
            },
          ]);
        }
      })
      .catch((err) => console.log(err));
  }

  async function searchFoodKey() {
    await axios
      .get(
        `http://ef0c96339a16.ngrok.io/api/service/food/listeFoodByKeyWord?keyword=${foodKey}`,
        {
          headers: {
            //Accept: "application/json",
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            //"Access-Control-Allow-Methods": "PUT, GET, POST, DELETE, OPTIONS",
            /*"Access-Control-Allow-Headers":
                "Origin, X-Requested-With, Content-Type, Accept",*/
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        if (res.data.length > 0) {
          //let x = isNone;
          setIsNoneFood(false);
          setFoodKeyResult(res.data);
        } else {
          //let x = isNone;
          setIsNoneFood(true);
          setFoodKeyResult([
            {
              id: 0,
              name: "",
              calories: 0,
            },
          ]);
        }
      })
      .catch((err) => console.log(err));
  }

  async function searchFoodCal() {
    await axios
      .get(
        `http://ef0c96339a16.ngrok.io/api/service/food/listeFoodCaloriesBetween?from=${parseFloat(
          foodCalFrom
        )}&to=${parseFloat(foodCalTo)}`,
        {
          headers: {
            //Accept: "application/json",
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            //"Access-Control-Allow-Methods": "PUT, GET, POST, DELETE, OPTIONS",
            /*"Access-Control-Allow-Headers":
                "Origin, X-Requested-With, Content-Type, Accept",*/
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        if (res.data.length > 0) {
          //let x = isNone;

          setIsNoneFood(false);
          setFoodCalResult(res.data);
        } else {
          //let x = isNone;
          setIsNoneFood(true);
          setFoodCalResult([
            {
              id: 0,
              name: "",
              calories: 0,
            },
          ]);
        }
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    getListeExercices();
    getListeFood();
    getCategories();
  }, []);

  function handleOpenModal(e: any, exoParam: any) {
    setShow(true);
    setAddedExo(exoParam);
    // console.log(exoParam);
  }
  function handleOpenModalFood(e: any, exoParam: any) {
    setShowFood(true);
    setAddedFood(exoParam);
    // console.log(exoParam);
  }
  async function ajouterExo() {
    let config = {
      headers: {
        //Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        //"Access-Control-Allow-Methods": "PUT, GET, POST, DELETE, OPTIONS",
        /*"Access-Control-Allow-Headers":
                "Origin, X-Requested-With, Content-Type, Accept",*/
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
    await axios
      .post(
        `http://ef0c96339a16.ngrok.io/api/service/user/${id}/fitnessDetails/addExercise/${addedExo.id}`,
        {
          // idE: addedExo.id,
          // caloriesBurned: caloriesBurned,
          // time: duree,
          // notes: notes,
        },
        config
      )
      .then((res) => {
        setShow(false);
      })
      .catch((err) => console.log(err));
  }

  async function ajouterFood() {
    let config = {
      headers: {
        //Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        //"Access-Control-Allow-Methods": "PUT, GET, POST, DELETE, OPTIONS",
        /*"Access-Control-Allow-Headers":
                "Origin, X-Requested-With, Content-Type, Accept",*/
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
    // console.log(addedExo.id);
    await axios
      .post(
        `http://ef0c96339a16.ngrok.io/api/service/user/${id}/fitnessDetails/addFood/${addedFood.id}`,
        {},
        config
      )
      .then((res) => {
        setShowFood(false);
      })
      .catch((err) => console.log(err));
  }

  function handleAjouterExo() {
    ajouterExo();
  }

  function handleAjouterFood() {
    ajouterFood();
  }

  // const exerciceComponent = () => {
  //   if (
  //     isNone === true &&
  //     (exoCatResult[0].id === 0 ||
  //       exoKeyResult[0].id === 0 ||
  //       exoCalResult[0].id === 0)
  //   ) {
  //     return <IonText>Aucun résultat</IonText>;
  //   }
  //   let exos = exercices;
  //   if ((exoCatResult.length > 1 || exoCatResult[0].id != 0) && exoCat != "") {
  //     exos = exoCatResult;
  //   }
  //   //console.log(exoKeyResult[0].id);
  //   //console.log(exoKeyResult.length);
  //   if ((exoKeyResult.length > 1 || exoKeyResult[0].id != 0) && exoKey != "") {
  //     //exos = exos.filter((x: any) => exoKeyResult.includes(x));
  //     exos = exos.filter((x: any) => {
  //       //console.log(x.id);
  //       let arr = exoKeyResult.filter((k: any) => k.id === x.id);
  //       //console.log(arr);
  //       return !(arr.length === 0);
  //     });
  //   }
  //   //console.log(exoCalResult);
  //   if (
  //     (exoCalResult.length > 1 || exoCalResult[0].id != 0) &&
  //     exoCalFrom != "" &&
  //     exoCalTo != ""
  //   ) {
  //     exos = exos.filter((x: any) => {
  //       let arr = exoCalResult.filter((k: any) => k.id === x.id);
  //       return !(arr.length === 0);
  //     });
  //   }
  //   return exos.map((exo: any) => {
  //     return (
  //       <IonCard key={exo.id} class="aliment">
  //         <IonImg src={unknown}></IonImg>
  //         <IonCardHeader class="header-ne">{exo.name}</IonCardHeader>
  //         <IonCardContent class="detail-ne">
  //           Durée : {exo.duration} <br />
  //           Calories Brulées : {exo.caloriesBurned} <br />
  //           {/* Catégorie : {exo.category.name} <br /> */}
  // <IonButton
  //   class="modalBtn"
  //   size="small"
  //   color="success"
  //   id={exo.id}
  //   onClick={(e) => handleOpenModal(e, exo)}
  // >
  //   <IonIcon icon={addOutline} class="icon"></IonIcon>
  // </IonButton>
  //         </IonCardContent>
  //       </IonCard>
  //     );
  //   });

  //   // var displayExercises = exos.filter( function(e1){
  //   //   var searchValue = e1.name.toLowerCase()
  //   // });
  // };
  // handelSearch : function(event){
  //   var searchQuery = event.target.value.toLowerCase();
  //   //var displayExercises = exos.
  // }

  const exoComponent = () => {
    if (
      isNone === true &&
      (exoCatResult[0].id === 0 ||
        exoKeyResult[0].id === 0 ||
        exoCalResult[0].id === 0)
    ) {
      return <IonText>Aucun résultat</IonText>;
    }
    let exos = exercices;
    if ((exoCatResult.length > 1 || exoCatResult[0].id != 0) && exoCat != "") {
      exos = exoCatResult;
    }
    //console.log(exoKeyResult[0].id);
    //console.log(exoKeyResult.length);
    if ((exoKeyResult.length > 1 || exoKeyResult[0].id != 0) && exoKey != "") {
      //exos = exos.filter((x: any) => exoKeyResult.includes(x));
      exos = exos.filter((x: any) => {
        //console.log(x.id);
        let arr = exoKeyResult.filter((k: any) => k.id === x.id);
        //console.log(arr);
        return !(arr.length === 0);
      });
    }
    //console.log(exoCalResult);
    if (
      (exoCalResult.length > 1 || exoCalResult[0].id != 0) &&
      exoCalFrom != "" &&
      exoCalTo != ""
    ) {
      exos = exos.filter((x: any) => {
        let arr = exoCalResult.filter((k: any) => k.id === x.id);
        return !(arr.length === 0);
      });
    }
    const emptyRows =
      rowsPerPage - Math.min(rowsPerPage, exos.length - page * rowsPerPage);
    return (
      <TableBody>
        {emptyRows > 0 && (
          <TableRow style={{ height: 53 * emptyRows }}>
            <TableCell colSpan={6} />
          </TableRow>
        )}
        {(rowsPerPage > 0
          ? exos.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
          : exos
        ).map((row: any) => (
          <TableRow key={row.name}>
            <TableCell component="th" scope="row">
              {row.name}
            </TableCell>
            <TableCell style={{ width: 160 }} align="right">
              {row.caloriesBurned}
            </TableCell>
            <TableCell style={{ width: 160 }} align="right">
              {row.duration}
            </TableCell>
            <TableCell style={{ width: 160 }} align="right">
              {row.category.name}
            </TableCell>
            <TableCell style={{ width: 160 }} align="right">
              <IonButton
                class="modalBtn"
                size="small"
                color="success"
                id={row.id}
                onClick={(e) => handleOpenModal(e, row)}
              >
                <IonIcon icon={addOutline} class="icon"></IonIcon>
              </IonButton>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>

      // <TableRow key={row.id}>
      //   <TableCell component="th" scope="row">
      //     {row.name}
      //   </TableCell>
      //   <TableCell align="right">{row.caloriesBurned}</TableCell>
      //   <TableCell align="right">{row.duration}</TableCell>
      //   <TableCell align="right">{row.category.name}</TableCell>
      //   <TableCell align="right">
      //     <IonButton
      //       class="modalBtn"
      //       size="small"
      //       color="success"
      //       id={row.id}
      //       onClick={(e) => handleOpenModal(e, row)}
      //     >
      //       <IonIcon icon={addOutline} class="icon"></IonIcon>
      //     </IonButton>
      //   </TableCell>
      // </TableRow>
    );
  };
  const foodComponent = () => {
    if (
      isNoneFood === true &&
      (foodCatResult[0].id === 0 ||
        foodKeyResult[0].id === 0 ||
        foodCalResult[0].id === 0)
    ) {
      return <IonText>Aucun résultat</IonText>;
    }
    let foods = food;
    if (
      (foodCatResult.length > 1 || foodCatResult[0].id != 0) &&
      foodCat != ""
    ) {
      foods = foodCatResult;
    }
    if (
      (foodKeyResult.length > 1 || foodKeyResult[0].id != 0) &&
      foodKey != ""
    ) {
      foods = foods.filter((x: any) => {
        let arr = foodKeyResult.filter((k: any) => k.id === x.id);
        return !(arr.length === 0);
      });
    }
    if (
      (foodCalResult.length > 1 || foodCalResult[0].id != 0) &&
      foodCalFrom != "" &&
      foodCalTo != ""
    ) {
      foods = foods.filter((x: any) => {
        let arr = foodCalResult.filter((k: any) => k.id === x.id);
        return !(arr.length === 0);
      });
    }

    return foods.map((f: any) => {
      return (
        <IonCard class="aliment2">
          {/* <IonImg src={unknown}></IonImg> */}
          <IonCardHeader class="cardHeader">
            <strong>Calories : </strong>
            {f.calories}
            <IonButton
              class="modalBtn"
              size="small"
              color="success"
              id={f.id}
              onClick={(e) => handleOpenModalFood(e, f)}
            >
              <IonIcon icon={addOutline} class="icon"></IonIcon>
            </IonButton>
          </IonCardHeader>
          <IonCardContent>
            {f.name}
            {/* Proteins : {f.detailfood.proteins} <br /> */}
            {/* Sucres : {f.detailfood.sucres} <br /> */}
            {/* Eau : {f.detailfood.eau} <br /> */}
            {/* Catégorie : {f.category.name} <br /> */}
          </IonCardContent>
        </IonCard>
      );
    });
  };

  return (
    // Exercises
    <IonContent class="aliments" scrollX={true}>
      <IonGrid>
        <IonModal
          cssClass="confirm-exo"
          isOpen={show}
          onDidDismiss={() => setShow(false)}
          swipeToClose={true}
        >
          <IonCard style={{ margin: 0 }}>
            <IonCardHeader>
              <p className="modal-title">
                Veuillez confirmer l'ajout de cet exercise
              </p>
            </IonCardHeader>
            <IonCardContent>
              <IonRow class="modal-footer">
                <IonButton
                  size="small"
                  color="success"
                  expand="full"
                  onClick={() => handleAjouterExo()}
                >
                  Confirmer
                </IonButton>
                <IonButton
                  size="small"
                  expand="full"
                  onClick={() => setShow(false)}
                >
                  Fermer
                </IonButton>
              </IonRow>
            </IonCardContent>
          </IonCard>
        </IonModal>
        <IonModal
          cssClass="confirm"
          isOpen={showFood}
          onDidDismiss={() => setShowFood(false)}
          swipeToClose={true}
        >
          <IonCard style={{ margin: 0 }} class="modal-card">
            <IonCardHeader>
              <p className="modal-title">
                Veuillez confirmer l'ajout de cet aliment
              </p>
            </IonCardHeader>
            <IonCardContent>
              <IonRow>
                <IonCol>
                  <IonText>Calcium : {addedFood.detailfood.calcium}</IonText>{" "}
                  <br />
                  <IonText>
                    Proteins : {addedFood.detailfood.proteins}
                  </IonText>{" "}
                  <br />
                  <IonText>Sodium : {addedFood.detailfood.sodium}</IonText>{" "}
                  <br />
                  <IonText>Eau : {addedFood.detailfood.eau}</IonText> <br />
                  <IonText>Sucres : {addedFood.detailfood.sucres}</IonText>{" "}
                  <br />
                  <IonText>Fibres : {addedFood.detailfood.fibres}</IonText>{" "}
                  <br />
                  <IonText>
                    Acides saturé : {addedFood.detailfood.acidessatures}
                  </IonText>{" "}
                  <br />
                  <IonText>
                    Cholesterol : {addedFood.detailfood.cholesterol}
                  </IonText>{" "}
                  <br />
                </IonCol>
                <IonCol>
                  <IonText>Potasium : {addedFood.detailfood.potasium}</IonText>{" "}
                  <br />
                  <IonText>
                    VitamineD : {addedFood.detailfood.vitamineD}
                  </IonText>{" "}
                  <br />
                  <IonText>
                    VitamineC : {addedFood.detailfood.vitamineC}
                  </IonText>{" "}
                  <br />
                  <IonText>
                    VitamineE : {addedFood.detailfood.vitamineE}
                  </IonText>{" "}
                  <br />
                  <IonText>
                    VitamineB1 : {addedFood.detailfood.vitamineB1}
                  </IonText>{" "}
                  <br />
                  <IonText>
                    VitamineB9 : {addedFood.detailfood.vitamineB9}
                  </IonText>{" "}
                  <br />
                  <IonText>
                    VitamineB12 : {addedFood.detailfood.vitamineB12}
                  </IonText>{" "}
                  <br />
                  <IonText>
                    VitamineB6 : {addedFood.detailfood.vitamineB6}
                  </IonText>{" "}
                  <br />
                </IonCol>
              </IonRow>

              <IonRow class="modal-footer">
                <IonButton
                  size="small"
                  color="success"
                  expand="full"
                  onClick={() => handleAjouterFood()}
                >
                  Confirmer
                </IonButton>
                <IonButton
                  size="small"
                  expand="full"
                  onClick={() => setShowFood(false)}
                >
                  Fermer
                </IonButton>
              </IonRow>
            </IonCardContent>
          </IonCard>
        </IonModal>
        <h3 className="title">Exercices</h3>
        <IonRow>
          <IonCol>
            <IonItem>
              <IonInput
                class="search-bar"
                placeholder="Mot clé"
                value={exoKey}
                onIonChange={(e) => setExoKey(e.detail.value!)}
              ></IonInput>
            </IonItem>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol>
            {/* <IonLabel>Catégorie</IonLabel> */}
            <IonItem>
              <IonSelect
                className="select-cat"
                value={exoCat}
                placeholder="Aucune"
                onIonChange={(e) => setExoCat(e.detail.value!)}
              >
                <IonSelectOption value="">Aucune</IonSelectOption>
                {cats.map((cat: any) => {
                  return (
                    <IonSelectOption value={cat.name}>
                      {cat.name}
                    </IonSelectOption>
                  );
                })}
              </IonSelect>
            </IonItem>
          </IonCol>
          <IonCol className="label-col" sizeLg="1">
            <IonLabel className="label">Calories</IonLabel>
          </IonCol>
          <IonCol>
            <IonItem>
              <IonInput
                class="search-bar"
                placeholder="Minimum calories"
                value={exoCalFrom}
                onIonChange={(e) => setExoCalFrom(e.detail.value!)}
              ></IonInput>
            </IonItem>
            {/* <IonItem>
            <IonRange min={0} max={1000} color="secondary">
              <IonLabel slot="start">0Cal</IonLabel>
              <IonLabel slot="end">800Cal</IonLabel>
            </IonRange>
          </IonItem> */}
          </IonCol>
          <IonCol>
            <IonItem>
              <IonInput
                class="search-bar"
                placeholder="Maximum calories"
                value={exoCalTo}
                onIonChange={(e) => setExoCalTo(e.detail.value!)}
              ></IonInput>
            </IonItem>
          </IonCol>
        </IonRow>
        <IonRow className="search-button-row">
          <IonCol sizeXs="6" sizeMd="4" sizeLg="2">
            <IonButton
              color="secondary"
              onClick={handleViderExercise}
              className="search-combine"
            >
              Réintialiser
            </IonButton>
          </IonCol>
          <IonCol sizeXs="6" sizeMd="4" sizeLg="2">
            <IonButton class="search-combine" onClick={handleSearchExo}>
              chercher
            </IonButton>
          </IonCol>
        </IonRow>
        <IonRow className="row">
          <TableContainer component={Paper} className="container">
            <Table
              className={classes.table}
              aria-label="custom pagination table"
            >
              <TableHead>
                <TableRow>
                  <StyledTableCell>Exercise</StyledTableCell>
                  <StyledTableCell align="right">
                    Calories brulées
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    Durée(Minutes)
                  </StyledTableCell>
                  <StyledTableCell align="right">Catégorie</StyledTableCell>
                  <StyledTableCell align="right">Actions</StyledTableCell>
                </TableRow>
              </TableHead>
              {exoComponent()}
              <TableFooter>
                <TableRow>
                  <TablePagination
                    rowsPerPageOptions={[
                      5,
                      10,
                      25,
                      { label: "Tout", value: -1 },
                    ]}
                    colSpan={3}
                    count={exercices.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    SelectProps={{
                      inputProps: { "aria-label": "Ligne par page" },
                      native: true,
                    }}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                    ActionsComponent={TablePaginationActions}
                  />
                </TableRow>
              </TableFooter>
            </Table>
          </TableContainer>
        </IonRow>
        {/* Food */}
        <h3 className="title">Aliments</h3>
        <IonRow>
          <IonCol>
            <IonItem>
              <IonInput
                class="search-bar"
                placeholder="Mot clé"
                value={foodKey}
                onIonChange={(e) => setFoodKey(e.detail.value!)}
              ></IonInput>
            </IonItem>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol>
            <IonItem>
              <IonSelect
                className="select-cat"
                value={foodCat}
                placeholder="Aucune"
                onIonChange={(e) => setFoodCat(e.detail.value!)}
              >
                <IonSelectOption value="">Aucune</IonSelectOption>
                {catsFood.map((cat: any) => {
                  return (
                    <IonSelectOption value={cat.name}>
                      {cat.name}
                    </IonSelectOption>
                  );
                })}
              </IonSelect>
            </IonItem>
          </IonCol>
          <IonCol className="label-col" sizeLg="1">
            <IonLabel className="label">Calories</IonLabel>
          </IonCol>
          <IonCol>
            <IonItem>
              <IonInput
                class="search-bar"
                placeholder="Minimum calories"
                value={foodCalFrom}
                onIonChange={(e) => setFoodCalFrom(e.detail.value!)}
              ></IonInput>
            </IonItem>
          </IonCol>
          <IonCol>
            <IonItem>
              <IonInput
                class="search-bar"
                placeholder="Maximum calories"
                value={foodCalTo}
                onIonChange={(e) => setFoodCalTo(e.detail.value!)}
              ></IonInput>
            </IonItem>
          </IonCol>
        </IonRow>
        <IonRow className="search-button-row">
          <IonCol sizeXs="6" sizeMd="4" sizeLg="2">
            <IonButton
              color="secondary"
              onClick={handleViderFood}
              className="search-combine"
            >
              Réintialiser
            </IonButton>
          </IonCol>
          <IonCol sizeXs="6" sizeMd="4" sizeLg="2">
            <IonButton onClick={handleSearchFood} className="search-combine">
              Chercher
            </IonButton>
          </IonCol>
        </IonRow>
        <div className="list2">
          <IonRow class="roww2" slot="fixed">
            {foodComponent()}
          </IonRow>
        </div>
      </IonGrid>
    </IonContent>
  );
};

export default Accueil;
