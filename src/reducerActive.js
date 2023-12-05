export default function reducerActive(state = {}, action) {
	switch (action.type) {
		case "updateActive":
			let newStateWeather = { ...state };
			newStateWeather.weather = action.payload;
			return { ...newStateWeather };
		case "updateForecast":
			let newStateForecast = { ...state };
			newStateForecast.forecast = action.payload;
			return { ...newStateForecast };
		case "updateIsFavorite":
			let newStateIsFavorite = { ...state };
			newStateIsFavorite.isFavorite = action.payload;
			return { ...newStateIsFavorite };
		case "toggleUnit":
			let newStateUnit = { ...state };
			newStateUnit.weather.unit = action.payload;
			return { ...newStateUnit };
		default:
			return state;
	}
}
