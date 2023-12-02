import React from "react";
import { Main } from "./Main";

import { useState } from "react";
import { useEffect } from "react";

import store from "../store";
import { updateActive } from "../actionCreator";
import { updateForecast } from "../actionCreator";
import { toggleIsFavorite } from "../actionCreator";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import Toast from "react-bootstrap/Toast";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

export const Home = () => {
	const apikey = "3MSy8fxf6LQX6t2bW0cZl42HAVAuvRAb";
	const [city, setCity] = useState("");
	const [citykey, setCitykey] = useState("");

	const [showToast, setShowToast] = useState(false);
	const toggleShowToast = () => setShowToast(!showToast);

	const [errors, setErrors] = useState("");

	useEffect(() => {
		setShowToast(false);
		if (!city) {
			console.log("city is empty");
			return;
		}
		console.log(
			`trying to call http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${apikey}&q=${city}`
		);

		fetch(
			`http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${apikey}&q=${city}`
		)
			.then((res) => {
				return res.json();
			})
			.then((data) => {
				console.log(`received autocomplied data length= ${data.length}`);
				if (data.length === 1) {
					console.log(`trying to set citykey ${data[0].Key}`);
					setCitykey(data[0].Key);
				} else {
					const datalist = document.getElementById("cities");
					for (let i = datalist.children.length - 1; i >= 0; i--) {
						console.log(datalist.children[i]);
						datalist.children[i].remove();
					}
					data.forEach((city) => {
						let option = document.createElement("option");
						option.value = city.LocalizedName;
						datalist.appendChild(option);
					});
				}
			})
			.catch((err) => {
				setErrors("weather is temorarily unavaible");
				setShowToast(true);
			});
	}, [city]);

	useEffect(() => {
		if (!citykey) {
			console.log("citykey is empty");
			return;
		}
		// fetch weather:
		console.log("i am trying to fetch current weather");
		fetch(
			`http://dataservice.accuweather.com/currentconditions/v1/${citykey}?apikey=${apikey}`
		)
			.then((res) => {
				return res.json();
			})
			.then((data) => {
				console.log(`recieved data: `, data);
				store.dispatch(updateActive({ city, data, citykey }));

				const isFavorite = document.cookie.includes(`${citykey}=${city}`);
				store.dispatch(toggleIsFavorite(isFavorite));
			})
			.catch((err) => {
				setErrors("weather is temorarily unavaible");
				setShowToast(true);
			});
		// fetch 5 day forecast:
		// if (C or F)
		// returns object
		fetch(
			`http://dataservice.accuweather.com/forecasts/v1/daily/5day/${citykey}?apikey=${apikey}&metric=true`
		)
			.then((res) => {
				return res.json();
			})
			.then((forecastData) => {
				console.log(`recieved forecastData: `, forecastData);
				store.dispatch(updateForecast(forecastData));
			});
	}, [citykey]);

	return (
		<Container>
			<Row className="justify-content-md-center m-3">
				<Col md={6}>
					<InputGroup>
						<Form.Control
							type="text"
							id="search_bar"
							onChange={(e) => {
								setCity(e.target.value);
							}}
							list="cities"
						/>
						<datalist id="cities"></datalist>
						<Button variant="primary" type="submit">
							<FontAwesomeIcon icon={faMagnifyingGlass} />
						</Button>
					</InputGroup>
				</Col>
			</Row>
			<Row>
				<Main />
			</Row>

			<Toast show={showToast} onClose={toggleShowToast}>
				<Toast.Body>{errors}</Toast.Body>
			</Toast>
		</Container>
	);
};
