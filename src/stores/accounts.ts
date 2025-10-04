import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { ItemType } from '@/enums/item';
import type { ItemView, ItemStore } from '@/types/item';

export const useAccountStore = defineStore('account', () => {
  const items = ref<ItemStore[]>([]);

  const getItems: ItemView[] = computed(() => {
    if (!items.value.length) return [];

    return items.value.map((item) => {
      const label = item.label.length > 1 ? item.label?.join('; ') : item.label.toString();
      return { ...item, label };
    });
  });

  function addTestData() {
    items.value.push({ label: ['XXX'], type: ItemType.local, login: 'login', password: 'pass' });
  }

  function saveItem(item: ItemView, index: number) {
    const label = item.label.includes(';')
      ? (item.label.split(';').map((element) => element.trim()) as string[])
      : [item.label];
    items.value[index] = { ...item, label };
  }

  function removeItem(index: number) {
    items.value.splice(index, 1);
  }

  return { getItems, addTestData, saveItem, removeItem };
});
