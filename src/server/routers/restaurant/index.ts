import { addFavoriteRouter } from "./add-favorite";
import { getRestaurantsRouter } from "./get-restaurants";
import { removeFavoriteRouter } from "./remove-favorite";

export const restaurantRouter = {
  getRestaurants: getRestaurantsRouter.getRestaurants,
  addFavorite: addFavoriteRouter.addFavorite,
  removeFavorite: removeFavoriteRouter.removeFavorite,
};
