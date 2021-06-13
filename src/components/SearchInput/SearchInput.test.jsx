import React from 'react';
import { mount } from 'enzyme';
import { SearchInput } from 'components';

describe('<SearchInput />', () => {
  it('Renders', () => {
    const wrapper = mount(<SearchInput><div></div></SearchInput>);
    expect(wrapper.exists()).toBe(true);
  });
});
