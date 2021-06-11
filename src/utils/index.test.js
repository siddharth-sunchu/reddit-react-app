import { chuckPosts } from 'utils';

describe('UTILS', () => {
  describe('chuckPosts', () => {
    it('With 10s', () => {
      const tempArr = new Array(20).fill(1);
      const result = chuckPosts(tempArr);
      expect(Object.keys(result)).toHaveLength(2);
    });

    it('Without 10s', () => {
      const tempArr = new Array(15).fill(1);
      const result = chuckPosts(tempArr);
      expect(Object.keys(result)).toHaveLength(1);
    });
  });
});
