import React from "react"
import { mount } from "enzyme"
import toJson from "enzyme-to-json"
import Store from "./Store"

const store = {
  data: [],
  loading: false
}

const category = {
  data: [],
  active: {
    id: 0,
    name: `Popular`
  }
}

const actions = {
  fetchStore: jest.fn()
}

describe("Store", () => {
  test("renders correctly", () => {
    const wrapper = mount(
      <Store store={store} category={category} actions={actions} />
    )
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})
