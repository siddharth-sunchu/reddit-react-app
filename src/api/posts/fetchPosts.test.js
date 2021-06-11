import { fetchPosts } from 'api';
import { mockDataAPI } from 'mocks';

describe('Fetch Post API', () => {
  window.fetch = jest.fn();

  it('Success Response without ID', async () => {
    window.fetch.mockImplementation((apiUrl) => {
      expect(apiUrl).toEqual('https://www.reddit.com/r/test.json?limit=10');
      return Promise.resolve({
        json() {
          return {
            ...mockDataAPI['1']
          };
        }
      });
    });

    const fetchResponse = await fetchPosts('test');
    expect(fetchResponse.after).toBe(2);
    expect(fetchResponse.children).toHaveLength(10);
  });

  it('Success Response with ID', async () => {
    window.fetch.mockImplementation((apiUrl) => {
      expect(apiUrl).toEqual('https://www.reddit.com/r/test.json?limit=10&after=1');
      return Promise.resolve({
        json() {
          return {
            ...mockDataAPI['1']
          };
        }
      });
    });

    const fetchResponse = await fetchPosts('test', 1);
    expect(fetchResponse.after).toBe(2);
    expect(fetchResponse.children).toHaveLength(10);
  });

  it('Error Response', async () => {
    window.fetch = jest.fn();
    window.fetch.mockImplementation(() => {
      throw new Error('Testing');
    });
    try {
      const fetchResponse = await fetchPosts('test');
      console.log(fetchResponse, '*****TESTING******');
      expect(fetchResponse.message).toEqual('Testing');
    } catch (error) {
      expect(error.message).toEqual('Testing');
    }
  });
});
