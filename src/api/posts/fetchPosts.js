const fetchPosts = async (subRedditValue, id) => {

    const API_URL = 'https://www.reddit.com/r/';
    try {
        let apiUrl = `${API_URL}${subRedditValue}.json?limit=10${(id) ? `&after=${id}` : ''}`;
        const postList = await fetch(apiUrl);
        return await postList.json();
    } catch(error) {
        throw error;
    }
};

export default fetchPosts;

