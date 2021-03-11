import { fetchCategoryApi } from "./Category.service"

export const loadCategory = () => ({
  type: "LOAD_CATEGORY"
})

export const loadCategoryDone = payload => ({
  type: "LOAD_CATEGORY_DONE",
  payload
})

export const fetchCategory = () => {
  return dispatch => {
    dispatch(loadCategory())
    return fetchCategoryApi().then(data => {
      dispatch(loadCategoryDone(data))
    })
  }
}

export const selectCategory = category => ({
  type: "SELECT_CATEGORY",
  category
})
