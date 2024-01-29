// reviewReducer.js
const initialState = {
    reviews: {},
  };
  
  const reviewReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'ADD_REVIEW':
        // Обработка действия для добавления отзыва
        return {
          ...state,
          reviews: {
            ...state.reviews,
            [action.payload.hotelId]: [
              ...(state.reviews[action.payload.hotelId] || []),
              {
                text: action.payload.text,
                rating: action.payload.rating,
              },
            ],
          },
        };
      default:
        return state;
    }
  };
  
  export default reviewReducer;
  