<script lang="ts">
import { computed, defineComponent, onMounted, ref, watch } from 'vue';
import { Splide, SplideSlide } from '@splidejs/vue-splide';
import EventCard from './components/EventCard/EventCard.vue';
import EventModel from './models/event.model';
import Loader from './components/Loader/Loader.vue';
import Error from './components/Error/Error.vue';
import SearchBar from './components/SearchBar/SearchBar.vue';
import BerniceImage from './assets/images/bernice.png';
// TODO :: add carousel
// TODO :: add a few test scripts

export default defineComponent({
  components: {
    EventCard,
    Loader,
    Error,
    SearchBar,
    Splide,
    SplideSlide
  },

  setup() {
    const loading = ref(false);
    const hasError = ref(false);
    const allListItems = ref([] as EventModel[]);
    const filteredItems = ref([] as EventModel[]);
    const search = ref('');
    const userData = ref({ name: 'Bernice', image: BerniceImage });
    const featured = computed(() => {
      return allListItems.value.slice(0, 5);
    });

    const formatEventItem = (ev: any) => new EventModel(ev);

    const fetchEventList = async () => {
      hasError.value = false;
      try {
        loading.value = true;
        const resp = await fetch(
          'https://rest.bandsintown.com/artists/john%20legend/events?app_id=0ab49580-c84f-44d4-875f-d83760ea2cfe'
        );
        const result = await resp.json();
        allListItems.value = result.map(formatEventItem);
        filteredItems.value = allListItems.value;
      } catch {
        hasError.value = true;
      } finally {
        loading.value = false;
      }
    };

    const handleSearch = () => {
      filteredItems.value = allListItems.value.filter(i => {
        const searchStr = search.value.toLowerCase();
        const { lineup } = i;
        const filteredLineup = lineup.filter(l =>
          l.toLowerCase().includes(searchStr)
        );
        return filteredLineup.length;
      });
    };

    watch(search, () => {
      handleSearch();
    });

    onMounted(() => {
      fetchEventList();
    });

    return {
      loading,
      hasError,
      search,
      filteredItems,
      featured,
      userData
    };
  }
});
</script>

<template>
  <main>
    <loader v-if="loading" />
    <error v-else-if="hasError" />
    <template v-else>
      <section class="page-header">
        <h1>Events</h1>
        <div class="user-data">
          <img class="user-data__image" :src="userData.image" alt="Bernice" />
          <h5 class="user-data__name">{{ userData.name }}</h5>
          <i class="user-data__icon"
            ><svg
              width="12"
              height="10"
              viewBox="0 0 12 10"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.3334 3.33334L6.00002 8.00001L1.66669 3.33334"
                stroke="black"
                stroke-linecap="square"
              />
            </svg>
          </i>
        </div>
      </section>
      <section>
        <search-bar v-model="search" />
      </section>
      <section class="section">
        <h2 class="section-title">Featured Events</h2>

        <div>
          <Splide
            :options="{
              perPage: 2,
              gap: '1.5rem',
              pagination: false
            }"
          >
            <SplideSlide v-for="(event, i) in featured" :key="i">
              <event-card :event="event" is-featured />
            </SplideSlide>
          </Splide>
        </div>
      </section>
      <section class="section">
        <h2 class="section-title">Events</h2>

        <div v-if="filteredItems.length" class="section-content events">
          <event-card
            v-for="(event, i) in filteredItems"
            :key="i"
            :event="event"
          />
        </div>
        <div v-else class="events-empty">
          There are no events returned from your search
        </div>
      </section>
    </template>
  </main>
</template>

<style>
@import '@splidejs/vue-splide/css';
@import './assets/base.css';

#app {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;
  font-weight: normal;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 3.75rem;
}

.page-header h1 {
  font-size: 2rem;
}

.user-data {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.user-data__image {
  width: 38px;
  height: 38px;
  object-fit: cover;
}

.user-data__name {
  margin-left: 1rem;
  margin-right: 1rem;
  font-size: 15px;
}

.user-data__icon {
  padding: 6px;
  background-color: var(--blue-1);
  display: inline-flex;
  border-radius: 8px;
  cursor: pointer;
}

.section {
  margin-bottom: 1.5rem;
}

.section-title {
  font-size: 16px;
  margin-bottom: 1.25rem;
}

.section-content.events {
  display: grid;
  grid-gap: 1.5rem;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  grid-auto-flow: unset;
  grid-auto-columns: minmax(250px, 1fr);
}

.events-empty {
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  min-height: 30vh;
}
</style>
