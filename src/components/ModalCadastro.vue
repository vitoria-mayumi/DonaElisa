<template>
  <div v-if="isVisible" class="modal-overlay">
    <div class="modal">
      <h2>Formulário de Contato</h2>
      <form @submit.prevent="submitForm">
        <div class="form-group">
          <label for="name">Nome:</label>
          <input type="text" id="name" v-model="form.name" required />
        </div>
        <div class="form-group">
          <label for="email">Email:</label>
          <input type="email" id="email" v-model="form.email" required />
        </div>
        <div class="form-group">
          <label for="message">Mensagem:</label>
          <textarea id="message" v-model="form.message" required></textarea>
        </div>
        <button type="submit">Enviar</button>
        <button type="button" @click="closeModal">Fechar</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
  isVisible: {
    type: Boolean,
    required: true
  }
});

const emit = defineEmits(['close']);

const form = ref({
  name: '',
  email: '',
  message: ''
});

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
  background: white;
  padding: 20px;
  border-radius: 8px;
  max-width: 500px;
  width: 100%;
}

.form-group {
  margin-bottom: 15px;
}

button {
  margin-right: 10px;
}
</style>
