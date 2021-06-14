import reducer, {
  initialState,
  updateSearchTerm,
  setResultTerm,
  onChangeInputValue,
  changeResultTerm
} from './search';

import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { mockSearchStore, mockPostStore } from 'mocks';

describe('Search Reducer', () => {
  describe('ACTIONS', () => {
    it('updateSearchTerm', () => {
      const actionObj = updateSearchTerm('test');
      expect(actionObj).toEqual({ type: 'UPDATE_SEARCH_TERM', payload: 'test' });
    });

    it('setResultTerm', () => {
      const actionObj = setResultTerm('test');
      expect(actionObj).toEqual({ type: 'SET_RESULT_TERM', payload: 'test' });
    });
  });

  describe('Actions Creators and Middleware', () => {
    const mockReduxStore = configureMockStore([thunk]);

    it('onChangeInputValue', async () => {
      const store = mockReduxStore({
        search: mockSearchStore
      });

      await store.dispatch(onChangeInputValue('test'));
      const expectedActions = [{ type: 'UPDATE_SEARCH_TERM', payload: 'test' }];
      expect(store.getActions()).toEqual(expectedActions);
    });

    it('changeResultTerm', async () => {
      const store = mockReduxStore({
        search: mockSearchStore
      });

      await store.dispatch(changeResultTerm('test'));
      const expectedActions = [{ type: 'SET_RESULT_TERM', payload: 'test' }];
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  describe('Reducer', () => {
    it('default state', () => {
      const defaultState = reducer(undefined, {});
      expect(defaultState).toEqual(initialState);
    });

    it('UPDATE_SEARCH_TERM', () => {
      const defaultState = reducer(
        { ...initialState },
        { type: 'UPDATE_SEARCH_TERM', payload: 'test' }
      );
      expect(defaultState).toEqual({ ...initialState, searchTerm: 'test' });
    });

    it('SET_RESULT_TERM', () => {
      const defaultState = reducer(
        { ...initialState },
        { type: 'SET_RESULT_TERM', payload: 'test' }
      );
      expect(defaultState).toEqual({ ...initialState, resultTerm: 'test' });
    });
  });
});
