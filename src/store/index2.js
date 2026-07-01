import { defineStore } from "pinia";
import newsApi from '@/services/newsApi'

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
        headlines: state => state.headlines,
        searchResults: state => state.searchResults,
        isLoading: state => state.loading,
        error: state => state.error,
        activeCategory: state => state.activeCategory,
        getArticleByEncodedUrl: state => encodedUrl => {
            const targetUrl = decodeURIComponent(encodedUrl)
            const allArticles = [...state.headlines, ...state.searchResults]
            return allArticles.find(article => article.url === targetUrl)
        }
    },
    actions: {
        async fetchHeadlines({ commit, state }) {
            commit('SET_LOADING', true)
            commit('SET_ERROR', null)
            try {
                const response = await newsApi.getTopHeadlines({
                    category: state.activeCategory
                })
                commit('SET_HEADLINES', response.data.articles || [])
            } catch (err) {
                commit('SET_ERROR', formatApiError(err))
            } finally {
                commit('SET_LOADING', false)
            }
        },

        async changeCategory({ commit, dispatch }, category) {
            commit('SET_ACTIVE_CATEGORY', category)
            await dispatch('fetchHeadlines')
        },

        async searchNews({ commit }, query) {
            commit('SET_LOADING', true)
            commit('SET_ERROR', null)
            commit('SET_LAST_SEARCH_QUERY', query)
            try {
                const response = await newsApi.searchNews(query)
                commit('SET_SEARCH_RESULTS', response.data.articles || [])
            } catch (err) {
                commit('SET_ERROR', formatApiError(err))
            } finally {
                commit('SET_LOADING', false)
            }
        }
    }
})