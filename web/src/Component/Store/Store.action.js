import { fetchStoreApi } from "./Store.service"

export const loadStore = () => ({
  type: "LOAD_STORE"
})

export const loadStoreDone = payload => ({
  type: "LOAD_STORE_DONE",
  payload
})

export const fetchStore = categoryId => {
  return dispatch => {
    dispatch(loadStore())
    return fetchStoreApi(categoryId).then(data => {
      dispatch(loadStoreDone(data))
    })
  }
}
