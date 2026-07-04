<template>
  <div class="container py-5">
    <h1 class="fw-bold mb-4">Yangiliklarni qidirish</h1>

    <form class="row g-2 mb-4" @submit.prevent="onSearch">
      <div class="col-12 col-sm-8">
        <input v-model="query" type="text" class="form-control"
          placeholder="Masalan: elon musk, iqtisodiyot, futbol...">
      </div>
      <div class="col-12 col-sm-4">
        <button type="submit" class="btn nh-btn-primary w-100" :disabled="!query.trim()">
          Qidirish
        </button>
      </div>
    </form>

    <LoadingSpinner v-if="isLoading" />

    <div v-else-if="error" class="alert alert-danger">
      Xatolik: {{ error }}
    </div>

    <div v-else-if="hasSearched && searchResults.length === 0" class="alert alert-secondary">
      "{{ lastSearchQuery }}" bo'yicha hech narsa topilmadi.
    </div>

    <div v-else-if="searchResults.length > 0">
      <p class="nh-muted mb-3">
        "{{ lastSearchQuery }}" bo'yicha {{ searchResults.length }} ta natija topildi
      </p>
      <div class="row g-4">
        <div v-for="(article, idx) in searchResults" :key="article.url + idx" class="col-12 col-sm-6 col-lg-4">
          <NewsCard :article="article" />
        </div>
      </div>
    </div>

    <div v-else class="text-center nh-muted py-5">
      Qidiruv natijalarini ko'rish uchun kalit so'z kiriting.
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'pinia'
import NewsCard from '@/components/NewsCard.vue'
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import { useNewsStore } from '../store';

export default {
  name: 'SearchView',
  components: { NewsCard, LoadingSpinner },
  data() {
    return {
      query: '',
      hasSearched: false
    }
  },
  computed: {
    ...mapState(useNewsStore, ['searchResults', 'isLoading', 'error', 'lastSearchQuery'])
  },
  methods: {
    ...mapActions(useNewsStore , ['searchNews']),
    async onSearch() {
      if (!this.query.trim()) return
      this.hasSearched = true
      await this.searchNews(this.query.trim())
    }
  }
}
</script>
