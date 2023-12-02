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
	const weatherCity = storeData.weather?.city;
	const weatherTempertureValue = storeData.weather?.temperature?.value;
	const weatherTemperatureUnit = storeData.weather?.temperature?.unit;
	const weatherWeatherText = storeData.weather?.weatherText;
	const weatherCityKey = storeData.weather?.citykey;

	const weatherIconIndex = storeData.weather?.weatherIcon;
	const icon = `https://developer.accuweather.com/sites/default/files/${weatherIconIndex}-s.png`;

	const isFavorite = storeData.isFavorite;

	const toggleFavorites = () => {
		if (isFavorite) {
			document.cookie = `${weatherCityKey}=${weatherCity}; expires=Thu, 01 Jan 1970 00:00:01 GMT`;
			store.dispatch(deleteFavorite(weatherCityKey));
			store.dispatch(toggleIsFavorite(!isFavorite));
		} else {
			document.cookie = `${weatherCityKey}=${weatherCity}`;
			store.dispatch(addFavorite(weatherCityKey));
			store.dispatch(toggleIsFavorite(!isFavorite));
		}
	};

	const forecast = storeData.forecast;
	const displayForecast = () => {
		if (!forecast) return null;
		return forecast.map((day) => {
			return <Forecast day={day} />;
		});
	};

	return (
		<Container className="border">
			<Row className="mt-5 border ">
				<Col md={6} xm={12}>
					{weatherCity}
					{weatherTempertureValue}
					{weatherTemperatureUnit}
					<Image src={icon} rounded />
				</Col>
				<Col md={6} xm={12} className="d-flex justify-content-end">
					<FontAwesomeIcon
						icon={faHeart}
						size="2xl"
						onClick={toggleFavorites}
						id="favoriteIcon"
						className={isFavorite ? "favoriteColor" : "notFavoriteColor"}
					/>
				</Col>
			</Row>
			<Row className="mt-5 border">
				<Col className="d-flex justify-content-center">
					{weatherWeatherText}
				</Col>
			</Row>
			<Row className="gy-3 mt-5 d-flex justify-content-around">
				{displayForecast()}
			</Row>
		</Container>
	);
};
