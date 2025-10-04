import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { ItemType } from '@/enums/item';
import type { ItemView, ItemStore } from '@/types/item';
import { crypt } from '@/utils/crypt';

export const useAccountStore = defineStore('account', () => {
  const secret = 'test';

  const items = ref<ItemStore[]>([]);

  const getItems: ItemView[] = computed(() => {
    if (!items.value.length) return [];

    return items.value.map((item) => {
      const label = item.label.length > 1 ? item.label?.join('; ') : item.label.toString();
      return { ...item, label };
    });
  });

  const preperedDataForSave = (itemsOld: ItemStore[]) => {
    return itemsOld.map((item) => {
      if (item.password !== null) item.password = crypt(item.password, secret);
      return item;
    });
  };

  const initData = () => {
    const accounts = localStorage.getItem('accounts');
    if (!!accounts) items.value = preperedDataForSave(JSON.parse(accounts));
  };

  const addTestData = () => {
    items.value.push({ label: ['XXX'], type: ItemType.local, login: 'login', password: 'pass' });
  };

  const saveItem = (item: ItemView, index: number) => {
    const label = item.label.includes(';')
      ? (item.label.split(';').map((element) => element.trim()) as string[])
      : [item.label];
    items.value[index] = { ...item, label };
    localStorage.setItem('accounts', JSON.stringify(preperedDataForSave(items.value)));
  };

  const removeItem = (index: number) => {
    items.value.splice(index, 1);
    localStorage.setItem('accounts', JSON.stringify(preperedDataForSave(items.value)));
  };

  return { getItems, initData, addTestData, saveItem, removeItem };
});
