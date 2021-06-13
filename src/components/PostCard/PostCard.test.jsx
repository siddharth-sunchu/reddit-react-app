import React from 'react';
import { mount } from 'enzyme';
import { PostCard } from 'components';
import { mockDataAPI } from 'mocks';

describe('<PostCard />', () => {

  it('Renders', () => {
    const mockProps = {
        ...mockDataAPI[1].children[0].data
    };
    const wrapper = mount(<PostCard {...mockProps}/>);
    const upvoteText = wrapper.find('.card-body > p > span');
    expect(wrapper.exists()).toBe(true);
    expect("vote").toEqual(upvoteText.first().text().split(' ').pop());
    expect('votes').toEqual(upvoteText.last().text().split(' ').pop());
  });

  it('Passing upvote count as 1', () => {
    const mockProps = {
      ...mockDataAPI[2].children[0].data
  };
  const wrapper = mount(<PostCard {...mockProps}/>);
  const upvoteText = wrapper.find('.card-body > p > span');
  expect("votes").toEqual(upvoteText.first().text().split(' ').pop());
  expect('vote').toEqual(upvoteText.last().text().split(' ').pop());
  });
});
