import React from "react";
import { useEffect } from "react";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";

export const Favorites = () => {
	const apikey = "3MSy8fxf6LQX6t2bW0cZl42HAVAuvRAb";
	let decodedCookie = decodeURIComponent(document.cookie);
	let listFavorites = decodedCookie.split(";");
	let listFavoritesFullData = [];

	useEffect(() => {
		listFavorites.forEach((val) => {
			console.log(`favorite from cookie `, val);
			const id = Object.keys(val)[0];
			const city = val[id];
			fetch(
				`http://dataservice.accuweather.com/currentconditions/v1/${id}?apikey=${apikey}`
			)
				.then((res) => {
					return res.json();
				})
				.then((data) => {
					console.log(`trying to build list wuth full data`);
					const weatherText = data.WeatherText;

					listFavoritesFullData.push({ id, city, weatherText });
				})
				.cath((err) => {
					// setErrors("weather is temorarily unavaible");
					// setShowToast(true);
					console.log(err);
				});
		});
	}, []);

	const displayFavorites = () => {
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
