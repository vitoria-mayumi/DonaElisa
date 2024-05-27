<template>
    <div class="form-container">
      <button class="close-button" @click="closeForm">×</button>
      <form @submit.prevent="submitForm" class="styled-form">
        <div class="form-group">
          <label for="name">Nome do Prato*</label>
          <input type="text" id="name" v-model="formData.name" required>
        </div>
        <div class="form-group">
          <label for="descricao">Descrição</label>
          <textarea id="descricao" v-model="formData.descricao"></textarea>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label for="category">Categoria*</label>
            <select id="category" v-model="formData.category" required>
              <option value="" disabled>Selecione a categoria</option>
              <option value="1">Categoria 1</option>
              <option value="2">Categoria 2</option>
              <option value="3">Categoria 3</option>
            </select>
          </div>
          <div class="form-group">
            <label for="unit">Unidade Medida*</label>
            <select id="unit" v-model="formData.unit" required>
              <option value="" disabled>Selecione a unidade de medida</option>
              <option value="kg">Quilograma (kg)</option>
              <option value="g">Grama (g)</option>
              <option value="l">Litro (l)</option>
              <option value="ml">Mililitro (ml)</option>
              <option value="un">Unidade (un)</option>
            </select>
          </div>
        </div>
        <div class="form-group">
          <label for="image">Imagem</label>
          <div class="file-input-wrapper" @click="triggerFileInput">
            <input type="file" id="image" ref="fileInput" accept="image/*" @change="handleFileUpload">
            
            <span v-if="formData.imageName" class="file-name">{{ formData.imageName }}</span>
            <img src="../assets/escolher.png" alt="File Icon" class="file-icon">
          </div>
        </div>
        <button type="submit" class="submit-button">Salvar</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        formData: {
          name: '',
          descricao: '',
          category: '',
          unit: '',
          image: null,
          imageName: ''
        }
      };
    },
    methods: {
      submitForm() {
        console.log('Nome:', this.formData.name);
        console.log('Descrição:', this.formData.descricao);
        console.log('Categoria:', this.formData.category);
        console.log('Unidade de Medida:', this.formData.unit);
        console.log('Imagem:', this.formData.image);
      },
      handleFileUpload(event) {
        const file = event.target.files[0];
        this.formData.image = file;
        this.formData.imageName = file ? file.name : '';
      },
      triggerFileInput() {
        this.$refs.fileInput.click();
      },
      closeForm() {
      this.$router.push('/pratos');
    }
    }
  }
  </script>
  
  <style scoped>
  html, body {
    height: 100%;
    margin: 0;
    font-family: 'Arial', sans-serif;
  }
  
  .form-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
    padding: 20px;
    box-sizing: border-box;
    position: relative;
    width: 100%;
  }
  
  .close-button {
    position: absolute;
    top: 10px;
    right: 10px;
    background: none;
    border: none;
    font-size: 24px;
    color: red;
    cursor: pointer;
  }
  
  .styled-form {
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 600px;
  }
  
  .form-group {
    margin-bottom: 20px;
    width: 100%;
  }
  
  .form-row {
    display: flex;
    justify-content: space-between;
    gap: 20px;
  }
  
  label {
    font-weight: bold;
    color: #333;
    margin-bottom: 8px;
    display: block;
  }
  
  input[type="text"],
  textarea,
  select {
    width: 100%;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 10px;
    box-sizing: border-box;
    transition: border-color 0.3s;
  }
  
  textarea {
    resize: vertical;
  }
  
  input[type="text"]:focus,
  textarea:focus,
  select:focus {
    border-color: #007BFF;
  }
  
  .file-input-wrapper {
    display: flex;
    align-items: center;
    cursor: pointer;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 10px;
    justify-content: space-between;
  }
  
  .file-input-wrapper input[type="file"] {
    display: none;
  }
  
  .file-icon {
    width: 20px;
    height: 20px;
    margin-left: 10px;
  }
  
  .file-name {
    color: #555;
  }
  
  .submit-button {
    background-color: #28a745;
    color: #fff;
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;
    align-self: flex-end;
  }
  
  .submit-button:hover {
    background-color: #218838;
  }
  </style>