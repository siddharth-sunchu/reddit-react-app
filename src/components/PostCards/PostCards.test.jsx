import React from 'react';
import { mount } from 'enzyme';
import { PostCards } from 'components';
import { mockDataAPI } from 'mocks';

describe('<PostCards />', () => {
  it('Renders', () => {
      const mockPostData = mockDataAPI[1].children
    const wrapper = mount(<PostCards postData={mockPostData} resultTerm={'test'} />);
    expect(wrapper.exists()).toBe(true);
  });
});
