import React from 'react'
import { shallow } from 'enzyme'
import sinon from 'sinon'

import HomePage from './'

describe('<HomePage />', () => {
  test('table of contents is not fixed while banner is partially in view', () => {
    const component = shallow(<HomePage />)
    component.instance().handleBannerInView(true)
    expect(component.find({ sidebarFixed: false }).length).toBe(1)
  })

  test('table of contents is fixed while banner is not in view', () => {
    const component = shallow(<HomePage />)
    component.instance().handleBannerInView(false)
    expect(component.find('TableOfContents[sidebarFixed]').length).toBe(1)
  })

  test('is not rendered twice', () => {
    const component = shallow(<HomePage />)
    const spy = sinon.spy(HomePage.prototype, 'render')
    component.instance().handleBannerInView(false)
    component.instance().handleBannerInView(false)
    expect(spy.calledOnce).toBe(true)
  })
})
