export default {
    props: {
        'tweetID': String,
        'profilePhotoLink': String,
        'profileImageAltText': String,
        'realLifeName': String,
        'userHandle': String,
        'timeStamp': String,
        'tweetContent': String,
        // Stores whether the tweet has been fetched from the API or not
        'fetchedTweet': Boolean,  
    },
    data() {
        return {
            localTimeStamp: null,
        }
    },
    created() {
        this.localTimeStamp = moment(this.timeStamp).format('MMM Do, YYYY hh:mm A');
    },
    template: `
    <div 
        class="tweet"
        :class="{ tweetUserEntered: !fetchedTweet }">
        <img :src="profilePhotoLink" alt="profileImageAltText" class="person-avatar">
        <div class="tweet-info">
            <p class="tweet-header">
                <span class="user-info">{{realLifeName}} @{{userHandle}}</span> 
                <span class="time-stamp">{{localTimeStamp}}</span>
            </p>
            <p class="tweet-content">{{tweetContent}}</p>
        </div>
    </div>
    `,
}