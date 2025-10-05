<template>
  <div v-if="modelForm">
    <v-text-field
      v-model="modelForm.label"
      label="Метки"
      class="field"
      :error-messages="errorsForm.label"
      @blur="() => validateForm()"
    ></v-text-field>
    <v-autocomplete
      v-model="modelForm.type"
      label="Тип записи"
      :items="Object.values(ItemType)"
      class="field"
      @update:modelValue="
        () => {
          if (modelForm.type === ItemType.ldap) modelForm.password = null;
          validateForm();
        }
      "
    ></v-autocomplete>
    <v-text-field
      v-model="modelForm.login"
      label="Логин"
      :class="['field', { 'field-stretch': modelForm.type === ItemType.ldap }]"
      :error-messages="errorsForm.login"
      @blur="() => validateForm()"
    ></v-text-field>
    <v-text-field
      v-if="modelForm.type === ItemType.local"
      v-model="modelForm.password"
      label="Пароль"
      :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
      :type="showPassword ? 'text' : 'password'"
      class="field"
      :error-messages="errorsForm.password"
      @blur="() => validateForm()"
      @click:append-inner="showPassword = !showPassword"
    ></v-text-field>

    <v-btn density="compact" icon="mdi-delete" class="mt-3" @click="emit('clickDelete')"></v-btn>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import { ItemType } from '@/enums/item';
import type { ItemView } from '@/types/item';

const emit = defineEmits<{
  (e: 'clickDelete'): void;
  (e: 'save'): void;
}>();

const modelForm = defineModel<ItemView>('form', {
  required: true,
  default: { label: '', type: ItemType.local, login: '', password: '' },
});

const showPassword = ref(false);

const errorsForm: Record<string, string> = reactive({
  label: '',
  type: '',
  login: '',
  password: '',
});

const validateForm = () => {
  const fieldsName = Object.keys(modelForm.value);
  const requiredFields = ['login'];
  const limitLengthsFields = ['label', 'login'];
  const maxLength = (field: string) => (field === 'label' ? 50 : 100);
  if (modelForm.value.type === ItemType.local) {
    requiredFields.push('password');
    limitLengthsFields.push('password');
  }

  for (const field of fieldsName) {
    const value = modelForm.value[`${field as keyof ItemView}`];
    if (requiredFields.includes(field) && !value?.length)
      errorsForm[`${field}`] = 'Поле обязательно для заполнения';
    else if (limitLengthsFields.includes(field) && value && value.length > maxLength(field))
      errorsForm[`${field}`] = `Максимальное количество символов ${maxLength(field)}`;
    else errorsForm[`${field}`] = '';
  }

  if (!errorsForm['label']?.length && !!modelForm.value.label?.length) {
    //TODO улучишть валидацию, так как проверка на одно вхождение, а надо бы все вхождения проверять
    errorsForm['label'] =
      modelForm.value.label.includes(' ') && !modelForm.value.label.includes(';')
        ? 'Необходимо использовать разделитель'
        : '';
  }

  if (Object.values(errorsForm).every((errorText) => errorText === '')) emit('save');
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

@media screen and (max-width: 600px) {
  .field,
  .field-stretch {
    width: 100%;
    flex-basis: auto;
  }
}
</style>
