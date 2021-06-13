import React from 'react';
import { mount } from 'enzyme';
import { PostCards } from 'components';
import { mockDataForPostCards } from 'mocks';

describe('<PostCards />', () => {
  it('Renders', () => {
      const mockPostData = mockDataForPostCards.children
    const wrapper = mount(<PostCards postData={mockPostData} resultTerm={'test'} />);
    expect(wrapper.exists()).toBe(true);
  });
});
