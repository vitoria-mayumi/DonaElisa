<template>
  <main class="home-page">
    <h1>Cadastro de Clientes</h1>
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
  { codigo: '1', nome: 'Jhon', cpf: '111.222.333-44', telefone: '(11)11111-1111', endereco: 'Rua Um, 1' },
  { codigo: '2', nome: 'Maria', cpf: '231.222.444-44', telefone: '(11)11111-1111', endereco: 'Rua Um, 1' },
  { codigo: '3', nome: 'Ana', cpf: '552.222.999-44', telefone: '(11)11111-1111', endereco: 'Rua Um, 1' },
  { codigo: '1', nome: 'Jhon', cpf: '111.222.333-44', telefone: '(11)11111-1111', endereco: 'Rua Um, 1' },
  { codigo: '2', nome: 'Maria', cpf: '231.222.444-44', telefone: '(11)11111-1111', endereco: 'Rua Um, 1' },
  { codigo: '3', nome: 'Ana', cpf: '552.222.999-44', telefone: '(11)11111-1111', endereco: 'Rua Um, 1' },
  { codigo: '1', nome: 'Jhon', cpf: '111.222.333-44', telefone: '(11)11111-1111', endereco: 'Rua Um, 1' },
  { codigo: '2', nome: 'Maria', cpf: '231.222.444-44', telefone: '(11)11111-1111', endereco: 'Rua Um, 1' },
  { codigo: '3', nome: 'Ana', cpf: '552.222.999-44', telefone: '(11)11111-1111', endereco: 'Rua Um, 1' },
  { codigo: '1', nome: 'Jhon', cpf: '111.222.333-44', telefone: '(11)11111-1111', endereco: 'Rua Um, 1' },
  { codigo: '2', nome: 'Maria', cpf: '231.222.444-44', telefone: '(11)11111-1111', endereco: 'Rua Um, 1' },
  { codigo: '3', nome: 'Ana', cpf: '552.222.999-44', telefone: '(11)11111-1111', endereco: 'Rua Um, 1' },
  { codigo: '1', nome: 'Jhon', cpf: '111.222.333-44', telefone: '(11)11111-1111', endereco: 'Rua Um, 1' },
  { codigo: '2', nome: 'Maria', cpf: '231.222.444-44', telefone: '(11)11111-1111', endereco: 'Rua Um, 1' },
  { codigo: '3', nome: 'Ana', cpf: '552.222.999-44', telefone: '(11)11111-1111', endereco: 'Rua Um, 1' },
]);

const tableColumns = [
  { label: 'Código', key: 'codigo' },
  { label: 'Nome', key: 'nome' },
  { label: 'CPF', key: 'cpf' },
  { label: 'Telefone', key: 'telefone' },
  { label: 'Endereço', key: 'endereco' },
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
      item.endereco.toLowerCase().includes(searchTerm.value.toLowerCase())
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
