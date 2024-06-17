<template>
    <main class="home-page">
      <h1>Pratos</h1>
      <SearchBar :searchTerm="searchTerm" @update:searchTerm="updateSearchTerm" />
      <TableComponent :data="filteredData" :columns="tableColumnsWithImage" :rowsPerPage="10" />
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
    { codigo: '1', nome: 'Chester', medida: 'Kg', categoria: 'Especial Natal', descricao: 'Chester ao molho de laranja', imagem: 'src/assets/prato.jpg' }
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
  
  const isModalVisible = ref(false);
  const currentFields = ref([]);

  const contactFields = [
    { name: 'name', label: 'Nome do Prato*', type: 'text', required: true, width: '100%' },
    { name: 'descricao', label: 'Descrição', type: 'text', required: false, width: '100%' },
    { name: 'categoria', label: 'Categoria*', type: 'combobox', required: true, width: '40%', options: ['Especial Natal', 'Fritos'] },
    { name: 'medida', label: 'Unidade de Medida*', type: 'combobox', required: true, width: '40%', options: ['Quilograma(kg)', 'Grama(g)', 'Litro(l)', 'Mililitro(ml)', 'Unidade(un)'] },
    { name: 'imagem', label: 'Imagem', type: 'file', required: true, width: '100%' }
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
  