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
	// console.log(`day in forecast: `, dayName);

	return (
		<Col md={2} xm={12}>
			<Card className="border-0 my-forecat" data-bs-theme={theme}>
				<Card.Body className="bg-secondary rounded-3 my-card-body">
					<Card.Title className="d-flex justify-content-center h5 mb-3">
						{dayName}
					</Card.Title>
					<Card.Text className="d-flex justify-content-center  mb-1">
						min: {props?.day?.temperature?.min?.value}{" "}
						{props?.day?.temperature?.min?.unit}
					</Card.Text>
					<Card.Text className="d-flex justify-content-center ">
						max: {props?.day?.temperature?.max?.value}{" "}
						{props?.day?.temperature?.max?.unit}
					</Card.Text>
				</Card.Body>
			</Card>
		</Col>
	);
};
