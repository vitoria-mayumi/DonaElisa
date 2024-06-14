<template>
  <div v-if="isVisible" class="modal-overlay">
    <div class="modal">
      <div class="btn-fechar">
        <button type="button" @click="closeModal" class="btn btn-secondary">
          <span class="material-icons">
            close
          </span>
        </button>
      </div>
      <form @submit.prevent="submitForm">
        <div class="form-content">
          <div
            v-for="(field, index) in fields"
            :key="index"
            class="form-group"
            :style="{ flex: `1 1 ${field.width}` }"
          >
          <label :for="field.name">{{ field.label }}</label>
            <component
              v-if="field.type === 'textarea'" is="textarea"
              :id="field.name"
              v-model="form[field.name]"
              :required="field.required"
              :placeholder="field.placeholder"
              class="form-control"
            />
            <component
              v-else-if="field.type === 'combobox'"
              :is="select"
              :id="field.name"
              v-model="form[field.name]"
              :required="field.required"
              class="form-control"
            >
              <option v-for="option in field.options" :key="option" :value="option">{{ option }}</option>
            </component>
            <component
              v-else
              :is="input"
              :type="field.type"
              :id="field.name"
              v-model="form[field.name]"
              :required="field.required"
              :placeholder="field.placeholder"
              class="form-control"
            />
          </div>
        </div>
        <div class="container-btn-enviar">
          <div class="btn-enviar">
            <button type="submit" class="btn btn-primary">
              Salvar
            </button>
          </div>
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

<style lang="scss" scoped>
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
  padding: 2rem;
  border-radius: 8px;
  max-width: 1000px;
  width: 100%;
  max-height: 80vh;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  overflow-y: auto;
}

.form-content {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
}

.form-group {
  min-width: 200px;
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
}

.form-control {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  width: 100%;
}

.form-control:focus {
  border-color: #383838;
  outline: none;
}

textarea.form-control {
  resize: vertical;
}

.btn-fechar {
  width: 100%;
  display: flex;
  justify-content: right;

  button {
    display: flex;
    align-items: center;
    border: none;
    background-color: transparent;
    cursor: pointer;
    transition: .2s ease-out;

    .material-icons {
      color: #383838;
      font-size: 1.5rem;
    }
  }

  button:hover {
    background-color: #ebeaea;
    border-radius: 100%;
  }
}

.container-btn-enviar {
  display: flex;
  justify-content: right;
  margin-top: 1rem;
}

.btn-enviar {
  display: flex;
  justify-content: center;
  padding: .5rem;
  width: 5rem;
  cursor: pointer;
  background-color: #068722;
  border-radius: 5px;
  transition: .2s ease-out;

  button {
    border: none;
    background-color: transparent;
    cursor: pointer;

    font-weight: 500;
    color: white;
  }
}

.btn-enviar:hover {
  background-color: #09ad2c;
}
</style>
