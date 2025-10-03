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

    <div v-for="(item, index) in items" :key="index" class="item">
      <v-text-field v-model="item.label" label="Метки" class="field"></v-text-field>
      <v-autocomplete
        v-model="item.type"
        label="Тип записи"
        :items="Object.values(ItemType)"
        class="field"
      ></v-autocomplete>
      <v-text-field
        v-model="item.login"
        label="Логин"
        :class="['field', { 'field-stretch': item.type === ItemType.ldap }]"
      ></v-text-field>
      <v-text-field
        v-if="item.type === ItemType.local"
        v-model="item.password"
        label="Пароль"
        :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
        :type="showPassword ? 'text' : 'password'"
        class="field"
        @click:append-inner="showPassword = !showPassword"
      ></v-text-field>

      <v-btn density="compact" icon="mdi-delete" class="mt-3" @click="deleteItem(index)"></v-btn>
    </div>
  </v-sheet>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { ItemType } from '@/enums/item';
import type { ItemView } from '@/types/item';

const items = ref<ItemView[]>([
  { label: 'XXX', type: ItemType.local, login: 'login', password: 'pass' },
]);
const showPassword = ref(false);

const addItem = () => {
  items.value.push({ label: '', type: ItemType.local, login: '', password: '' });
};

const deleteItem = (index: number) => {
  items.value.splice(index, 1);
};
</script>

<style lang="css" scoped>
.field {
  max-width: 100%;
  width: 300px;
  flex: 1 2 200px;
}

.field-stretch {
  flex: 2 0 400px;
}

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

  .field,
  .field-stretch {
    width: 100%;
    flex-basis: auto;
  }
}
</style>
