import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { rootReducers } from "./reducers";

//Herramienta de depuracion de redux
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

//Store
//Almacenamiento de nuestro estado
export const store = createStore(
  rootReducers,
  composeEnhancers(applyMiddleware(thunk))
);
