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
      <v-btn density="compact" icon="mdi-plus" class="ml-4"></v-btn>
    </div>
    <v-alert
      text="Для указания нескольких меток для одной пары логин/пароль используйте разделитель ;"
      type="info"
      variant="tonal"
    ></v-alert>

    <v-list>
      <v-list-item v-for="item in items" :key="item.id" :value="item.id">
        <div class="item">
          <v-text-field v-model="item.label" label="Метки" class="field"></v-text-field>
          <v-autocomplete
            v-model="item.type"
            label="Тип записи"
            :items="['Локальная', 'LDAP']"
            class="field"
          ></v-autocomplete>
          <v-text-field v-model="item.login" label="Логин" class="field"></v-text-field>
          <v-text-field
            v-model="item.password"
            label="Пароль"
            :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :type="showPassword ? 'text' : 'password'"
            class="field"
            @click:append-inner="showPassword = !showPassword"
          ></v-text-field>

          <v-btn density="compact" icon="mdi-delete" class="mt-3"></v-btn>
        </div>
      </v-list-item>
    </v-list>
  </v-sheet>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const items = [{ label: 'XXX', type: 'Локальная', login: 'login', password: 'pass' }]
const showPassword = ref(false)
</script>

<style lang="css" scoped>
.field {
  margin-right: 10px;
}

.item {
  display: flex;
  padding: 14px;
}

@media screen and (max-width: 600px) {
  .item {
    flex-direction: column;
    align-items: center;
  }

  .field {
    margin-right: 0;
    width: 100%;
  }
}
</style>
