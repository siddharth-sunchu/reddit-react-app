# Reddit Post app

This react app fetch recent sub reddit post from Reddit API and display 10 posts at a time with page navigation for back and forth. It uses bootstrap for CSS Styling so therefore I haven't used any CSS files. I have covered most of the test cases for all the files.

# Sticked Posts
For some of the the sub reddit's, the api sends some sticked post which has a flag in the response, so to show only 10 post at a time, I am filtering the response and removing the rest of the data.

## Available Scripts

In the project directory, you can run:

### `npm start` - to start the application

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test` - it will run the test scripts and shows the coverage as well.


## Another Approach

- Fetch 100 posts at a time and create chucks of 10 and store it in a hashMap. So it will only fetch more 100 posts when user goes beyond 10 pages.
