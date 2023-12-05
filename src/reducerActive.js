export default function reducerActive(state = {}, action) {
	switch (action.type) {
		case "updateActive":
			// console.log(`begin reducer store1 active city: `, state);
			let newStateWeather = { ...state };
			newStateWeather.weather = action.payload;
			// console.log(`reducer store1 active city: `, newStateWeather);
			return { ...newStateWeather };
		case "updateForecast":
			let newStateForecast = { ...state };
			newStateForecast.forecast = action.payload;
			// console.log(`reducer store2 forecast: `, newStateForecast);
			return { ...newStateForecast };
		case "updateIsFavorite":
			let newStateIsFavorite = { ...state };
			newStateIsFavorite.isFavorite = action.payload;
			// console.log(`reducer store3 favorites: `, newStateIsFavorite);
			return { ...newStateIsFavorite };
		case "toggleUnit":
			let newStateUnit = { ...state };
			newStateUnit.weather.unit = action.payload;
			console.log(`reducer store4 unit: `, newStateUnit);
			return { ...newStateUnit };
		default:
			return state;
	}
}
