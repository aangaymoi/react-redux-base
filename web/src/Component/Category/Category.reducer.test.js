import categoryReducer, { initial } from "./Category.reducer"

describe("Category.reducer", () => {
  test("should return the initial state", () => {
    expect(categoryReducer(undefined, {})).toEqual(initial)
  })

  test("should handle LOAD_CATEGORY", () => {
    expect(
      categoryReducer(initial, {
        type: "LOAD_CATEGORY"
      })
    ).toEqual({
      category: {
        data: [],
        loading: true,
        active: {
          id: 0,
          name: "Popular"
        }
      }
    })
  })

  test("should handle LOAD_CATEGORY_DONE", () => {
    expect(
      categoryReducer(initial, {
        type: "LOAD_CATEGORY_DONE",
        payload: [{ id: 0, name: "Popular" }]
      })
    ).toEqual({
      category: {
        data: [{ id: 0, name: "Popular" }],
        loading: false,
        active: {
          id: 0,
          name: "Popular"
        }
      }
    })
  })

  test("should handle SELECT_CATEGORY", () => {
    expect(
      categoryReducer(initial, {
        type: "SELECT_CATEGORY",
        category: { id: 1, name: "Other" }
      })
    ).toEqual({
      category: {
        data: [],
        loading: false,
        active: { id: 1, name: "Other" }
      }
    })
  })
})
