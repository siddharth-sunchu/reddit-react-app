import React from 'react';
import { mount } from 'enzyme';
import { SearchButton } from 'components';

describe('<SearchButton />', () => {
  it('Renders', () => {
    const wrapper = mount(<SearchButton onClick={jest.fn()}/>);
    expect(wrapper.exists()).toBe(true);
  });

});
