import { reviewTypes } from "./actions";

const NEW_REVIEW = {
  id: "",
  userId: "",
  productId: "",
  starRating: "",
  reviewTitle: "",
  reviewText: "",
};

export const reviewReducer = (state = NEW_REVIEW, action) => {
  switch (action.type) {
    case reviewTypes.CREATE_REVIEW:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
}

export const getReviewsReducer = (state = [], action) => {
  switch (action.type) {
    case reviewTypes.GET_REVIEWS:
      return action.payload
    default:
      return state;
  }
}


