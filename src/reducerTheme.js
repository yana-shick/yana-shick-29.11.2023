export default function reducerFavorites(state = "lightTheme", action) {
	switch (action.type) {
		case "changeTheme":
			if (state === "lightTheme") {
				return "darkTheme";
			} else {
				return "lightTheme";
			}
		default:
			return state;
	}
}
