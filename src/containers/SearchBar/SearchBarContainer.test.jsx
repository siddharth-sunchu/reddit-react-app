import React from 'react';
import { mount } from 'enzyme';
import { SearchBarContainer } from 'containers';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import * as api from 'api/posts/fetchPosts';
import * as utils from 'utils';

import { mockSearchStore, mockPostStore } from 'mocks';
describe('<SearchBarContainer />', () => {
  const mockReduxStore = configureStore([thunk]);

  const store = mockReduxStore({
    posts: mockPostStore,
    search: mockSearchStore
  });

  it('Renders', () => {
    const store = mockReduxStore({
      posts: mockPostStore,
      search: mockSearchStore
    });
    const wrapper = mount(
      <Provider store={store}>
        <SearchBarContainer />
      </Provider>
    );
    expect(wrapper.exists()).toBe(true);
  });

  it('On Click Button action', () => {
    const store = mockReduxStore({
      posts: mockPostStore,
      search: mockSearchStore
    });

    const wrapper = mount(
      <Provider store={store}>
        <SearchBarContainer />
      </Provider>
    );
    const button = wrapper.find('button');
    button.simulate('click');
    const expectedActions = [
      { type: 'CLEAR_POSTS' },
      { type: 'IS_LOADING' },
      { type: 'SET_RESULT_TERM', payload: '' }
    ];
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('On Change action', () => {
    const store = mockReduxStore({
      posts: mockPostStore,
      search: mockSearchStore
    });

    const wrapper = mount(
      <Provider store={store}>
        <SearchBarContainer />
      </Provider>
    );
    const input = wrapper.find('input');
    input.simulate('change', {
      target: {
        value: 'test'
      }
    });
    const expectedActions = [
      { type: 'CLEAR_POSTS' },
      { type: 'SET_RESULT_TERM', payload: '' },
      { type: 'UPDATE_SEARCH_TERM', payload: 'test' }
    ];

    expect(store.getActions()).toEqual(expectedActions);
  });
});
