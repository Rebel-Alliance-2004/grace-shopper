import { reviewTypes } from "./actions";

const NEW_REVIEW = {
  id: "",
  userId: "",
  productId: "",
  starRating: "",
  reviewTitle: "",
  reviewText: "",
};

const reviewReducer = (state = NEW_REVIEW, action) => {
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

export default reviewReducer