<template>
  <div class="container py-5">
    <router-link to="/" class="nh-muted d-inline-block mb-3">&larr; Bosh sahifaga qaytish</router-link>

    <div v-if="!article" class="alert alert-warning">
      Bu maqola topilmadi. Sahifa yangilangandan so'ng ma'lumot xotiradan
      o'chib ketishi mumkin — <router-link to="/">bosh sahifadan</router-link>
      qaytadan tanlang.
    </div>

    <article v-else>
      <span class="nh-eyebrow">{{ sourceName }}</span>
      <h1 class="fw-bold mt-2">{{ article.title }}</h1>
      <p class="nh-muted">
        {{ formattedDate }} <span v-if="article.author">• {{ article.author }}</span>
      </p>

      <img
        v-if="article.urlToImage"
        :src="article.urlToImage"
        :alt="article.title"
        class="img-fluid rounded my-4"
        style="max-height: 420px; width: 100%; object-fit: cover;"
        @error="onImgError"
      >

      <p class="lead">{{ article.description }}</p>
      <p>{{ article.content }}</p>

      <a
        :href="article.url"
        target="_blank"
        rel="noopener noreferrer"
        class="btn nh-btn-primary mt-3"
      >
        To'liq maqolani manbada o'qish
      </a>
    </article>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'NewsDetailView',
  props: {
    encodedUrl: {
      type: String,
      required: true
    }
  },
  computed: {
    ...mapGetters(['getArticleByEncodedUrl']),
    article() {
      return this.getArticleByEncodedUrl(this.encodedUrl)
    },
    sourceName() {
      return this.article && this.article.source
        ? this.article.source.name
        : ''
    },
    formattedDate() {
      if (!this.article || !this.article.publishedAt) return ''
      const date = new Date(this.article.publishedAt)
      return date.toLocaleDateString('uz-UZ', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    }
  },
  methods: {
    onImgError(e) {
      e.target.style.display = 'none'
    }
  }
}
</script>
