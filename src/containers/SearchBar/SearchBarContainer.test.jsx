import React from 'react';
import { mount } from 'enzyme';
import { SearchBarContainer } from 'containers';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
// jest.mock('components', () => () => 'PostCards');
// jest.mock('components', () => () => 'Loader');
// jest.mock('components', () => () => 'PageNav');

import { mockSearchStore, mockPostStore } from 'mocks';
describe('<SearchBarContainer />', () => {
  const mockReduxStore = configureStore([thunk]);

  const store = mockReduxStore({
    posts: mockPostStore,
    search: mockSearchStore
  });

  it('Renders', () => {
    const wrapper = mount(
      <Provider store={store}>
        <SearchBarContainer />
      </Provider>
    );
    expect(wrapper.exists()).toBe(true);
  });
});
