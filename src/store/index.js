import { defineStore } from "pinia";
import newsApi from "../services/newsApi";

export const useNewsStore = defineStore("news", {
    state: () => ({
        headlines: [],
        searchResults: [],
        lastSearchQuery: '',
        loading: false,
        error: null,
        activeCategory: 'general'
    }),
    getters: {
        isLoading: state => state.loading,
        getArticleByEncodedUrl: state => encodedUrl => {
            const targetUrl = decodeURIComponent(encodedUrl)
            const allArticles = [...state.headlines, ...state.searchResults]
            return allArticles.find(article => article.url === targetUrl)
        }
    },
    actions: {
        async fetchHeadlines() {
            this.loading = true
            this.error = null
            try {
                const response = await newsApi.getTopHeadlines({ category: this.activeCategory })
                this.headlines = response.data.articles || []
            } catch (error) {
                this.error = formatApiError(error)
            } finally {
                this.loading = false
            }
        },

        async changeCategory(category) {
            this.activeCategory = category
            await this.fetchHeadlines()
        },

        async searchNews(query) {
            this.loading = true
            this.error = null
            this.lastSearchQuery = query
            try {
                const response = await newsApi.searchNews(query)
                this.searchResults = response.data.articles || []
            } catch (err) {
                this.error = formatApiError(err)
            } finally {
                this.loading = false
            }
        }
    }
})

function formatApiError(err) {
    if (err.response && err.response.data && err.response.data.message) {
        return err.response.data.message
    }
    if (err.message) {
        return err.message
    }
    return 'Nomalum xatolik yuz berdi'
}