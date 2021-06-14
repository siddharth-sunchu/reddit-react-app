import reducer, {
  addPageNum,
  subtractPageNum,
  setRecentPosts,
  fetchError,
  isLoading,
  fetchSuccess,
  setAfterID,
  nextPage,
  prevPage,
  fetchRecentPosts,
  initialState
} from './posts';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { mockSearchStore, mockPostStore } from 'mocks';
import * as api from 'api/posts/fetchPosts';
import * as utils from 'utils';
describe('Reducers - Posts', () => {
  describe('ACTIONS', () => {
    it('addPageNum', () => {
      const actionObj = addPageNum();
      expect(actionObj).toEqual({ type: 'ADD_PAGE_NUM' });
    });

    it('subtractPageNum', () => {
      const actionObj = subtractPageNum();
      expect(actionObj).toEqual({ type: 'SUBTRACT_PAGE_NUM' });
    });

    it('setRecentPosts', () => {
      const actionObj = setRecentPosts([], 1);
      expect(actionObj).toEqual({ type: 'FETCH_POSTS', payload: { posts: [], pageNum: 1 } });
    });

    it('fetchError', () => {
      const actionObj = fetchError();
      expect(actionObj).toEqual({ type: 'FETCH_ERROR' });
    });

    it('isLoading', () => {
      const actionObj = isLoading();
      expect(actionObj).toEqual({ type: 'IS_LOADING' });
    });

    it('fetchSuccess', () => {
      const actionObj = fetchSuccess();
      expect(actionObj).toEqual({ type: 'FETCH_SUCCESS' });
    });

    it('setAfterID', () => {
      const actionObj = setAfterID(1);
      expect(actionObj).toEqual({ type: 'SET_AFTER_ID', payload: 1 });
    });
  });

  describe('Action creators and middleware', () => {
    const mockReduxStore = configureMockStore([thunk]);

    describe('nextPage', () => {
      it('without new page', async () => {
        const store = mockReduxStore({
          posts: mockPostStore
        });

        await store.dispatch(nextPage());
        const expectedActions = [{ type: 'ADD_PAGE_NUM' }];
        expect(store.getActions()).toEqual(expectedActions);
      });
      it('with new page', async () => {
        const newMockPostStore = { ...mockPostStore, pageNum: 2 };
        const store = mockReduxStore({
          posts: newMockPostStore,
          search: mockSearchStore
        });
        const mockFetchPosts = jest.spyOn(api, 'fetchPosts');
        mockFetchPosts.mockImplementation(() => {
          return { data: true };
        });
        const mockFilterExtraPosts = jest.spyOn(utils, 'filterExtraPosts');
        mockFilterExtraPosts.mockImplementation(() => {
          return { children: true, after: true };
        });
        await store.dispatch(nextPage());
        const expectedActions = [
          { type: 'ADD_PAGE_NUM' },
          { type: 'IS_LOADING' },
          { type: 'FETCH_SUCCESS' },
          { type: 'FETCH_POSTS', payload: { posts: true, pageNum: 2 } },
          { type: 'SET_AFTER_ID', payload: true }
        ];
        expect(store.getActions()).toEqual(expectedActions);
      });
    });

    describe('prevPage', () => {
      it('PageNum more than 1', async () => {
        const newMockPostStore = { ...mockPostStore, pageNum: 2 };
        const store = mockReduxStore({
          posts: newMockPostStore
        });
        await store.dispatch(prevPage());
        const expectedActions = [{ type: 'SUBTRACT_PAGE_NUM' }];
        expect(store.getActions()).toEqual(expectedActions);
      });

      it('Page Num as 1', async () => {
        const newMockPostStore = { ...mockPostStore, pageNum: 1 };
        const store = mockReduxStore({
          posts: newMockPostStore
        });
        await store.dispatch(prevPage());
        const expectedActions = [];
        expect(store.getActions()).toEqual(expectedActions);
      });
    });

    describe('fetchRecentPosts', () => {
      it('Without loading new posts', async () => {
        const newMockPostStore = { ...mockPostStore, pageNum: 1, afterId: true };
        const store = mockReduxStore({
          posts: newMockPostStore,
          search: mockSearchStore
        });
        await store.dispatch(fetchRecentPosts());
        const expectedActions = [{ type: 'IS_LOADING' }];
        expect(store.getActions()).toEqual(expectedActions);
      });

      it('With loading new posts', async () => {
        const newMockPostStore = { ...mockPostStore, pageNum: 2, afterId: null };
        const mockFetchPosts = jest.spyOn(api, 'fetchPosts');
        mockFetchPosts.mockImplementation(() => {
          return { data: true };
        });
        // fetchPosts = jest.fn().mockReturnValue({ someObjectProperty: 42 });
        const mockFilterExtraPosts = jest.spyOn(utils, 'filterExtraPosts');
        mockFilterExtraPosts.mockImplementation(() => {
          return { children: true, after: true };
        });
        const store = mockReduxStore({
          posts: newMockPostStore,
          search: mockSearchStore
        });
        await store.dispatch(fetchRecentPosts());
        const expectedActions = [
          { type: 'IS_LOADING' },
          { type: 'FETCH_SUCCESS' },
          { type: 'FETCH_POSTS', payload: { posts: true, pageNum: 2 } },
          { type: 'SET_AFTER_ID', payload: true }
        ];
        expect(store.getActions()).toEqual(expectedActions);
      });

      it('Error', async () => {
        const newMockPostStore = { ...mockPostStore, pageNum: 2, afterId: null };
        const mockFetchPosts = jest.spyOn(api, 'fetchPosts');
        mockFetchPosts.mockImplementation(() => {
          throw new Error('Testing');
        });
        const store = mockReduxStore({
          posts: newMockPostStore,
          search: mockSearchStore
        });
        await store.dispatch(fetchRecentPosts());
        const expectedActions = [{ type: 'IS_LOADING' }, { type: 'FETCH_ERROR' }];
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
  });

  describe('Reducer', () => {
    it('default state', () => {
      const defaultState = reducer(undefined, {});
      expect(defaultState).toEqual(initialState);
    });

    describe('SUBTRACT_PAGE_NUM', () => {
      it('More than 1', () => {
        const defaultState = reducer(
          { ...initialState, pageNum: 2 },
          { type: 'SUBTRACT_PAGE_NUM' }
        );
        expect(defaultState).toEqual(initialState);
      });

      it('Page num 1', () => {
        const defaultState = reducer({ ...initialState }, { type: 'SUBTRACT_PAGE_NUM' });
        expect(defaultState).toEqual(initialState);
      });
    });

    it('ADD_PAGE_NUM', () => {
      const defaultState = reducer({ ...initialState }, { type: 'ADD_PAGE_NUM' });
      expect(defaultState).toEqual({ ...initialState, pageNum: 2 });
    });

    it('SET_AFTER_ID', () => {
      const defaultState = reducer({ ...initialState }, { type: 'SET_AFTER_ID', payload: 123 });
      expect(defaultState).toEqual({ ...initialState, afterId: 123 });
    });

    it('IS_LOADING', () => {
      const defaultState = reducer({ ...initialState }, { type: 'IS_LOADING' });
      expect(defaultState).toEqual({ ...initialState, loading: true });
    });

    it('FETCH_SUCCESS', () => {
      const defaultState = reducer({ ...initialState }, { type: 'FETCH_SUCCESS' });
      expect(defaultState).toEqual({
        ...initialState,
        loading: false,
        success: true,
        error: false
      });
    });

    it('FETCH_ERROR', () => {
      const defaultState = reducer({ ...initialState }, { type: 'FETCH_ERROR' });
      expect(defaultState).toEqual({ ...initialState, error: true });
    });

    it('FETCH_POSTS', () => {
      const defaultState = reducer(
        { ...initialState },
        { type: 'FETCH_POSTS', payload: { posts: true, pageNum: 1 } }
      );
      expect(defaultState).toEqual({ ...initialState, pages: { 1: true } });
    });
  });
});
