import React from "react";

import { useSelector } from "react-redux";

import { Col } from "react-bootstrap";
import { Card } from "react-bootstrap";

export const FavoriteCard = (props) => {
	const theme = useSelector((state) => state.reducerTheme);
	return (
		<Col md={6} xm={12}>
			<Card
				className="bg-secondary border-0 my-favorites"
				data-bs-theme={theme}
				onClick={() => {
					props.setDisplayWeather("block");
					props.setDisplayFavorite("none");
					props.setCity(props.city.city);
				}}
			>
				<Card.Body className="rounded-3 my-card-body">
					<Card.Title className="d-flex justify-content-center h5 mb-3">
						{props.city.city}
					</Card.Title>
					<Card.Text className="d-flex justify-content-center  mb-1">
						{props.city.weatherText}
					</Card.Text>
					{/* <Card.Text>{props.city.temperature.value}</Card.Text> */}
				</Card.Body>
			</Card>
		</Col>
	);
};
