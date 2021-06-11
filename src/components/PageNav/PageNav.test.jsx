import React from 'react';
import { mount } from 'enzyme';
import { PageNav } from 'components';

describe('<PageNav />', () => {
  it('Renders', () => {
    const wrapper = mount(<PageNav isSuccess={true}/>);
    expect(wrapper.exists()).toBe(true);
  });

  it('Renders Empty with is Success flag false', () => {
    const wrapper = mount(<PageNav isLoading={false}/>);
    console.log(wrapper)
    expect(wrapper.isEmptyRender()).toBe(true);
  });
});
