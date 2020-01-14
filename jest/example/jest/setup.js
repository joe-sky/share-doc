import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { JSDOM } from 'jsdom'

const jsdom = new JSDOM(`<!doctype html><html><body></body></html>`)
const { window } = jsdom

window.LsLayout = ({ children }) => children

function copyProps(src, target) {
  const props = Object.getOwnPropertyNames(src)
    .filter(prop => typeof target[prop] === 'undefined')
    .reduce(
      (result, prop) => ({
        ...result,
        [prop]: Object.getOwnPropertyDescriptor(src, prop),
      }),
      {},
    )
  Object.defineProperties(target, props)
}

global.window = window
global.document = window.document
copyProps(window, global)

Enzyme.configure({ adapter: new Adapter() })