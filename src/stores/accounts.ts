import { defineStore } from 'pinia';
import { ref } from 'vue';
import { ItemType } from '@/enums/item';
import type { ItemView } from '@/types/item';

export const useAccountStore = defineStore('account', () => {
  const items = ref<ItemView[]>([]);

  function addTestData() {
    items.value.push({ label: 'XXX', type: ItemType.local, login: 'login', password: 'pass' });
  }

  function saveItem(item: ItemView, index: number) {
    console.log('items 1', items);
    items.value[index] = item;
    console.log('items 2', items);
  }

  function removeItem(index: number) {
    items.value.splice(index, 1);
  }

  return { items, addTestData, saveItem, removeItem };
});
