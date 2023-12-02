import React from "react";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";

export const Forecast = (props) => {
	return (
		<Col md={2} xm={12}>
			<Card>
				<Card.Img variant="top" src="holder.js/100px180" />
				<Card.Body>
					<Card.Title>{props?.day?.date}</Card.Title>
					<Card.Text>{props?.day?.temperature?.min?.value}</Card.Text>
				</Card.Body>
			</Card>
		</Col>
	);
};
