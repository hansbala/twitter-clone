// this is how to create a component that is globally registered
Vue.component('game-title', {
    template: `
        <h1>
            <a href="https://en.wikipedia.org/wiki/Tic-tac-toe">Tic Tac Toe</a>
        </h1>
    `,
});

Vue.component('welcome-message', {
    props: {
        'message': String,
        'playerNames': {
            type: Array,
            default: () => [],
        }
    },
    computed: {
        // a computed getter
        messageToPlayers() {
            // `this` points to the vm instance
            if (this.playerNames.length) {
                return `${this.message} ${this.playerNames.join(', ')}`;   
            } else {
                return this.message;
            }
        }
    },
    template: `
        <p>
          {{ messageToPlayers }}
        </p>
    `,
});

Vue.component('ready-checkbox', {
    props: {
        'name': String,
    },
    data: function() {
        const id = `ready-switch-for-${this.name}`;
        return {
            checked: false,  
            id,
        };
    },
    methods: {
        onClick(event) {
            this.checked = event.target.checked;
            this.$emit('player-ready', this.name, this.checked);
        }
    },
    template: `
        <div class="custom-control custom-switch">
            <input type="checkbox" class="custom-control-input" :id="id" :checked="checked" @click="onClick">
            <label class="custom-control-label" :for="id">{{name}}, are you ready?</label>
        </div>
    `,
});

Vue.component('game-board', {
    data: function() {
        return {
            classObject: ['container', 'm-auto', 'bg-light', 'd-flex', 'flex-column'],
            styleObject: { 
                'width': '900px', 
                'height': '900px' 
            },
            boardRowClasses: ['board-row', 'row', 'flex-grow-1', 'd-flex'],
            boardCellClasses: ['board-cell', 'd-flex', 'col', 'p-4', 'border', 'border-primary', 'rounded-lg', 'align-items-center', 'justify-content-center'],
            X: '<i class="fas fa-times fa-10x"></i>',
            O: '<i class="fas fa-circle fa-10x"></i>',
            currentPlayer: this.X,
            numMoves: 0,
            winner: null,
        };
    },
    methods: {
        boardRowKey(r) {
            return `row-${r}`;
        },
        boardCellKey(r, c) {
            return `cell-${r}-${c}`;
        },

        playerMove(r,c) {
            let cell_id = ((r - 1) * 3 + c) + "";
            if (document.getElementById(cell_id).innerHTML != "") {
                console.log("This cell is empty");
                // Do not do anything if the cell is occupied
                return;
            }
            // Check if there is a winner. If there is one, then simply return and print a message
            if (this.winner != null) {
                console.log(this.winner + " has already won the game.");
                return;
            }
            this.currentPlayer = (this.currentPlayer == this.X ? this.O : this.X);
            this.numMoves = (this.numMoves >= 8 ? this.checkWinner() : this.numMoves+= 1);
            document.getElementById(cell_id).innerHTML = this.currentPlayer;
            this.checkWinner();
            return this.currentPlayer;
        },
        checkWinner(){
            const winningCombos = [
                [0, 1, 2],
                [3, 4, 5],
                [6, 7, 8],
                [0, 3, 6],
                [1, 4, 7],
                [2, 5, 8],
                [0, 4, 8],
                [2, 4, 6]
            ];
            winningCombos.forEach(combo => {
                const first_id = (parseInt(combo[0]) + 1) + "";
                const sec_id = (parseInt(combo[1]) + 1) + "";
                const third_id = (parseInt(combo[2]) + 1) + "";                
                
                // Check if all the ids in first, sec, and third are all the same
                let idx_1 = document.getElementById(first_id).innerHTML;
                let idx_2 = document.getElementById(sec_id).innerHTML;
                let idx_3 = document.getElementById(third_id).innerHTML;
                if (idx_1 != '' && idx_2 != '' && idx_3 != '' && idx_1 == idx_2 && idx_2 == idx_3) {
                    this.winner = this.currentPlayer == this.X ? 'Alice' : 'Bob';
                    console.log(this.winner + " has won the game");
                }
            });
          },
    },
    template: `
        <div id="board" :class="classObject" :style="styleObject">
            <div v-for="r of 3" :key="boardRowKey(r)" :class="boardRowClasses">
                <div
                    v-for="c of 3"
                    :key="boardCellKey(r, c)"
                    :id="(r - 1) * 3 + c"
                    :class="[{'bg-white': [2, 4, 6, 8].includes((r - 1) * 3 + c)} ,boardCellClasses]"
                    @click="playerMove(r,c)">
                </div>
            </div>
        </div>
    `
});

export default {
    data() {
        return {
            message: 'Welcome to the game!',
            playerNames: [],
            appClasses: ['w-100', 'h-100', 'p-5', 'd-flex', 'flex-column', 'align-items-center'],
            playerReady: {}
        }
    },
    methods: {
        onPlayerReady(playerName, isReady) {
            this.$set(this.playerReady, playerName, isReady);
        }
    },
    created() {
        const self = this;
        window.setTimeout(() => {
            self.message = 'Ready to get started?';
            self.playerNames.push('Alice', 'Bob');
        }, 1000);
    },
    computed: {
        bothPlayerReady() {
            return this.playerNames.length && 
                this.playerNames.map(playerName => this.playerReady[playerName])
                                .reduce((prevValue, currValue) => prevValue && currValue);
        }
    },
    template: `
    <div style="margin-top: 50px;">
        <game-board></game-board>
    </div>
    `
};