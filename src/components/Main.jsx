import React from "react";
import { useState } from "react";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

import store from "../store";
import { useSelector } from "react-redux";
import { addFavorite } from "../actionCreator";
import { deleteFavorite } from "../actionCreator";
import { toggleIsFavorite } from "../actionCreator";

import { Forecast } from "./Forecast";

export const Main = () => {
	const storeData = useSelector((state) => state.reducerActive);
	// console.log(`main componenta: store: `, storeData);
	const weatherCity = storeData.weather?.city;
	const weatherUnit = storeData.weather?.unit;
	let weatherTempertureValue = "";
	if (weatherUnit === "C") {
		weatherTempertureValue = storeData.weather?.temperature?.value;
	} else {
		weatherTempertureValue = (
			storeData.weather?.temperature?.value * 1.8 +
			32
		).toFixed(1);
	}
	console.log(`temperaturs:`, weatherTempertureValue, weatherUnit);

	const weatherWeatherText = storeData.weather?.weatherText;
	const weatherCityKey = storeData.weather?.citykey;

	const weatherIconIndex = storeData.weather?.weatherIcon;
	let weatherIconIndexCorrect = "";
	if (weatherIconIndex < 10) {
		weatherIconIndexCorrect = `0${weatherIconIndex}`;
	} else {
		weatherIconIndexCorrect = weatherIconIndex;
	}
	const icon = weatherIconIndex
		? `https://developer.accuweather.com/sites/default/files/${weatherIconIndexCorrect}-s.png`
		: null;

	const isFavorite = storeData.isFavorite;

	const toggleFavorites = () => {
		if (isFavorite) {
			document.cookie = `favorite_${weatherCityKey}=delete; expires=Thu, 01 Jan 1970 00:00:01 GMT`;
			store.dispatch(deleteFavorite(weatherCityKey));
			store.dispatch(toggleIsFavorite(!isFavorite));
		} else {
			document.cookie = `${weatherCityKey}=${weatherCity}`;
			// console.log(
			// 	`favorite_${weatherCityKey}=${JSON.stringify(storeData.weather)}`
			// );

			document.cookie = `favorite_${weatherCityKey}=${JSON.stringify(
				storeData.weather
			)}`;
			store.dispatch(
				addFavorite({
					citykey: weatherCityKey,
					city: weatherCity,
					weatherText: weatherWeatherText,
				})
			);
			store.dispatch(toggleIsFavorite(!isFavorite));
		}
	};

	const forecast = storeData.forecast;
	const displayForecast = () => {
		if (!forecast) return null;
		return forecast.map((day) => {
			return <Forecast day={day} weatherUnit={weatherUnit} />;
		});
	};

	return (
		<Container>
			<Row className="mt-3 ">
				<Col
					md={6}
					xm={12}
					className="d-flex justify-content-start align-items-center"
				>
					<Image src={icon} rounded className="w-50" />
					<Container className="d-flex-column">
						<div className="h2 text-start">{weatherCity}</div>
						<div className="h5 text-start">
							{weatherTempertureValue} {weatherUnit}
						</div>
					</Container>
				</Col>
				<Col
					md={6}
					xm={12}
					className="d-flex justify-content-end align-items-center"
				>
					<FontAwesomeIcon
						icon={faHeart}
						size="3x"
						onClick={toggleFavorites}
						id="favoriteIcon"
						className={isFavorite ? "favoriteColor" : "notFavoriteColor"}
					/>
				</Col>
			</Row>
			<Row className="mt-3 mb-2">
				<Col className="d-flex justify-content-center h1">
					{weatherWeatherText}
				</Col>
			</Row>
			<Row className="gy-3 my-3 d-flex justify-content-around">
				{displayForecast()}
			</Row>
		</Container>
	);
};
