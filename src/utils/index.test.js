import { chuckPosts, filterExtraPosts } from 'utils';

describe('UTILS', () => {
  // describe('chuckPosts', () => {
  //   it('With 10s', () => {
  //     const tempArr = new Array(20).fill(1);
  //     const result = chuckPosts(tempArr);
  //     expect(Object.keys(result)).toHaveLength(2);
  //   });

  //   it('Without 10s', () => {
  //     const tempArr = new Array(15).fill(1);
  //     const result = chuckPosts(tempArr);
  //     expect(Object.keys(result)).toHaveLength(1);
  //   });
  // });

  describe('filterExtraPosts', () => {
    it('Less Than 10', () => {
      const mockResponse = {
        children: new Array(5).fill({
          data: {
            name: 'test123'
          }
        })
      };
      const response = filterExtraPosts(mockResponse);
      expect(mockResponse).toEqual(response);
    });

    it('Exact 10', () => {
      const mockResponse = {
        children: new Array(10).fill({
          data: {
            name: 'test123'
          }
        })
      };
      const response = filterExtraPosts(mockResponse);
      expect(mockResponse).toEqual(response);
    });

    it('More than 10', () => {
      const mockResponse = {
        children: new Array(11).fill({
          data: {
            name: 'test123'
          }
        })
      };
      const testResponse = {
        children: new Array(10).fill({
          data: {
            name: 'test123'
          }
        }),
        after: 'test123'
      };
      const response = filterExtraPosts(mockResponse);
      expect(testResponse).toEqual(response);
    });
  });
});
