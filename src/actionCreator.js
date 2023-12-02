export const updateActive = (weather) => {
	return {
		type: "updateActive",
		payload: {
			city: weather.city,
			weatherText: weather.data[0].WeatherText,
			temperature: {
				value: weather.data[0].Temperature.Metric.Value,
				unit: weather.data[0].Temperature.Metric.Unit,
			},
			date: weather.data[0].LocalObservationDateTime,
			weatherIcon: weather.data[0].WeatherIcon,
			citykey: weather.citykey,
		},
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
					unit: day.Temperature.Maximum.Value,
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

export const addFavorite = (id) => {
	return {
		type: "addFavorite",
		payload: id,
	};
};

export const deleteFavorite = (id) => {
	return {
		type: "deleteFavorite",
		payload: id,
	};
};
