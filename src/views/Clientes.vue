<template>
  <main class="home-page">
    <h1>Clientes</h1>
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
  { codigo: '1', nome: 'Jho', cpf: '111.222.333-44', telefone: '(11)11111-1111', endereco: 'Rua Um, 1', bairro: 'Saudade', cidade: 'Garça', estado: 'SP'}
]);

const tableColumns = [
  { label: 'Código', key: 'codigo' },
  { label: 'Nome', key: 'nome' },
  { label: 'CPF', key: 'cpf' },
  { label: 'Telefone', key: 'telefone' },
  { label: 'Endereço', key: 'endereco' },
  { label: 'Bairro', key: 'bairro' },
  { label: 'Cidade', key: 'cidade' },
  { label: 'Estado', key: 'estado' },
];

const searchTerm = ref('');

const updateSearchTerm = (newTerm) => {
  searchTerm.value = newTerm;
};

const filteredData = computed(() => {
  return tableData.value.filter((item) =>
      item.codigo.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
      item.nome.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
      item.cpf.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
      item.telefone.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
      item.endereco.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
      item.bairro.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
      item.cidade.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
      item.estado.toLowerCase().includes(searchTerm.value.toLowerCase()) 
  );
});

const isModalVisible = ref(false);
const currentFields = ref([]);

const contactFields = [
  { name: 'name', label: 'Nome*', type: 'text', required: true, width: '100%', placeholder: '' },
  { name: 'cpf', label: 'CPF*', type: 'text', required: true, width: '30%', placeholder: '000.000.000-00' },
  { name: 'telefone', label: 'Telefone*', type: 'text', required: true, width: '50%', placeholder: '(00)00000-0000' },
  { name: 'cep', label: 'CEP', type: 'text', required: false, width: '30%', placeholder: '00000-000' },
  { name: 'cidade', label: 'Cidade*', type: 'text', required: true, width: '30%', placeholder: '' },
  { name: 'estado', label: 'Estado*', type: 'text', required: true, width: '30%', placeholder: '' },
  { name: 'bairro', label: 'Bairro*', type: 'text', required: true, width: '100%', placeholder: '' },
  { name: 'endereco', label: 'Endereço*', type: 'text', required: true, width: '50%', placeholder: '' },
  { name: 'numero', label: 'Número*', type: 'text', required: true, width: '10%', placeholder: '' }
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
