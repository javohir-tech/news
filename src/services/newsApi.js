import axios from 'axios'

const API_KEY = import.meta.env.VITE_APP_NEWS_API_KEY
const BASE_URL = 'https://newsapi.org/v2'

const client = axios.create({
  baseURL: BASE_URL
})

export default {
  /**
   * Top yangiliklarni olish
   * @param {Object} params - { category, country, pageSize }
   */
  getTopHeadlines(params = {}) {
    return client.get('/top-headlines', {
      params: {
        country: params.country || 'us',
        category: params.category || undefined,
        pageSize: params.pageSize || 20,
        apiKey: API_KEY
      }
    })
  },

  /**
   * Kalit so'z bo'yicha qidiruv
   * @param {String} query
   */
  searchNews(query, params = {}) {
    return client.get('/everything', {
      params: {
        q: query,
        language: params.language || 'en',
        sortBy: params.sortBy || 'publishedAt',
        pageSize: params.pageSize || 20,
        apiKey: API_KEY
      }
    })
  }
}
