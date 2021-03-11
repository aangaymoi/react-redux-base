import storeReducer, { initial } from "./Store.reducer"

describe("Store.reducer", () => {
  test("should return the initial state", () => {
    expect(storeReducer(undefined, {})).toEqual(initial)
  })

  test("should handle LOAD_STORE", () => {
    expect(
      storeReducer(initial, {
        type: "LOAD_STORE"
      })
    ).toEqual({ store: { data: [], loading: true } })
  })

  test("should handle LOAD_STORE_DONE", () => {
    expect(
      storeReducer(initial, {
        type: "LOAD_STORE_DONE",
        payload: [{ id: 0, name: "Brand" }]
      })
    ).toEqual({ store: { data: [{ id: 0, name: "Brand" }], loading: false } })
  })
})
