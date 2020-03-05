// import HeaderComponent from './Header.js';
import FeedComponent from './FeedComponent.js';
import CreateTweetComponent from './CreateTweet.js';
import SearchComponent from './Search.js';
import TicTacToe from './tic-tac-toe.js';
import MadLibComponent from '../madlibs/madlibs.js';
import HeaderComponent from './Header.js';

const routes = [
    { path: '/tictactoe', component: TicTacToe },
    { path: '/madlibs', component: MadLibComponent },
]
const router = new VueRouter({
    routes
})

const app = new Vue({
    el: '#app',
    router,
    components: {
        // 'header-component': HeaderComponent,
        'feed-component': FeedComponent,
        'create-tweet-component': CreateTweetComponent,
        'search-component': SearchComponent,
        'header-component': HeaderComponent,
    },
    template: `
    <div class="test">
        <header-component />
        <router-view />
        <create-tweet-component />
        <search-component />
        <feed-component />
    </div>
    `
});