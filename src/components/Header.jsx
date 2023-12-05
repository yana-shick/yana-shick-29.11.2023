import React from "react";

import store from "../store";
import { useSelector } from "react-redux";
import { toggleUnitAction } from "../actionCreator";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faEllipsisVertical,
	faMoon,
	faSun,
} from "@fortawesome/free-solid-svg-icons";

export const Header = (props) => {
	const storeData = useSelector((state) => state.reducerActive);
	const weatherUnit = storeData.weather?.unit;
	const toggleUnit = () => {
		try {
			store.dispatch(toggleUnitAction(weatherUnit === "C" ? "F" : "C"));
		} catch (err) {
			// console.log(err)
		}
	};

	const theme = useSelector((state) => state.reducerTheme);
	const themeIcon = () => {
		if (theme === "darkTheme") {
			return <FontAwesomeIcon icon={faSun} className="sunIcon" size="lg" />;
		}
		return <FontAwesomeIcon icon={faMoon} className="moonIcon" size="lg" />;
	};
	return (
		<Navbar expand="md">
			<Container
				className="bg-secondary pb-1 rounded-3 my-navbar"
				data-bs-theme={theme}
			>
				<Navbar.Brand href="/">Herolo Weather Task</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav">
					<FontAwesomeIcon icon={faEllipsisVertical} />
				</Navbar.Toggle>
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="ms-auto secondary">
						<Nav.Link
							onClick={() => {
								props.setDisplayWeather("block");
								props.setDisplayFavorite("none");
							}}
						>
							Home
						</Nav.Link>
						<Nav.Link
							onClick={() => {
								props.setDisplayWeather("none");
								props.setDisplayFavorite("flex");
							}}
						>
							Favorites
						</Nav.Link>
						<Nav.Link
							onClick={() => {
								toggleUnit();
							}}
						>
							{weatherUnit}
						</Nav.Link>
						<Nav.Link
							onClick={() => {
								store.dispatch({ type: "changeTheme" });
							}}
						>
							{themeIcon()}
						</Nav.Link>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
};
