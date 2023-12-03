import React from "react";

import { FavoriteCard } from "./FavoriteCard";

import { useSelector } from "react-redux";
import { Row } from "react-bootstrap";

export const Favorites = (props) => {
	const storeData = useSelector((state) => state.reducerFavorites);
	console.log(`favorites componenta: store: `, storeData);
	return (
		<Row style={{ display: props.displayStyle }}>
			{storeData.map((city) => {
				return <FavoriteCard city={city} />;
			})}
			FAVORITES
		</Row>
	);
};
