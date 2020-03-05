import { EventBus } from './EventBus.js';

export default {
    data() {
        return {
            newTweetContent: '',
        };
    },
    methods: {
        createNewTweet() {
            // Emit a 'create-tweet' emission to the app to trigger a new tweet
            // Also send the timestamp of the created tweet
            let nowTime = moment().format();
            EventBus.$emit('create-tweet', this.newTweetContent, nowTime);
            // Reset the newTweetContent to '' to empty out the text area
            this.newTweetContent = '';
        }
    },
    template: `
    <div class="new-tweet-area">
        <div class="write-area-wrapper">
            <label for="write-tweet-area" style="display: none;">Write tweet: </label>
            <textarea 
                id="write-tweet-area" 
                v-model="newTweetContent"
                rows="7" 
                placeholder="Write a new tweet here...">
                </textarea>
        </div>
        <div class="submit-btn-area">
            <button 
                @click="createNewTweet()"
                id="submit-btn"> 
                Tweet 
            </button>
        </div>
    </div>
    `
};