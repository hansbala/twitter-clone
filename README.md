#  Assignment3

  

##  Project Description

This project is a twitter clone built with `Vue.js`. It supports the following features:
 - It fetches tweets from an AWS server provided to us in the handout and displays them in a human-readable format in the feed.
 - It supports lazy fetching of tweets by detecting when the user scrolls to the bottom of the webpage and fetches new tweets.
 - The web app also allows one to write tweets and tweet it. Currently, the project does not support the tweet to persist over page refreshes. Once the page is refreshed, the tweet that the user tweeted disappears.
 
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
	The router is then imported into the app. This allows the app to define `"routes"` which links to the navbar in the top component structure in `Header.js`
	
- `CreateTweet.js`
	The `CreateTweetComponent` is responsible for handling adding new tweets to the twitter feed. Once a user enters a tweet and the "Submit" button is clicked, the Vue engine emits a `create-tweet` event on the `EventBus`. This `create-tweet` event is then listened for in the `FeedComponent` which appropriately adds a tweet given the parameters.

- `FeedComponent.js`
	The `FeedComponent` is responsible for everything related to the feed including but not limited to:
	* Fetching new tweets from the AWS API server provided to us.
	* Updating the `DOM` to reflect new tweets
	* Handling search functionality. (Note: although the search is implemented separately as a `SearchComponent`, the actual searching of the tweets is done in the `FeedComponent`)
	* Adding user-made tweets to the `DOM`. (Again, while the `CreateTweetComponent` is the actual component, the handling of adding new tweets is done in the `FeedComponent`)
	* The lazy fetching of tweets to detect if the page has scrolled all the way to the bottom is implemented in the `FeedComponent`.

- `Search.js`
	This implements the search bar in which the user using the web app can search for both user-made tweets as well as the tweets fetched from the AWS server. A brief breakdown of how this works is as follows:
	* As the user enters characters to search for in the search bar, the Vue engine constantly emits a `'search-query'` emmission globally, and sends the text the user entered along with the emmission. This is then being listened for in the `FeedComponent` which implements the search functionality. 

- `TweetComponent.js`
	This component is responsible for rendering each individual tweet on the `DOM`. This is implemented using props and the `FeedComponent` uses the `v-for` directive for iterating over all tweets and binds all the necessary data which is then passed to the `TweetComponent` as props. This renders the passed props into the `HTML` template.

- `Header.js`
	This is essentially our navbar which also uses `<router-link>` in its template to implement the Vue routing functionality. This component consists mostly of just static code. 

- `tic-tac-toe.js`
	This file implements all the functionality that is required from the prelab and implements it in here. When the Vue router is directed to the Tic Tac Toe game, the Vue engine takes the `game` and places it into the `<router-view>` which can be seen in our `App.js`

We must also mention here that our project directory also includes a `madlibs` folder which implements the functionality required of our madlibs lab.

## Known Bugs
* None :')

## References
In order to implement just a few functions, online resources were consulted. Here are the functions along with their references:
* `uuidv4()` 
	A function that returns a random `UUID` when called.
	Reference: [Generate a UUID](https://stackoverflow.com/a/2117523)
* In addition to the above, extensive use of the Vue JS docs were made. Here is the link to the Vue JS docs: [Vue.js](https://vuejs.org/v2/guide/)
