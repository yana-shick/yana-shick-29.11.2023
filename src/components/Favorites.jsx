import React from "react";

import { FavoriteCard } from "./FavoriteCard";

import { useSelector } from "react-redux";

import { Row } from "react-bootstrap";

export const Favorites = (props) => {
	const storeData = useSelector((state) => state.reducerFavorites);
	return (
		<Row
			style={{ display: props.displayStyle }}
			className="gy-3 my-3 justify-content-around"
		>
			{storeData.map((city) => {
				return (
					<FavoriteCard
						city={city}
						setCity={props.setCity}
						setDisplayWeather={props.setDisplayWeather}
						setDisplayFavorite={props.setDisplayFavorite}
					/>
				);
			})}
		</Row>
	);
};
