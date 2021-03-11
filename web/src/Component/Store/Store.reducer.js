import _ from "lodash/fp"

export const initial = { store: { data: [], loading: false } }

export default function storeReducer(state = initial, action) {
  switch (action.type) {
    case "LOAD_STORE":
      return _.merge(state, { store: { loading: true } })
    case "LOAD_STORE_DONE":
      const pin = JSON.parse(window.localStorage.getItem("store.pin"))

      let item = undefined
      if (pin && pin.id) {
        item = action.payload.splice(
          _.findIndex({ id: pin.id }, action.payload),
          1
        )[0]
      }

      if (item) {
        action.payload.splice(0, 0, item)
      }

      return _.merge(state, {
        store: { data: action.payload, loading: false }
      })
    default:
      return state
  }
}
