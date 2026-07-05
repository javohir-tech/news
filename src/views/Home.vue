<template>
  <div>
    <section class="nh-hero mb-4">
      <div class="container">
        <span class="nh-eyebrow" style="color:#f2b6b6;">Bugungi eng muhimlari</span>
        <h1 class="fw-bold mt-2">Dunyoda nima bo'lyapti?</h1>
        <p class="mb-0" style="opacity:0.85;">
          Eng so'nggi yangiliklarni bir joydan kuzatib boring.
        </p>
      </div>
    </section>

    <div class="container pb-5">
      <!-- Kategoriyalar -->
      <div class="d-flex flex-wrap gap-2 mb-4">
        <button v-for="cat in categories" :key="cat.value" class="btn btn-sm"
          :class="cat.value === activeCategory ? 'nh-btn-primary' : 'btn-outline-secondary'"
          @click="onCategoryClick(cat.value)">
          {{ cat.label }}
        </button>
      </div>

      <LoadingSpinner v-if="isLoading" />

      <div v-else-if="error" class="alert alert-danger">
        Xatolik: {{ error }}
      </div>

      <div v-else-if="headlines.length === 0" class="alert alert-secondary">
        Yangiliklar topilmadi.
      </div>

      <div v-else class="row g-4">
        <div v-for="(article, idx) in headlines" :key="article.url + idx" class="col-12 col-sm-6 col-lg-4">
          <NewsCard :article="article" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "pinia"
import NewsCard from '@/components/NewsCard.vue'
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import useNewsStore from "../store";

export default {
  name: 'HomeView',
  components: { NewsCard, LoadingSpinner },
  data() {
    return {
      categories: [
        { label: 'Umumiy', value: 'general' },
        { label: 'Biznes', value: 'business' },
        { label: 'Texnologiya', value: 'technology' },
        { label: 'Sport', value: 'sports' },
        { label: 'Salomatlik', value: 'health' },
        { label: 'Ilm-fan', value: 'science' }
      ]
    }
  },
  computed: {
    ...mapState(useNewsStore , ['headlines', 'isLoading', 'error', 'activeCategory'])
  },
  created() {
    if (this.headlines.length === 0) {
      this.fetchHeadlines()
    }
  },
  methods: {
    ...mapActions(useNewsStore , ['fetchHeadlines', 'changeCategory']),
    onCategoryClick(category) {
      if (category !== this.activeCategory) {
        this.changeCategory(category)
      }
    }
  }
}
</script>
