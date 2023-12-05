export default function reducerFavorites(state = [], action) {
	switch (action.type) {
		case "addListFavorites":
			
			let newState = [];
			for (let key in action.payload) {
				newState.push(action.payload[key]);
				
			}
			return newState;
		case "addFavorite":
			return [...state, action.payload];
		case "deleteFavorite":
			let newStateDelete = [...state];
			

			return newStateDelete.filter((city) => city.citykey !== action.payload);
		default:
			return state;
	}
}
