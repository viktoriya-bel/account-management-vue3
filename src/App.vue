<template>
  <v-sheet
    class="pa-4 text-center ma-4 mx-auto"
    elevation="12"
    max-width="1200"
    rounded="lg"
    width="100%"
  >
    <div class="d-flex align-center mb-4">
      Учетные записи
      <v-btn density="compact" icon="mdi-plus" class="ml-4" @click="addItem"></v-btn>
    </div>
    <v-alert
      text="Для указания нескольких меток для одной пары логин/пароль используйте разделитель ;"
      type="info"
      variant="tonal"
      class="mb-6"
    ></v-alert>
    <div v-for="(item, index) in items" :key="index">
      <AppItem
        v-model:form="items[index]"
        class="item"
        @click-delete="removeItem(index)"
        @save="saveItem(items[index], index)"
      ></AppItem>
    </div>
  </v-sheet>
</template>

<script setup lang="ts">
import { ItemType } from '@/enums/item';
import AppItem from '@/components/AppItem.vue';
import { useAccountStore } from '@/stores/accounts';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';

const accountStore = useAccountStore();
const { getItems } = storeToRefs(accountStore);
const { removeItem, initData, saveItem } = accountStore;
initData();

const items = ref(getItems.value.slice());

const addItem = () => {
  items.value.push({ label: '', type: ItemType.local, login: '', password: '' });
};
</script>

<style lang="css" scoped>
.item {
  display: flex;
  gap: 10px;
  padding: 28px 0 6px;
  border-bottom: 1px solid grey;
}

@media screen and (max-width: 600px) {
  .item {
    flex-direction: column;
    align-items: center;
    padding-bottom: 28px;
  }
}
</style>
