import React from "react";

import { Col } from "react-bootstrap";
import { Card } from "react-bootstrap";

export const FavoriteCard = (props) => {
	return (
		<div>
			<Col md={2} xm={12}>
				<Card>
					<Card.Img variant="top" src="holder.js/100px180" />
					<Card.Body>
						<Card.Title>{props.city.city}</Card.Title>
						<Card.Text>{props.city.weatherText}</Card.Text>
						<Card.Text>{props.city.id}</Card.Text>
					</Card.Body>
				</Card>
			</Col>
		</div>
	);
};
