import React from 'react'
import { mount } from 'enzyme'
import sinon from 'sinon'

import LazyImage, { Dimensions } from './'

const mockProps = {
  src: 'welcome',
  placeholder: <div className='placeholder' />
}

describe('<LazyImage />', () => {
  test('there are multiple sources and one fallback img', () => {
    const component = mount(<LazyImage {...mockProps} />)
    expect(component.find('source').length).toBeGreaterThan(1)
    expect(component.find('img').length).toBe(1)
  })

  test('lazyload class exists for third party library', () => {
    const component = mount(<LazyImage {...mockProps} />)
    expect(component.find('img.lazyload').length).toBe(1)
  })

  test('placeholder only exists when image is loading', () => {
    const component = mount(<LazyImage {...mockProps} />)
    expect(component.find('div.placeholder').length).toBe(1)
    component.find('img').simulate('load')
    expect(component.find('div.placeholder').length).toBe(0)
  })

  test('doesn\'t reload multiple times', () => {
    const component = mount(<LazyImage {...mockProps} />)
    const spy = sinon.spy(LazyImage.prototype, 'render')
    component.find('img').simulate('load')
    component.find('img').simulate('load')
    expect(spy.calledOnce).toBe(true)
  })
})

describe('dimensional LazyImage', () => {
  test('normal 4:3 images should have 75% padding added', () => {
    const component = mount(<LazyImage {...mockProps} dimension={Dimensions.normal} />)
    expect(component.html()).toContain('padding-bottom: 75%')
  })

  test('wide 16:9 images should have 56.25% padding added', () => {
    const component = mount(<LazyImage {...mockProps} dimension={Dimensions.wide} />)
    expect(component.html()).toContain('padding-bottom: 56.25%')
  })

  test('portrait images should not have padding added', () => {
    const component = mount(<LazyImage {...mockProps} dimension={Dimensions.normal} portraitRotation='270' />)
    expect(component.html()).not.toContain('padding-bottom')
  })
})
