export const setFavorite = (id, isFavorite) => ({
  type: 'SET_FAVORITE',
  payload: { id, isFavorite },
});

export const removeFavorite = (hotelId) => ({
  type: 'REMOVE_FAVORITE',
  payload: hotelId,
});