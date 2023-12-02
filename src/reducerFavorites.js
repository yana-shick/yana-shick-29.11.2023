export default function reducerFavorites(state = [], action) {
	switch (action.type) {
		case "addFavorite":
			return [...state, action.payload];
		case "deleteFavorite":
			return state.filter((city) => city.id !== action.payload);
		default:
			return state;
	}
}
