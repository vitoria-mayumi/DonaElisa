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
            <textarea
              v-if="field.type === 'textarea'"
              :id="field.name"
              v-model="form[field.name]"
              :required="field.required"
              :placeholder="field.placeholder"
              class="form-control"
            />
            <select
              v-else-if="field.type === 'combobox'"
              :id="field.name"
              v-model="form[field.name]"
              :required="field.required"
              class="form-control"
            >
              <option v-for="option in field.options" :key="option" :value="option">{{ option }}</option>
            </select>
            <div v-else-if="field.type === 'file'" class="file-input-wrapper">
              <input
                type="file"
                :id="field.name"
                @change="handleFileUpload($event, field.name)"
                :required="field.required"
                class="form-control file-input"
              />
              <span class="material-icons file-icon">attach_file</span>
            </div>
            <input
              v-else
              :type="field.type"
              :id="field.name"
              v-model="form[field.name]"
              :required="field.required"
              :placeholder="field.placeholder"
              class="form-control"
              @input="applyMask(field.name, $event)"
            />
          </div>
        </div>
        <div class="container-btn-enviar">
          <div class="btn-enviar">
            <button type="submit" @click="submitForm" class="btn btn-primary">
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
  },
  apiEndpoint: {
    type: String,
    required: true,
  },
  rowData: { 
    type: Object,
    default: () => ({}),
  }
});

const emit = defineEmits(['close', 'cadastroRealizado']);

const form = ref({});

watch(() => props.fields, (newFields) => {
  newFields.forEach(field => {
    if (!(field.name in form.value)) {
      form.value[field.name] = props.rowData[field.name] || '';
    }
  });
}, { immediate: true });

const closeModal = () => {
  emit('close');
};

const submitForm = async () => {
  console.log(form.value)
  try {
    const response = await fetch(props.apiEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form.value), 
    });

    if (!response.ok) {
      throw new Error('Erro ao cadastrar');
    }

    const result = await response.json();
    console.log('Cadastro realizado com sucesso:', result);

    emit('cadastroRealizado', result); 

    closeModal(); 
  } catch (error) {
    console.error('Erro ao enviar o formulário:', error);
  }
};

const applyMask = (fieldName, event) => {
  let value = event.target.value;

  switch (fieldName) {
    case 'cep':
      value = value.replace(/\D/g, '').slice(0, 8);
      if (value.length > 5) {
        value = value.slice(0, 5) + '-' + value.slice(5);
      }
      break;
    case 'CPF':
      value = value.replace(/\D/g, '').slice(0, 11);
      if (value.length > 9) {
        value = value.slice(0, 3) + '.' + value.slice(3, 6) + '.' + value.slice(6, 9) + '-' + value.slice(9, 11);
      } else if (value.length > 6) {
        value = value.slice(0, 3) + '.' + value.slice(3, 6) + '.' + value.slice(6);
      } else if (value.length > 3) {
        value = value.slice(0, 3) + '.' + value.slice(3);
      }
      break;
    case 'telefone':
      value = value.replace(/\D/g, '').slice(0, 11);
      if (value.length > 10) {
        value = '(' + value.slice(0, 2) + ')' + value.slice(2, 7) + '-' + value.slice(7);
      } else if (value.length > 6) {
        value = '(' + value.slice(0, 2) + ')' + value.slice(2, 6) + '-' + value.slice(6);
      } else if (value.length > 2) {
        value = '(' + value.slice(0, 2) + ')' + value.slice(2);
      }
      break;
  }

  event.target.value = value;
  form.value[fieldName] = value;
};

const handleFileUpload = (event, fieldName) => {
  const file = event.target.files[0];
  form.value[fieldName] = file;
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

.file-input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.file-input {
  padding-right: 40px; /* Space for the icon */
}

.file-icon {
  position: absolute;
  right: 10px;
  font-size: 24px;
  color: #ccc;
}

.file-input-wrapper .file-input:focus + .file-icon {
  color: #383838;
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
