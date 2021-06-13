export const mockDataAPI = {
  1: {
    children: [
      {
        data: {
          id: 1,
          title: 'test',
          commentsUrl: 'https:test.com',
          commentsNumber: 10,
          titleUrl: 'test',
          upVotes: 1,
          downVotes: 2,
          created: 12345,
          author: 'sid'
        }
      },
      {
        data: {
          id: 2,
          title: 'test',
          commentsUrl: 'https:test.com',
          commentsNumber: 10,
          titleUrl: 'test',
          upVotes: 1,
          downVotes: 2,
          created: new Date('2020-10-01'),
          author: 'sid'
        }
      }
    ],
    after: 2
  },

  2: {
    children: new Array(10).fill({
      data: {
        id: 2,
        title: 'test',
        commentsUrl: 'https:test.com',
        commentsNumber: 10,
        titleUrl: 'test',
        upVotes: 2,
        downVotes: 1,
        created: 12345,
        author: 'sid'
      }
    }),
    after: 3
  },

  3: {
    children: new Array(10).fill({
      data: {
        id: 3,
        title: 'test',
        commentsUrl: 'https:test.com',
        commentsNumber: 10,
        titleUrl: 'test',
        upVotes: 1,
        downVotes: 2,
        created: new Date('2020-10-01'),
        author: 'sid'
      }
    }),
    after: 3
  }
};

export const mockDataForPostCards = {
  children: [
    {
      data:     {
        id: 1,
        title: '',
        url: '',
        num_comments: 1,
        permalink: '',
        ups: 1,
        downs: 1,
        created_utc: 1,
        author: ''
      }
    }

  ]

};

export const mockPostStore = {
  error: false,
  success: false,
  loading: false,
  currentPosts: [],
  pages: { 1: mockDataForPostCards.children },
  afterId: null,
  pageNum: 1
};

export const mockSearchStore = {
  searchTerm: '',
  resultTerm: ''
};


