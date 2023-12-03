export default function reducerFavorites(state = [], action) {
	switch (action.type) {
		case "addListFavorites":
			// console.log(`reducer favorites1`, action.payload);
			let newState = [];
			for (let key in action.payload) {
				newState.push(action.payload[key]);
				// console.log(`reducer favorites2`, newState);
			}
			return newState;
		case "addFavorite":
			return [...state, action.payload];
		case "deleteFavorite":
			let newStateDelete = [...state];
			// console.log(`newState favorites: `, newStateDelete);

			return newStateDelete.filter((city) => city.citykey !== action.payload);
		default:
			return state;
	}
}
