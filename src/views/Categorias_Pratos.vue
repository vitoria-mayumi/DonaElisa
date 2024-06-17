<template>
    <main class="home-page">
      <h1>Categorias de Pratos</h1>
      <SearchBar :searchTerm="searchTerm" @update:searchTerm="updateSearchTerm" />
      <TableComponent :data="filteredData" :columns="tableColumns" :rowsPerPage="10" />
      <div class="add-section">
        <AddButton @click="showModal" />
        <ModalCadastro :isVisible="isModalVisible" @close="isModalVisible = false" :fields="currentFields"/>
      </div>
    </main>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue';
  import TableComponent from '../components/Table.vue';
  import SearchBar from '../components/Searchbar.vue';
  import AddButton from '../components/ButtonAdd.vue';
  import ModalCadastro from '../components/ModalCadastro.vue';
  
  const tableData = ref([
    { codigo: '1', nome: 'Especial Natal', descricao: 'Pratos para o Natal' },
    { codigo: '2', nome: 'Fritos', descricao: 'Pratos Fritos' }
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
  
  const isModalVisible = ref(false);
  const currentFields = ref([]);

  const contactFields = [
    { name: 'name', label: 'Nome da Categoria*', type: 'text', required: true, width: '100%' },
    { name: 'descricao', label: 'Descrição', type: 'text', required: false, width: '100%' }
  ];

  const showModal = () => {
    currentFields.value = contactFields;
    isModalVisible.value = true;
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
  