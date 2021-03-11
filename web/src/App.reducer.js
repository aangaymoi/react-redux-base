import { combineReducers } from "redux"

import categoryReducer from "./Component/Category/Category.reducer"
import storeReducer from "./Component/Store/Store.reducer"

const reducer = combineReducers({
  categoryReducer,
  storeReducer
})

export default reducer
