import React from "react";
import { Header } from "./Header";
import { Main } from "./Main";
import { Favorites } from "./Favorites";

import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";

import store from "../store";
import { updateActive } from "../actionCreator";
import { updateForecast } from "../actionCreator";
import { toggleIsFavorite } from "../actionCreator";
import { addListFavorites } from "../actionCreator";

import { useSelector } from "react-redux";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Toast from "react-bootstrap/Toast";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

export const Home = () => {
	const apikey = "3MSy8fxf6LQX6t2bW0cZl42HAVAuvRAb";
	// const apikey = "9QmfmlRtMb49LFqx7faqstwGAOOPBCTA";
	const [city, setCity] = useState("");
	const [citykey, setCitykey] = useState("");

	const correctCityName = useRef("");

	const [showToast, setShowToast] = useState(false);
	const toggleShowToast = () => setShowToast(!showToast);

	const [errors, setErrors] = useState("");
	const [displayWeather, setDisplayWeather] = useState("block");
	const [displayFavorite, setDisplayFavorite] = useState("none");

	const theme = useSelector((state) => state.reducerTheme);

	// ---------------------------------------------
	// -----------------DEFAULT VALUE---------------
	// ---------------------------------------------
	useEffect(() => {
		console.log(
			"starting default-city useEffect, search-value is: ",
			document.getElementById("search_bar").value
		);
		if (document.getElementById("search_bar").value !== "default-city") return;
		document.getElementById("search_bar").value = "";
		const getDefaultCityKey = (position) => {
			const lat = position.coords.latitude;
			const lon = position.coords.longitude;
			const coor = `${lat},${lon}`;
			console.log(`trying to fetch:  default-city`);
			fetch(
				`https://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=${apikey}&q=${coor}`
				// `http://###`
			)
				.then((res) => {
					return res.json();
				})
				.then((data) => {
					console.log(`reseived data from default request:`, data);
					if (data.ParentCity) {
						correctCityName.current = data.ParentCity.LocalizedName;
						setCitykey(data.ParentCity.Key);
					} else {
						correctCityName.current = data.LocalizedName;
						setCitykey(data.Key);
						console.log(
							`default-city: correctCityName: `,
							correctCityName.current
						);
					}
				})
				.catch((err) => {
					document.getElementById("search_bar").value = "";
					setErrors("weather is temporarily unavaible");
					setShowToast(true);
				});
		};
		navigator.geolocation.getCurrentPosition(getDefaultCityKey);
	}, []);

	// ---------------------------------------------
	// -----------------AUTOCOMPLITE----------------
	// ---------------------------------------------
	useEffect(() => {
		setShowToast(false);
		if (!city) {
			console.log("city is empty");
			return;
		}
		console.log(`trying to fetch:  autocomplite`);

		fetch(
			`https://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${apikey}&q=${city}`
			// `http://###`
		)
			.then((res) => {
				return res.json();
			})
			.then((data) => {
				console.log(`received autocomplied data length= ${data.length}`);
				// add to chrome autocomplite:
				const datalist = document.getElementById("cities");
				for (let i = datalist.children.length - 1; i >= 0; i--) {
					datalist.children[i].remove();
				}
				data.forEach((city) => {
					let option = document.createElement("option");
					option.value = city.LocalizedName;
					datalist.appendChild(option);
				});

				let cityInOptions = false;
				for (let i = 0; i < datalist.options.length; i++) {
					if (datalist.options[i].value === city) cityInOptions = true;
				}

				if (data.length === 1 || cityInOptions) {
					console.log(`trying to set citykey ${data[0].Key}`);
					correctCityName.current = data[0].LocalizedName;
					setCitykey(data[0].Key);
				}
			})
			.catch((err) => {
				setErrors("weather is temporarily unavaible");
				setShowToast(true);
			});
	}, [city]);

	// ---------------------------------------------
	// ------------WEATHER--+--FORECAST-------------
	// ---------------------------------------------

	useEffect(() => {
		if (!citykey) {
			console.log("citykey is empty");
			return;
		}
		// fetch weather:
		console.log("trying to fetch: current weather");
		fetch(
			`https://dataservice.accuweather.com/currentconditions/v1/${citykey}?apikey=${apikey}`
			// `http://###`
		)
			.then((res) => {
				return res.json();
			})
			.then((data) => {
				console.log(
					`recieved data current weather: `,
					correctCityName.current,
					data,
					citykey
				);
				console.log(
					`current weather: correctCityName: `,
					correctCityName.current
				);
				document.getElementById("search_bar").value = "";
				const nameToDispatch = correctCityName.current;
				store.dispatch(updateActive({ nameToDispatch, data, citykey }));

				const isFavorite = document.cookie.includes(`favorite_${citykey}`);
				store.dispatch(toggleIsFavorite(isFavorite));
			})
			.catch((err) => {
				setErrors("weather is temporarily unavaible");
				setShowToast(true);
			});

		// fetch object:
		// returns object
		console.log("trying to fetch: forecast");
		fetch(
			`https://dataservice.accuweather.com/forecasts/v1/daily/5day/${citykey}?apikey=${apikey}&metric=true`
			// "http:###"
		)
			.then((res) => {
				return res.json();
			})
			.then((forecastData) => {
				console.log(`recieved forecastData: `, forecastData);
				store.dispatch(updateForecast(forecastData));
			})
			.catch((err) => {
				setErrors("weather is temporarily unavaible");
				setShowToast(true);
			});

		// ---------------------------------------------
		// -------------------FAVORITES-----------------
		// ---------------------------------------------
		console.log("trying to fetch: list of favorites");

		const listFavoritesFullData = [];

		const interval = 1 * 60 * 60 * 1000;

		let decodedCookie = decodeURIComponent(document.cookie);
		let arrFromCookie = decodedCookie.split(";");
		let listFavoritesCookie = arrFromCookie.filter((favorite) => {
			return favorite.indexOf("favorite_") === 1;
		});

		console.log(`received cookies: `, listFavoritesCookie);

		if (!listFavoritesCookie) return;
		listFavoritesCookie.forEach((val) => {
			// console.log(`favorite from cookie `, val);
			const splitVal = val.split("=");
			const citykey = splitVal[0].split("_")[1];
			const city = JSON.parse(splitVal[1]).city;

			const dateFromCookie = JSON.parse(splitVal[1]).date;
			const secondsFromCookie = new Date(dateFromCookie).getTime();
			const now = new Date();

			if (secondsFromCookie - now > interval) {
				// console.log("need to update");

				fetch(
					`https://dataservice.accuweather.com/currentconditions/v1/${citykey}?apikey=${apikey}`
					// `http:/###`
				)
					.then((res) => {
						return res.json();
					})
					.then((data) => {
						// console.log(`trying to build list with full data`);

						const weatherText = data[0].WeatherText;
						listFavoritesFullData.push({
							citykey,
							city,
							weatherText,
						});
					})
					.catch((err) => {
						setErrors("favorites is temporarily unavaible");
						setShowToast(true);
						console.log(err);
					});
			} else {
				// console.log("no need to update");

				const weatherText = JSON.parse(splitVal[1]).weatherText;
				listFavoritesFullData.push({
					citykey,
					city,
					weatherText,
				});
			}

			// console.log(
			// `list of favorites trying add to store:: `,
			// listFavoritesFullData
			// );
			store.dispatch(addListFavorites({ ...listFavoritesFullData }));
		});
	}, [citykey]);

	return (
		<Container>
			<Header
				setDisplayWeather={setDisplayWeather}
				setDisplayFavorite={setDisplayFavorite}
			/>

			<Container id="home" style={{ display: displayWeather }}>
				{/* SEARCH */}
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
								className="rounded-3 my-search"
								data-bs-theme={theme}
								defaultValue="default-city"
							/>
							<datalist id="cities">
								<option>test</option>
							</datalist>
							<InputGroup.Text
								id="basic-addon"
								className="rounded-3 my-search ms-0"
								data-bs-theme={theme}
							>
								<FontAwesomeIcon icon={faMagnifyingGlass} id="searchIcon" />
							</InputGroup.Text>
						</InputGroup>
					</Col>
				</Row>
				{/* WEATHER */}
				<Row>
					<Main />
				</Row>
			</Container>
			{/* FAVORITES */}

			<Favorites
				displayStyle={displayFavorite}
				setCity={setCity}
				setDisplayWeather={setDisplayWeather}
				setDisplayFavorite={setDisplayFavorite}
			/>

			{/* ERROR MESSAGES */}
			<Toast show={showToast} onClose={toggleShowToast} className="my-error">
				<Toast.Body className="text-danger">{errors}</Toast.Body>
			</Toast>
		</Container>
	);
};
