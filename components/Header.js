export default {
    data() {
        return {
            // Linked as if placed in index.html
            twitterLogoLink: './assets/img/twitter-logo.png',
        }
    },
    template: `
    <header class="page-header">
        <div class="header-content-wrapper">
            <nav class="navbar">
                <li class="navbar-link">
                    <router-link to="/tictactoe"> TicTacToe </router-link>
                </li>
                <li class="navbar-link">
                    <router-link to="/madlibs"> Madlibs </router-link>
                </li>
                <li class="navbar-link"><a href="#"></a>Notifications</li>
                <li class="navbar-link"><a href="#"></a>Messages</li>
            </nav>
            <div class="logo-stuff">
                <img :src="twitterLogoLink" alt="Twitter Logo" class="twitter-logo" />
            </div>
            <div class="tweet-icon">
                <button class="tweet-btn"><b>Logged in as Penguin</b></button>
            </div>
        </div>
    </header>
    `,
};

{/* <li class="navbar-link"><a href="#"></a>Home</li>
<li class="navbar-link"><a href="#"></a>Moments</li> */}