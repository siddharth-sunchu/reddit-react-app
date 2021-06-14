import React from 'react';
import { mount } from 'enzyme';
import { DefaultLayout } from 'layouts';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
// jest.mock('components', () => () => 'PostCards');
// jest.mock('components', () => () => 'Loader');
// jest.mock('components', () => () => 'PageNav');

import { mockSearchStore, mockPostStore } from 'mocks';
describe('<PostsContainer />', () => {
  const mockReduxStore = configureStore([thunk]);

  const store = mockReduxStore({
    posts: mockPostStore,
    search: mockSearchStore
  });

  it('Renders', () => {
    const wrapper = mount(
      <Provider store={store}>
        <DefaultLayout />
      </Provider>
    );
    expect(wrapper.exists()).toBe(true);
  });
});
