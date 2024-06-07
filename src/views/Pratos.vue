<template>
    <main class="home-page">
      <h1>Pratos</h1>
      <SearchBar :searchTerm="searchTerm" @update:searchTerm="updateSearchTerm" />
      <TableComponent :data="filteredData" :columns="tableColumnsWithImage" :rowsPerPage="10" />
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
    { codigo: '1', nome: 'Jho', medida: '11.222.333-4', categoria: '11)11111-111', descricao: ' Um, 1', imagem: 'src/assets/prato.jpg' }
  ]);

 const tableColumns = [
    { label: 'Código', key: 'codigo' },
    { label: 'Nome', key: 'nome' },
    { label: 'Medida', key: 'medida' },
    { label: 'Categoria', key: 'categoria' },
    { label: 'Descrição', key: 'descricao' }
  ];

  const tableColumnsWithImage = [
    { label: '', key: 'imagem', type: 'image' }, 
    ...tableColumns
  ];
  
  const searchTerm = ref('');
  
  const updateSearchTerm = (newTerm) => {
    searchTerm.value = newTerm;
  };
  
  const filteredData = computed(() => {
    return tableData.value.filter((item) =>
        item.codigo.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
        item.nome.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
        item.medida.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
        item.categoria.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
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
    margin-top: .1rem;
  }
  </style>
  