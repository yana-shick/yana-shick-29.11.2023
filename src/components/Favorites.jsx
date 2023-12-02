import React from "react";
import { useEffect } from "react";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";

export const Favorites = () => {
	// const apikey = "3MSy8fxf6LQX6t2bW0cZl42HAVAuvRAb";
	const apikey = "9QmfmlRtMb49LFqx7faqstwGAOOPBCTA";
	let decodedCookie = decodeURIComponent(document.cookie);
	let arrFromCookie = decodedCookie.split(";");
	let listFavorites = arrFromCookie.filter((favorite) => {
		return favorite.indexOf("favorite_") === 1;
	});

	console.log(`received cookies: `, listFavorites);

	let listFavoritesFullData = [];

	useEffect(() => {
		if (!listFavorites) return;
		listFavorites.forEach((val) => {
			console.log(`favorite from cookie `, val);
			const splitVal = val.split("=");
			const id = splitVal[0].split("_")[1];
			const city = JSON.parse(splitVal[1]).city;

			const date = JSON.parse(splitVal[1]).date;
			console.log(new Date() === date);

			console.log(`id: ${id}, city: ${city}, date ${date}`);

			// fetch(
			// 	`http://dataservice.accuweather.com/currentconditions/v1/${id}?apikey=${apikey}`
			// )
			// 	.then((res) => {
			// 		return res.json();
			// 	})
			// 	.then((data) => {
			// 		console.log(`trying to build list with full data`);
			// 		const weatherText = data[0].WeatherText;
			// 		listFavoritesFullData.push({ id, city, weatherText });
			// 	})
			// 	.catch((err) => {
			// 		// setErrors("weather is temorarily unavaible");
			// 		// setShowToast(true);
			// 		console.log(err);
			// 	});
		});
		console.log(`list full data: `, listFavoritesFullData);
	}, []);

	const displayFavorites = () => {
		if (!listFavoritesFullData) return null;
		return listFavoritesFullData.map((city) => {
			return (
				<Col md={2} xm={12}>
					<Card>
						<Card.Img variant="top" src="holder.js/100px180" />
						<Card.Body>
							<Card.Title>{city.city}</Card.Title>
							<Card.Text>{city.weatherText}</Card.Text>
							<Card.Text>{city.id}</Card.Text>
						</Card.Body>
					</Card>
				</Col>
			);
		});
	};
	return (
		<div>
			<Container>
				<Row>{displayFavorites()}</Row>
			</Container>
		</div>
	);
};
