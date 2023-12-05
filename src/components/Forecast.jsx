import React from "react";

import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";

import { useSelector } from "react-redux";

export const Forecast = (props) => {
	const theme = useSelector((state) => state.reducerTheme);
	const dayInStore = props?.day?.date;
	const days = ["Sun", "Mon", "Tue", "Wen", "Thi", "Fri", "Sat"];
	const day = new Date(dayInStore);
	let dayName = days[day.getDay()];
	let minTemperature = "";
	let maxTemperature = "";
	if (props?.weatherUnit === "C") {
		minTemperature = props?.day?.temperature?.min?.value;
		maxTemperature = props?.day?.temperature?.min?.value;
	} else {
		minTemperature = (props?.day?.temperature?.max?.value * 1.8 + 32).toFixed(
			1
		);
		maxTemperature = (props?.day?.temperature?.max?.value * 1.8 + 32).toFixed(
			1
		);
	}
	return (
		<Col md={2} xm={12}>
			<Card className="border-0 my-forecat" data-bs-theme={theme}>
				<Card.Body className="bg-secondary rounded-3 my-card-body">
					<Card.Title className="d-flex justify-content-center h5 mb-3">
						{dayName}
					</Card.Title>
					<Card.Text className="d-flex justify-content-center  mb-1">
						min: {minTemperature} {props?.weatherUnit}
					</Card.Text>
					<Card.Text className="d-flex justify-content-center">
						max: {maxTemperature} {props?.weatherUnit}
					</Card.Text>
				</Card.Body>
			</Card>
		</Col>
	);
};
