# NewsHub — Vue 2 + Vuex yangiliklar ilovasi

Vue 2 (Options API) va Vuex 3 asosida qurilgan 4 sahifali yangiliklar ilovasi.
Vue 3 ga migratsiya qilishni sinash uchun mo'ljallangan boshlang'ich loyiha.

## Sahifalar
- **Bosh sahifa (`/`)** — kategoriyalar bo'yicha top yangiliklar
- **Yangilik tafsiloti (`/news/:encodedUrl`)** — tanlangan maqolaning to'liq ko'rinishi
- **Qidiruv (`/search`)** — kalit so'z bo'yicha yangiliklarni qidirish
- **Biz haqimizda (`/about`)** — loyiha haqida ma'lumot

## Arxitektura
- `src/store/index.js` — Vuex markaziy holati: `headlines`, `searchResults`,
  `loading`, `error`, `activeCategory`. `NewsDetail` sahifasi maqolani
  URL orqali shu holatdan topadi (backend/id yo'q, shuning uchun sahifa
  yangilansa tafsilot yo'qoladi — bu qasddan qoldirilgan, keyinchalik
  localStorage yoki backend bilan mustahkamlash mumkin).
- `src/services/newsApi.js` — NewsAPI.org bilan ishlovchi axios qatlami.
- `src/router/index.js` — 4 marshrut, `NewsDetail`/`Search`/`About` lazy-load qilingan.

## O'rnatish

```bash
npm install
```

## API kalitini sozlash

1. https://newsapi.org/register saytidan bepul ro'yxatdan o'ting va API kalit oling.
2. `.env.example` faylini `.env` deb nusxalang:
   ```bash
   cp .env.example .env
   ```
3. `.env` ichida `VUE_APP_NEWS_API_KEY` qiymatini o'z kalitingiz bilan almashtiring.

> **Muhim:** NewsAPI.org bepul (Developer) tarifi faqat `localhost` dan
> qilingan so'rovlarga ruxsat beradi. Shuning uchun loyihani albatta
> `npm run serve` orqali lokal ishga tushiring — production serverga
> joylashtirsangiz, NewsAPI so'rovlari CORS xatosi bilan bloklanadi
> (buni hal qilish uchun oddatda o'z backend-proksingizni yozish kerak bo'ladi).

## Ishga tushirish

```bash
npm run serve
```

Brauzerda `http://localhost:8080` manzilini oching.

## Build

```bash
npm run build
```

## Vue 3 ga migratsiya qilishda e'tibor beriladigan joylar
- `Vue.use(Vuex)` / `Vue.use(VueRouter)` → Vue 3 da `createApp`, `createStore`, `createRouter`
- Vuex 3 → Pinia yoki Vuex 4 ga o'tish
- `vue-router@3` (history mode) → `vue-router@4` (`createWebHistory`)
- Options API komponentlarini Composition API (`setup()`) ga o'tkazish mumkin
- Global filtr/mixin kabi Vue 2 ga xos narsalar loyihada ishlatilmagan — shuning
  uchun migratsiya nisbatan sodda bo'ladi, asosiy e'tibor ilova
  bootstrapping kodiga (`main.js`) qaratiladi
