import HeaderComponent from './Header.js';
import FeedComponent from './FeedComponent.js';

const app = new Vue({
    el: '#app',
    components: {
        'header-component': HeaderComponent,
        'feed-component': FeedComponent,
    },
    // template: `
    // <div class="test">
    //     <header-component />
    //     <feed-component />
    // </div>
    // `
});