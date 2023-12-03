import React from "react";
import { Link } from "react-router-dom";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";

export const Header = (props) => {
	return (
		<Navbar expand="md" className="bg-body-tertiary">
			<Container>
				<Navbar.Brand href="/">Herolo Weather Task</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav">
					<FontAwesomeIcon icon={faEllipsisVertical} />
				</Navbar.Toggle>
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="ms-auto">
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
								props.setDisplayFavorite("block");
							}}
						>
							Favorites
						</Nav.Link>
						<NavDropdown title="Dropdown" id="basic-nav-dropdown">
							<NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
							<NavDropdown.Item href="#action/3.2">
								Another action
							</NavDropdown.Item>
						</NavDropdown>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
};
