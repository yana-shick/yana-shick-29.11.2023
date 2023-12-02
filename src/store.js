import { configureStore } from "@reduxjs/toolkit";

import reducerActive from "./reducerActive";
import reducerFavorites from "./reducerFavorites";


const reducer = { reducerActive, reducerFavorites };

const store = configureStore({ reducer });


export default store;
