import HeaderComponent from './Header.js';
import FeedComponent from './FeedComponent.js';
import CreateTweetComponent from './CreateTweet.js';

const app = new Vue({
    el: '#app',
    components: {
        'header-component': HeaderComponent,
        'feed-component': FeedComponent,
        'create-tweet-component': CreateTweetComponent,
    },
    template: `
    <div class="test">
        <header-component />
        <create-tweet-component />
        <feed-component />
    </div>
    `
});