<template>
    <main class="home-page">
      <h1>Usuários</h1>
      <SearchBar :searchTerm="searchTerm" @update:searchTerm="updateSearchTerm" />
      <TableComponent :data="filteredData" :columns="tableColumns" :rowsPerPage="10" />
      <div class="add-section">
        <AddButton @click="showModal" />
      </div>
      <ModalCadastro :isVisible="isModalVisible" @close="isModalVisible = false" :fields="currentFields"/>
    </main>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue';
  import TableComponent from '../components/Table.vue';
  import SearchBar from '../components/Searchbar.vue';
  import AddButton from '../components/ButtonAdd.vue';
  import ModalCadastro from '../components/ModalCadastro.vue';
  
  const tableData = ref([
    { codigo: '1', nome: 'Jho', tipo: '(11)11111-1111' }
  ]);
  
  const tableColumns = [
    { label: 'Código', key: 'codigo' },
    { label: 'Nome', key: 'nome' },
    { label: 'Tipo', key: 'tipo' }
  ];
  
  const searchTerm = ref('');
  
  const updateSearchTerm = (newTerm) => {
    searchTerm.value = newTerm;
  };
  
  const filteredData = computed(() => {
    return tableData.value.filter((item) =>
        item.codigo.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
        item.nome.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
        item.tipo.toLowerCase().includes(searchTerm.value.toLowerCase()) 
    );
  });
  
  const isModalVisible = ref(false);
  const currentFields = ref([]);
  
  const contactFields = [
    { name: 'usuario', label: 'Usuário*', type: 'text', required: true, width: '100%', placeholder: '' },
    { name: 'senha', label: 'Senha*', type: 'text', required: true, width: '100%', placeholder: '' },
    { name: 'confirmar_senha', label: 'Confirmar Senha*', type: 'text', required: true, width: '100%', placeholder: '' },
    { name: 'tipo', label: 'Tipo do Usuário*', type: 'combobox', required: true, width: '30%', options: ['Male', 'Female', 'Other'] }
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
  