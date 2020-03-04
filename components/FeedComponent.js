import TweetComponent from './TweetComponent.js';
import { EventBus } from './EventBus.js';

export default {
    data() {
        return {
            // Get >= 25 tweets to implement lazy loading
            fetch_url: 'http://ec2-54-172-96-100.compute-1.amazonaws.com/feed/random?q=noodle&size=15',
            masterIDs: null,
            masterTweets: [],
            displayTweets: [],
            searchOn: false,
        }
    },
    components: {
        'tweet-component': TweetComponent,
    },
    mounted: function() {
        EventBus.$on('create-tweet', this.addUserTweet);
        EventBus.$on('search-query', this.handleSearch);
    },
    created: function() {
        // Initialize masterIDs and displayed IDs as new sets
        this.masterIDs = new Set();
        this.fetchTweets();
        window.addEventListener('scroll', this.feedScrolled);
    },
    methods: {
        // Fetches new tweets and updates masterIDs, and masterTweets,
        // and also adds the tweets to the DOM
        fetchTweets() {
            console.log("fetching tweets");
            fetch(this.fetch_url)
                .then(res => res.json())
                .then(data => {
                    // Update all ids of the tweets fetched and put them
                    // into the masterTweetList
                    this.updateMasterTweetList(data.statuses);
                    // Sort by timestamp
                    this.masterTweets = this.sortTweetList(this.masterTweets);
                    this.displayTweets = this.masterTweets.slice(0);
                })
                .catch(err => {
                    // Encountered an error in fetching the tweets
                    console.log(err);
                })
        },
        updateMasterTweetList(tweetList) {
            for (let idx = 0; idx < tweetList.length; idx++) {
                if (!this.masterIDs.has(tweetList[idx].id)) {
                    // Add the tweet to the master ids set
                    this.masterIDs.add(tweetList[idx].id);
                    // Also add it to the masterTweets list
                    let profileImgUrl = tweetList[idx].user.profile_image_url_https.toString();
                    if (!this.imageExists(profileImgUrl)) {
                        profileImgUrl = './assets/img/no_photo.png';
                    }
                    // Call the wrapper to add a tweet to the masterTweets
                    this.addTweet(tweetList[idx].id, tweetList[idx].user.name, 
                        tweetList[idx].user.screen_name, profileImgUrl, 
                        tweetList[idx].created_at, tweetList[idx].text, true);
                }
            }
        },
        // Sort the tweet list by timestamp
        sortTweetList(tweetList) {
            tweetList.sort((tweet1, tweet2) =>
                new Date(tweet2.timeStamp) - new Date(tweet1.timeStamp));
            return tweetList;
        },
        updateDisplayTweets(tweetList) {
            // Clear out the DOM
            this.clearAllTweets();
            // Sort the tweets
            tweetList = this.sortTweetList(tweetList);
            return tweetList;
        },
        // Clear out all the tweets from the DOM
        clearAllTweets() {
            let tweetContainer = document.getElementById('mainLink');
            // While the tweet container has a child, remove that child
            while (tweetContainer.firstChild) {
                tweetContainer.removeChild(tweetContainer.firstChild);
            }
        },
        // Checks whether the image exists on the image url provided 
        // @param {imageUrl} A string of the url where the image supposedly exists
        // @return {Boolean} A true/false value indicating whether or not the image exists there
        imageExists(imageUrl) {
            var http = new XMLHttpRequest();
            http.open('HEAD', imageUrl, false);
            http.send();
            // Return if the image exists on the server
            return http.status != 404;
        },
        // Implement lazy scrolling
        feedScrolled() {
            // Refresh the feed lazily once we scroll to bottom but make sure search filtering is off
            if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight && !this.searchOn) {
                this.fetchTweets();
            }
        },
        // Adds a tweet to the master tweet list
        addTweet(tweetID, realLifeName, userHandle, imageLink, timeStamp, tweetContent, fetched) {
            this.masterTweets.push({
                tweetID,
                imageLink,
                tweetContent,
                realLifeName,
                userHandle,
                timeStamp,
                fetched,
            })
        },
        // Wrapper funcvtion called by the event bus to add a user tweet to the master list
        addUserTweet(tweetContent, timeStamp) {
            if (tweetContent.trim() == '') {
                // Do not allow adding empty tweets
                return;
            }
            // Add the tweet to the master list
            let uid = this.uuidv4();
            this.addTweet(uid, 'Penguin', 'giant_penguin', 
                './assets/img/penguin.png', timeStamp, tweetContent, false);
            // Add to the master IDs set
            this.masterIDs.add(uid);
            // Sort the masterTweet list
            this.masterTweets = this.sortTweetList(this.masterTweets);
            // Port over the masterTweets to the displayTweets
            this.displayTweets = this.masterTweets.slice(0);
        },
        // Generates random uuids when called
        // Reference: https://stackoverflow.com/a/2117523
        uuidv4() {
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
              var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
              return v.toString(16);
            });
        },
        handleSearch(searchQuery) {
            // Set the search on value appropriately
            this.searchOn = searchQuery == '' ? false : true;
            if (!this.searchOn) {
                // If search entry is null, then clone the masterTweets
                this.displayTweets = this.masterTweets.slice(0);
            } else {
                // Filter the tweets by the searchQuery provided
                this.displayTweets = this.searchTweets(this.masterTweets, searchQuery);
            }
        },
        searchTweets(tweetList, searchQuery) {
            // Create a new array of all matching tweets
            let filteredTweets = [];
            // Split the search query into words by splitting with ' ' (space)
            searchQuery = searchQuery.toLowerCase().split(' ');
            for (let i = 0; i < tweetList.length; i++) {
                let tweetText = tweetList[i].tweetContent.toLowerCase().split(' ');
                let found = true;
                for (let j = 0; j < searchQuery.length; j++) {
                    // search reward function (whole word matches)
                    if (tweetText.filter(keyWord => {
                        return keyWord === searchQuery[j];
                    }).length == 0) {
                        // Could not find that word in the text, so break
                        found = false;
                        break;
                    }
                }
                // Check if found is true, if it is append it to the filteredTweets list
                if (found) {
                    filteredTweets.push(tweetList[i]);
                }
            }
            return filteredTweets;
        },
    },
    template: `
    <section class="content-wrapper" @scroll="feedScrolled">
        <div
            class="content-center" 
            id="mainLink" 
            role="main">
            <tweet-component
                v-for="tweet in displayTweets"
                :key=tweet.tweetID
                :profilePhotoLink=tweet.imageLink
                :profileImageAltText=tweet.realLifeName
                :realLifeName=tweet.realLifeName
                :userHandle=tweet.userHandle
                :tweetContent=tweet.tweetContent
                :timeStamp=tweet.timeStamp
                :fetchedTweet=tweet.fetched
            />
        </div>
    </section>
    `
}