import { configureStore } from "@reduxjs/toolkit";

import reducerActive from "./reducerActive";
import reducerFavorites from "./reducerFavorites";
import reducerTheme from "./reducerTheme";

const reducer = { reducerActive, reducerFavorites, reducerTheme };

const store = configureStore({ reducer });

export default store;
