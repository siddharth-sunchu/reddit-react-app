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
    expect(' 1   up vote').toEqual(upvoteText.first().text());
    expect(' 2  down votes').toEqual(upvoteText.last().text());
  });

  it('Passing upvote count as 1', () => {
    const mockProps = {
      ...mockDataAPI[2].children[0].data
  };
  const wrapper = mount(<PostCard {...mockProps}/>);
  const upvoteText = wrapper.find('.card-body > p > span');
  expect(' 2   up votes').toEqual(upvoteText.first().text());
  expect(' 1  down vote').toEqual(upvoteText.last().text());
  });
});
