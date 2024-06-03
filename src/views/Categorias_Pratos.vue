<template>
    <main class="home-page">
      <h1>Cadastro de Categorias de Pratos</h1>
      <SearchBar :searchTerm="searchTerm" @update:searchTerm="updateSearchTerm" />
      <TableComponent :data="filteredData" :columns="tableColumns" :rowsPerPage="10" />
      <div class="add-section">
        <AddButton @add="handleAdd" />
      </div>
    </main>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue';
  import TableComponent from '../components/Table.vue';
  import SearchBar from '../components/Searchbar.vue';
  import AddButton from '../components/ButtonAdd.vue';
  
  const tableData = ref([
    { codigo: '1', nome: 'Jho', descricao: ' Um, 1' },
    { codigo: '2', nome: 'Mar', descricao: 'a Um, 1' },
    { codigo: '3', nome: 'Ana', descricao: 'Um, 1' },
    { codigo: '4', nome: 'Jho', descricao: ' Um, 1' },
    { codigo: '5', nome: 'Mar', descricao: 'a Um, 1' },
    { codigo: '6', nome: 'Ana', descricao: 'Um, 1' },
    { codigo: '7', nome: 'Jho', descricao: ' Um, 1' },
    { codigo: '8', nome: 'Mar', descricao: 'a Um, 1' },
    { codigo: '9', nome: 'Ana', descricao: 'Um, 1' },
    { codigo: '10', nome: 'Jh', descricao: 'a Um, 1' },
    { codigo: '11', nome: 'Ma', descricao: ' Um, 1' },
    { codigo: '12', nome: 'An', descricao: ' Um, 1' },
    { codigo: '13', nome: 'Jh', descricao: 'a Um, 1' },
    { codigo: '14', nome: 'Ma', descricao: ' Um, 1' },
    { codigo: '15', nome: 'An', descricao: ' Um, 1' }
  ]);

 const tableColumns = [
    { label: 'Código', key: 'codigo' },
    { label: 'Nome', key: 'nome' },
    { label: 'Descrição', key: 'descricao' }
  ];
  
  const searchTerm = ref('');
  
  const updateSearchTerm = (newTerm) => {
    searchTerm.value = newTerm;
  };
  
  const filteredData = computed(() => {
    return tableData.value.filter((item) =>
        item.codigo.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
        item.nome.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
        item.descricao.toLowerCase().includes(searchTerm.value.toLowerCase())
    );
  });
  
  const handleAdd = () => {
    // Implement the logic for adding a new entry
  };
  </script>
  
  <style lang="scss" scoped>
  h1 {
    font-size: 1.5rem;
    color: #940000;
  }
  
  .add-section {
    display: flex;
    margin-top: 1rem;
  }
  </style>
  