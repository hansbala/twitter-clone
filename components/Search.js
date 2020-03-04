import { EventBus } from "./EventBus.js";

export default {
    data() {
        return {
            searchQuery: '',
        }
    },
    watch: {
        searchQuery(query) {
            EventBus.$emit('search-query', query);
        }
    },
    template:`
    <div class="search-wrapper">
        <label id="search-label" for="search-input"> Search: </label>
        <input 
            id="search-input" 
            type="text" 
            v-model="searchQuery"
            placeholder="Type to filter tweets ...">
    </div>
    `
}