import { createPinia } from 'pinia';
import { demoStoreKey } from './const';

export const pinia = createPinia();

export const useDemoStore = defineStore(demoStoreKey, () => {
  const count = ref<number>(0);

  function addCount() {
    count.value += 1;
  }
  return {
    count,
    addCount
  };
});
