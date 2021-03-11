import { data, fetchStoreApi } from "./Store.service"

describe("Store.service", () => {
  test("fetchStoreApi method", async done => {
    const actual = await fetchStoreApi(0)
    expect(actual).toEqual(data.filter(elm => elm.categoryId === 0))
    done()
  })
})
