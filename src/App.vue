<script lang="ts">
import EventCard from './components/EventCard/EventCard.vue';
import eventList from './test-data.json';
import { computed, defineComponent, onMounted, reactive, ref } from 'vue';
import EventModel from './models/event.model';

export default defineComponent({
  components: {
    EventCard
  },

  setup() {
    const listItems = ref([] as EventModel[]);
    const featured = computed(() => {
      return listItems.value.slice(0, 5);
    });

    const formatEventItem = (ev: any) => new EventModel(ev);

    onMounted(() => {
      listItems.value = eventList.map(formatEventItem);
    });

    return {
      listItems,
      featured
    };
  }
});
</script>

<template>
  <main>
    <section class="section">
      <h2 class="section-title">Featured Events</h2>

      <div class="section-content">
        <event-card
          v-for="(event, i) in featured"
          :key="i"
          :event="event"
          is-featured
        />
      </div>
    </section>
    <section class="section">
      <h2 class="section-title">Events</h2>

      <div class="section-content events">
        <event-card v-for="(event, i) in listItems" :key="i" :event="event" />
      </div>
    </section>
  </main>
</template>

<style>
@import './assets/base.css';

#app {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;
  font-weight: normal;
}

.section {
  margin-bottom: 1.5rem;
}

.section-title {
  font-size: 16px;
  margin-bottom: 1.25rem;
}

.section-content {
  display: grid;
  grid-gap: 1.5rem;
  grid-template-columns: repeat(auto-fill, minmax(524px, 1fr));
  grid-auto-flow: column;
  grid-auto-columns: minmax(524px, 1fr);
  overflow-x: auto;
}

.section-content.events {
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  grid-auto-flow: unset;
  grid-auto-columns: minmax(250px, 1fr);
  overflow: unset;
}
</style>
