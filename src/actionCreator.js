export const updateActive = (weather) => {
	return {
		type: "updateActive",
		payload: {
			city: weather.nameToDispatch,
			weatherText: weather.data[0].WeatherText,
			temperature: {
				value: weather.data[0].Temperature.Metric.Value,
			},
			unit: "C",
			date: weather.data[0].LocalObservationDateTime,
			weatherIcon: weather.data[0].WeatherIcon,
			citykey: weather.citykey,
		},
	};
};

export const toggleUnitAction = (unit) => {
	return {
		type: "toggleUnit",
		payload: unit,
	};
};

export const updateForecast = (forecastFull) => {
	let forecast = [];
	forecastFull.DailyForecasts.forEach((day) => {
		forecast.push({
			date: day.Date,
			temperature: {
				min: {
					value: day.Temperature.Minimum.Value,
					unit: day.Temperature.Minimum.Unit,
				},
				max: {
					value: day.Temperature.Maximum.Value,
					unit: day.Temperature.Maximum.Unit,
				},
			},
		});
	});
	return {
		type: "updateForecast",
		payload: forecast,
	};
};

export const toggleIsFavorite = (isFavorite) => {
	return {
		type: "updateIsFavorite",
		payload: isFavorite,
	};
};

export const addFavorite = (city) => {
	return {
		type: "addFavorite",
		payload: city,
	};
};

export const deleteFavorite = (citykey) => {
	return {
		type: "deleteFavorite",
		payload: citykey,
	};
};

export const addListFavorites = (listFavorites) => {
	return {
		type: "addListFavorites",
		payload: listFavorites,
	};
};
