import React from 'react';
import { mount } from 'enzyme';
import { Loader } from 'components';

describe('<Loader />', () => {
  it('Renders', () => {
    const wrapper = mount(<Loader><div></div></Loader>);
    expect(wrapper.exists()).toBe(true);
  });

  it('Renders without flag', () => {
    const wrapper = mount(<Loader isLoading={true}><div></div></Loader>);
    expect(wrapper.exists()).toBe(true);
  });
});
