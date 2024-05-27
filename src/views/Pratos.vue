<template>
    <div class="home-container">
      <button @click="goToForm" class="cadastrar-button">Cadastrar</button>
    </div>
  </template>
  
  <script>
  export default {
    methods: {
      goToForm() {
        this.$router.push('/form');
      }
    }
  }
  </script>
  
  <style scoped>
  .home-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }
  
  .cadastrar-button {
    background-color: #007BFF;
    color: white;
    padding: 15px 30px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 18px;
  }
  
  .cadastrar-button:hover {
    background-color: #0056b3;
  }
  </style>
  
  
  
  
  