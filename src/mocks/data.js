export const mockDataAPI = {
  data1: {
    children: new Array(10).fill({
      data: {
        id: 1,
        title: 'test',
        url: 'https:test.com',
        num_comments: 10,
        permalink: 'test',
        ups: 1,
        downs: 2,
        created_utc: '2020-10-01',
        author: 'sid'
      }
    }),
    after: 2
  },

  data2: {
    children: new Array(10).fill({
      data: {
        id: 2,
        title: 'test2',
        url: 'https:test.com',
        num_comments: 10,
        permalink: 'test',
        ups: 1,
        downs: 2,
        created_utc: '2020-10-01',
        author: 'sid'
      }
    }),
    after: 3
  },

  data3: {
    children: new Array(10).fill({
      data: {
        id: 3,
        title: 'test3',
        url: 'https:test.com',
        num_comments: 10,
        permalink: 'test',
        ups: 1,
        downs: 2,
        created_utc: '2020-10-01',
        author: 'sid'
      }
    }),
    after: 3
  }
};
