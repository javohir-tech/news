<template>
  <div class="nh-card d-flex flex-column">
    <img
      :src="article.urlToImage || placeholder"
      :alt="article.title"
      class="nh-card-img w-100"
      @error="onImgError"
    >
    <div class="p-3 d-flex flex-column flex-grow-1">
      <span class="nh-eyebrow mb-1">{{ sourceName }}</span>
      <h5 class="mb-2">{{ article.title }}</h5>
      <p class="nh-muted small flex-grow-1">
        {{ trimmedDescription }}
      </p>
      <div class="d-flex justify-content-between align-items-center mt-2">
        <small class="nh-muted">{{ formattedDate }}</small>
        <router-link
          :to="detailLink"
          class="btn btn-sm nh-btn-primary"
        >
          Batafsil
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NewsCard',
  props: {
    article: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      placeholder: 'https://placehold.co/400x220?text=NewsHub'
    }
  },
  computed: {
    sourceName() {
      return (this.article.source && this.article.source.name) || 'Noma\'lum manba'
    },
    trimmedDescription() {
      if (!this.article.description) return 'Tavsif mavjud emas.'
      return this.article.description.length > 110
        ? this.article.description.slice(0, 110) + '...'
        : this.article.description
    },
    formattedDate() {
      if (!this.article.publishedAt) return ''
      const date = new Date(this.article.publishedAt)
      return date.toLocaleDateString('uz-UZ', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
      })
    },
    detailLink() {
      return {
        name: 'NewsDetail',
        params: { encodedUrl: encodeURIComponent(this.article.url) }
      }
    }
  },
  methods: {
    onImgError(e) {
      e.target.src = this.placeholder
    }
  }
}
</script>
