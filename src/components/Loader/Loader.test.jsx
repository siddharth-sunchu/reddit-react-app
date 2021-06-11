import React from 'react';
import { mount } from 'enzyme';
import { Loader } from 'components';

describe('<Loader />', () => {
  it('Renders', () => {
    const wrapper = mount(<Loader />);
    expect(wrapper.exists()).toBe(true);
  });

  it('Renders without flag', () => {
    const wrapper = mount(<Loader isLoading={true}/>);
    expect(wrapper.exists()).toBe(true);
  });
});
