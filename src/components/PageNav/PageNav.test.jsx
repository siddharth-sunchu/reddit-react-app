import React from 'react';
import { mount } from 'enzyme';
import { PageNav } from 'components';

describe('<PageNav />', () => {
  it('Renders', () => {
    const wrapper = mount(<PageNav isSuccess={true} changePrev={jest.fn()} changeNext={jest.fn()} />);
    expect(wrapper.exists()).toBe(true);
  });

  it('Renders Empty with is Success flag false', () => {
    const wrapper = mount(<PageNav isSuccess={false} changePrev={jest.fn()} changeNext={jest.fn()} />);
    expect(wrapper.isEmptyRender()).toBe(true);
  });
});
