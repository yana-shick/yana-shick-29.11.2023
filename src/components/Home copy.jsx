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
		if (!city) {
			console.log("city is empty");
			return;
		}
		console.log(
			`trying to call http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${apikey}&q=${city}`
		);

		// fetch(
		// `http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${apikey}&q=${city}`
		// )
		// .then((res) => {
		// 	return res.json();
		// })
		// .then((data) => {
		let data = [
			{
				Version: 1,
				Key: "11111",
				Type: "City",
				Rank: 31,
				LocalizedName: "Tel Aviv",
				Country: {
					ID: "IL",
					LocalizedName: "Israel",
				},
				AdministrativeArea: {
					ID: "TA",
					LocalizedName: "Tel Aviv",
				},
			},
		];
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
		// }). catch((err)=>{
		// console.log('error')
		// })
	}, [city]);

	useEffect(() => {
		if (!citykey) {
			console.log("citykey is empty");
			return;
		}
		console.log("i am trying to fetch current weather");
		// fetch weather:
		// fetch(
		// 	`http://dataservice.accuweather.com/currentconditions/v1/${citykey}?apikey=${apikey}`
		// )
		fetch("https://jsonplaceholder.typicode.com/posts", {
			// fetch("###", {
			method: "POST",
			body: JSON.stringify({
				LocalObservationDateTime: "2023-11-30T19:17:00+02:00",
				WeatherText: "AAAAAA",
				WeatherIcon: 36,
				Temperature: {
					Metric: {
						Value: 21.7,
						Unit: "C",
						UnitType: 17,
					},
					Imperial: {
						Value: 71.0,
						Unit: "F",
						UnitType: 18,
					},
				},
			}),
			headers: {
				"Content-type": "application/json; charset=UTF-8",
			},
		})
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
		fetch("https://jsonplaceholder.typicode.com/posts", {
			method: "POST",
			body: JSON.stringify({
				Headline: {},
				DailyForecasts: [
					{
						Date: "2023-12-01T07:00:00+02:00",
						EpochDate: 1701406800,
						Temperature: {
							Minimum: {
								Value: 14.7,
								Unit: "C",
								UnitType: 17,
							},
							Maximum: {
								Value: 25.1,
								Unit: "C",
								UnitType: 17,
							},
						},
					},
					{
						Date: "2023-12-02T07:00:00+02:00",
						EpochDate: 1701493200,
						Temperature: {
							Minimum: {
								Value: 14.6,
								Unit: "C",
								UnitType: 17,
							},
							Maximum: {
								Value: 24.4,
								Unit: "C",
								UnitType: 17,
							},
						},
					},
					{
						Date: "2023-12-03T07:00:00+02:00",
						EpochDate: 1701493200,
						Temperature: {
							Minimum: {
								Value: 14.6,
								Unit: "C",
								UnitType: 17,
							},
							Maximum: {
								Value: 24.4,
								Unit: "C",
								UnitType: 17,
							},
						},
					},
					{
						Date: "2023-12-04T07:00:00+02:00",
						EpochDate: 1701493200,
						Temperature: {
							Minimum: {
								Value: 15.6,
								Unit: "C",
								UnitType: 17,
							},
							Maximum: {
								Value: 24.4,
								Unit: "C",
								UnitType: 17,
							},
						},
					},
					{
						Date: "2023-12-05T07:00:00+02:00",
						EpochDate: 1701493200,
						Temperature: {
							Minimum: {
								Value: 16.6,
								Unit: "C",
								UnitType: 17,
							},
							Maximum: {
								Value: 24.4,
								Unit: "C",
								UnitType: 17,
							},
						},
					},
				],
			}),
			headers: {
				"Content-type": "application/json; charset=UTF-8",
			},
		})
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
						<datalist id="cities">
							{/* <option>tel aviv</option>
							<option>jerusalem</option>
							<option>ramat gan</option> */}
						</datalist>
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
