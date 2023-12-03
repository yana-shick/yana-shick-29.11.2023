import React from "react";

import { FavoriteCard } from "./FavoriteCard";

import { useSelector } from "react-redux";
import { Row } from "react-bootstrap";

export const Favorites = (props) => {
	const storeData = useSelector((state) => state.reducerFavorites);
	console.log(`favorites componenta: store: `, storeData);
	return (
		<Row>
			{storeData.map((city) => {
				return <FavoriteCard city={city} />;
			})}
			TEST FOR FAVORITES
		</Row>
	);
};
