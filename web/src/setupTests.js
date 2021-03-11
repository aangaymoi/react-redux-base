import { configure } from "enzyme"
import Adapter from "enzyme-adapter-react-16"

// react-testing-library renders your components to document.body,
// this will ensure they're removed after each test.
import "@testing-library/react/cleanup-after-each"
// this adds jest-dom's custom assertions
import "@testing-library/jest-dom/extend-expect"

configure({ adapter: new Adapter() })

const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn()
}
global.localStorage = localStorageMock
