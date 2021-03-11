import React from "react"
import { mount } from "enzyme"
import toJson from "enzyme-to-json"
import Category from "./Category"

const category = {
  data: [],
  active: {
    id: 0,
    name: `Popular`
  },
  loading: false
}

const actions = {
  fetchCategory: jest.fn(),
  selectCategory: jest.fn()
}

describe("Store", () => {
  it("renders correctly", () => {
    const wrapper = mount(<Category category={category} actions={actions} />)
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})
