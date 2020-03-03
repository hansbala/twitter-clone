import TweetComponent from './TweetComponent.js';

export default {
    data() {
        return {
            // Linked as if in index.html
            penguinProfilePhotoLink: './assets/img/penguin.png',
            // Get >= 25 tweets to implement lazy loading
            fetch_url: 'http://ec2-54-172-96-100.compute-1.amazonaws.com/feed/random?q=noodle&size=30',
            masterIDs: null,
            displayedIDs: null,
            masterTweets: [],
            searchOn: false,
        }
    },
    components: {
        'tweet-component': TweetComponent,
    },
    created() {
        // Initialize masterIDs and displayed IDs as new sets
        this.masterIDs = new Set();
        this.displayedIDs = new Set();
        this.fetchTweets();
        window.addEventListener('scroll', this.feedScrolled);
    },
    methods: {
        // Fetches new tweets and updates masterIDs, and masterTweets,
        // and also adds the tweets to the DOM and appropriately updates
        // displayedIDs with the IDs of all the tweets
        fetchTweets() {
            fetch(this.fetch_url)
                .then(res => res.json())
                .then(data => {
                    // Update all ids of the tweets fetched and put them
                    // into the masterTweetList
                    this.updateMasterTweetList(data.statuses);
                    // Sort by timestamp
                    this.masterTweets = this.sortTweetList(this.masterTweets);
                })
                .catch(err => {
                    // Encountered an error in fetching the tweets
                    console.log(err);
                })
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
        feedScrolled() {
            if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
                this.fetchTweets();
            }
        },
        updateMasterTweetList(tweetList) {
            for (let idx = 0; idx < tweetList.length; idx++) {
                if (!this.masterIDs.has(tweetList[idx].id)) {
                    // Add the tweet to the master ids set
                    this.masterIDs.add(tweetList[idx].id);
                    // Also add it to the masterTweets list
                    let profile_img_url = tweetList[idx].user.profile_image_url_https.toString();
                    if (!this.imageExists(profile_img_url)) {
                        profile_img_url = './assets/img/no_photo.png';
                    }
                    let tweet_id = tweetList[idx].id;
                    let realLifeName = tweetList[idx].user.name;
                    let userHandle = tweetList[idx].user.screen_name;
                    let timeStamp = tweetList[idx].created_at;
                    let tweetContent = tweetList[idx].text;
                    this.masterTweets.push({
                        tweet_id,
                        profile_img_url,
                        tweetContent,
                        realLifeName,
                        userHandle,
                        timeStamp,
                        fetched: true,
                    });
                }
            }
        },

    },
    template: `
    <section class="content-wrapper" @scroll="feedScrolled">
        <div
            class="content-center" 
            id="mainLink" 
            role="main">
            <tweet-component
                v-for="tweet in masterTweets"
                :key=tweet.tweet_id
                :profilePhotoLink=tweet.profile_img_url
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