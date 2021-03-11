import configureMockStore from "redux-mock-store"
import thunk from "redux-thunk"

import * as actions from "./Category.action"
import * as services from "./Category.service"

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe("Category.action", () => {
  afterAll(() => {
    jest.restoreAllMocks()
  })

  test("loadCategory should create an action correctly", () => {
    const expected = {
      type: "LOAD_CATEGORY"
    }
    expect(actions.loadCategory()).toEqual(expected)
  })

  test("loadCategoryDone should create an action correctly", () => {
    const expected = {
      type: "LOAD_CATEGORY_DONE",
      payload: {}
    }
    expect(actions.loadCategoryDone({})).toEqual(expected)
  })

  test("fetchCategory should create an action correctly", () => {
    const expected = [
      {
        type: "LOAD_CATEGORY"
      },
      {
        type: "LOAD_CATEGORY_DONE",
        payload: []
      }
    ]

    const store = mockStore()
    services.fetchCategoryApi = jest.fn().mockResolvedValue([])

    return store.dispatch(actions.fetchCategory()).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual(expected)
    })
  })

  test("selectCategory should create an action correctly", () => {
    const expected = {
      type: "SELECT_CATEGORY",
      category: {}
    }
    expect(actions.selectCategory({})).toEqual(expected)
  })
})
