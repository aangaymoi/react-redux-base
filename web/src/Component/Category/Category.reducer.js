import _ from "lodash/fp"

const active = JSON.parse(window.localStorage.getItem("category.pin"))

export const initial = {
  category: {
    data: [],
    loading: false,
    active: active
      ? active
      : {
          id: 0,
          name: "Popular"
        }
  }
}

export default function categoryReducer(state = initial, action) {
  switch (action.type) {
    case "LOAD_CATEGORY":
      return _.merge(state, { category: { loading: true } })
    case "LOAD_CATEGORY_DONE":
      const pin = JSON.parse(window.localStorage.getItem("category.pin"))

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
        category: {
          data: action.payload,
          loading: false,
          active: active ? active : initial.category.active
        }
      })
    case "SELECT_CATEGORY":
      window.localStorage.setItem(
        "category.pin",
        JSON.stringify(action.category)
      )
      return _.merge(state, {
        category: {
          active: action.category
        }
      })
    default:
      return state
  }
}
