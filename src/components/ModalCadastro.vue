<template>
  <div v-if="isVisible" class="modal-overlay">
    <div class="modal">
      <form @submit.prevent="submitForm">
        <div v-for="(field, index) in fields" :key="index" class="form-group">
          <label :for="field.name">{{ field.label }}</label>
          <component 
            :is="field.type === 'textarea' ? 'textarea' : 'input'"
            :type="field.type !== 'textarea' ? field.type : undefined"
            :id="field.name"
            v-model="form[field.name]"
            :required="field.required"
            class="form-control"
          />
        </div>
        <div class="button-group">
          <button type="submit" class="btn btn-primary">Enviar</button>
          <button type="button" @click="closeModal" class="btn btn-secondary">Fechar</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  isVisible: {
    type: Boolean,
    required: true
  },
  fields: {
    type: Array,
    required: true
  }
});

const emit = defineEmits(['close']);

const form = ref({});

watch(() => props.fields, (newFields) => {
  newFields.forEach(field => {
    if (!(field.name in form.value)) {
      form.value[field.name] = '';
    }
  });
}, { immediate: true });

const closeModal = () => {
  emit('close');
};

const submitForm = () => {
  console.log('Form data:', form.value);
  closeModal();
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal {
  display: flex;
  background: white;
  padding: 20px;
  border-radius: 8px;
  max-width: 1000px;
  width: 100%;
  max-height: 80vh;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  overflow-y: scroll;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

.form-control {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
}

.form-control:focus {
  border-color: #007bff;
  outline: none;
}

textarea.form-control {
  resize: vertical;
}

.button-group {
  display: flex;
  justify-content: flex-end;
}

.btn {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  margin-left: 10px;
}

.btn-primary {
  background-color: #007bff;
  color: white;
}

.btn-primary:hover {
  background-color: #0056b3;
}

.btn-secondary {
  background-color: #6c757d;
  color: white;
}

.btn-secondary:hover {
  background-color: #565e64;
}
</style>
