<template>
  <div class="container py-5">
    <h1 class="fw-bold mb-4">Biz haqimizda</h1>

    <p class="lead">
      NewsHub — bu Vue 2 va Vuex asosida qurilgan namunaviy yangiliklar ilovasi.
      Loyiha ta'lim maqsadida yaratilgan bo'lib, kelajakda Vue 3 ga migratsiya
      qilish uchun sinov maydoni sifatida xizmat qiladi.
    </p>

    <div class="row g-4 mt-3">
      <div class="col-md-4">
        <div class="nh-card p-4">
          <h5>🧩 Texnologiyalar</h5>
          <ul class="nh-muted mb-0">
            <li>Vue 2 (Options API)</li>
            <li>Vuex 3</li>
            <li>Vue Router 3</li>
            <li>Bootstrap 5</li>
            <li>Axios + NewsAPI.org</li>
          </ul>
        </div>
      </div>
      <div class="col-md-4">
        <div class="nh-card p-4">
          <h5>🎯 Maqsad</h5>
          <p class="nh-muted mb-0">
            Real dunyo strukturasiga ega loyihada Vue 2 dan Vue 3 ga
            (Composition API, yangi reaktivlik tizimi) o'tish jarayonini
            amaliyotda sinab ko'rish.
          </p>
        </div>
      </div>
      <div class="col-md-4">
        <div class="nh-card p-4">
          <h5>⚙️ Arxitektura</h5>
          <p class="nh-muted mb-0">
            Markazlashgan holat (state) Vuex store orqali boshqariladi:
            headlines, qidiruv natijalari, yuklanish va xatolik holatlari
            bitta joyda saqlanadi.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AboutView'
}
</script>
