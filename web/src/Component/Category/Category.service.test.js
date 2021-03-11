import { data, fetchCategoryApi } from "./Category.service"

describe("Category.service", () => {
  test("fetchCategoryApi method", async done => {
    const actual = await fetchCategoryApi()
    expect(actual).toEqual(data)
    done()
  })
})
