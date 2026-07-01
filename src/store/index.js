import Vue from 'vue'
import Vuex from 'vuex'
import newsApi from '@/services/newsApi'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // Bosh sahifadagi top yangiliklar
    headlines: [],
    // Qidiruv natijalari
    searchResults: [],
    lastSearchQuery: '',
    // Yuklanish va xatolik holatlari
    loading: false,
    error: null,
    // Bosh sahifada tanlangan kategoriya
    activeCategory: 'general'
  },

  getters: {
    headlines: state => state.headlines,
    searchResults: state => state.searchResults,
    isLoading: state => state.loading,
    error: state => state.error,
    activeCategory: state => state.activeCategory,

    // Detail sahifasi uchun: URL orqali maqolani headlines yoki searchResults ichidan topish
    getArticleByEncodedUrl: state => encodedUrl => {
      const targetUrl = decodeURIComponent(encodedUrl)
      const allArticles = [...state.headlines, ...state.searchResults]
      return allArticles.find(article => article.url === targetUrl)
    }
  },

  mutations: {
    SET_HEADLINES(state, articles) {
      state.headlines = articles
    },
    SET_SEARCH_RESULTS(state, articles) {
      state.searchResults = articles
    },
    SET_LAST_SEARCH_QUERY(state, query) {
      state.lastSearchQuery = query
    },
    SET_LOADING(state, value) {
      state.loading = value
    },
    SET_ERROR(state, message) {
      state.error = message
    },
    SET_ACTIVE_CATEGORY(state, category) {
      state.activeCategory = category
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

function formatApiError(err) {
  if (err.response && err.response.data && err.response.data.message) {
    return err.response.data.message
  }
  if (err.message) {
    return err.message
  }
  return 'Nomalum xatolik yuz berdi'
}
