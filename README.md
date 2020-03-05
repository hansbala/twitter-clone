#  Assignment3

  

##  Project Description

This project is a twitter clone built with `Vue.js`. It supports the following features:
 - It fetches tweets from an AWS server provided to us in the handout and displays them in a human-readable format in the feed.
 - It supports lazy fetching of tweets by detecting when the user scrolls to the bottom of the webpage and fetches new tweets.
 - The web app also allows one to write tweets and tweet it. Currently, the project does not support the tweet to persist over page refreshes. Once the page is refreshed, the tweet that the user tweeted disappears.
 - 
Different components were made for different parts of the project which are discussed more below.
  

###  Component Structure
- `App.js` 
	The entry point of our App which is mounted onto the `div` with the `id` of 		`app`. This imports all other components used to develop the app which are talked about more below. The router requires special mention here. We define certain routes and a router as defined below:
	```javascript
	const  routes  =  [
		{ path:  '/tictactoe', component:  TicTacToe  },
		{ path:  '/madlibs', component:  MadLibComponent  },
	]
	const  router  =  new  VueRouter({
	routes
	})
	```
	The router is then imported into the app. This allows the app to define `"routes"` which 
