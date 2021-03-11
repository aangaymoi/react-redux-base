import { applyMiddleware, createStore } from "redux"
import { composeWithDevTools } from "redux-devtools-extension/logOnlyInProduction"

import thunk from "redux-thunk"

import reducer from "./App.reducer"

const composeEnhancers = composeWithDevTools({
  // options like actionSanitizer, stateSanitizer
})

const enhancer = composeEnhancers(
  applyMiddleware(thunk)
  // other store enhancers if any
)

let store = createStore(reducer, enhancer)

export default store
