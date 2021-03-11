import configureMockStore from "redux-mock-store"
import thunk from "redux-thunk"

import * as actions from "./Store.action"
import * as services from "./Store.service"

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe("Store.action", () => {
  afterAll(() => {
    jest.restoreAllMocks()
  })

  test("loadStore should create an action correctly", () => {
    const expected = {
      type: "LOAD_STORE"
    }
    expect(actions.loadStore()).toEqual(expected)
  })

  test("loadStoreDone should create an action correctly", () => {
    const expected = {
      type: "LOAD_STORE_DONE",
      payload: {}
    }
    expect(actions.loadStoreDone({})).toEqual(expected)
  })

  test("fetchStore should create an action correctly", () => {
    const expected = [
      {
        type: "LOAD_STORE"
      },
      {
        type: "LOAD_STORE_DONE",
        payload: []
      }
    ]
    const store = mockStore()
    services.fetchStoreApi = jest.fn().mockResolvedValue([])

    return store.dispatch(actions.fetchStore(0)).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual(expected)
    })
  })
})
