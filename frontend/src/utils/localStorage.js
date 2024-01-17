// add a product to locale Storage
export const addFavoritesToLocalStorage = (product) => {
  const favorites = getFavoritesFromLocalStorage();
  if (!favorites.some((p) => p._id === product._id)) {
    favorites.push(product);
    localStorage.setItem("favorits", JSON.stringify(favorites));
  }
};
// remove a product to locale Storage
export const removeFavoriteFromLocalStorage = (productId) => {
  const favorites = getFavoritesFromLocalStorage();
  const updateFavorites = favorites.filter(
    (product) => product._id !== productId
  );
  localStorage.setItem("favorits", JSON.stringify(updateFavorites));
};
// Retrive a product to locale Storage
export const getFavoritesFromLocalStorage = () => {
  const favoritesJSON = localStorage.getItem("favorits");
  return favoritesJSON ? JSON.parse(favoritesJSON) : [];
};
