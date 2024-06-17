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
  { 
    codigo: '1',
    nome: 'Ana de Souza',
    cpf: '111.222.333-44',
    telefone: '(11)11111-1111',
    endereco: 'Rua Um, 1',
    bairro: 'Saudade',
    cidade: 'Garça',
    estado: 'SP'
  },
  { 
    codigo: '2', 
    nome: 'Carlos Silva', 
    cpf: '222.333.444-55', 
    telefone: '(21)22222-2222', 
    endereco: 'Avenida Dois, 2', 
    bairro: 'Centro', 
    cidade: 'Rio de Janeiro', 
    estado: 'RJ'
  },
  { 
    codigo: '3', 
    nome: 'Mariana Oliveira', 
    cpf: '333.444.555-66', 
    telefone: '(31)33333-3333', 
    endereco: 'Rua Três, 3', 
    bairro: 'Jardins', 
    cidade: 'Belo Horizonte', 
    estado: 'MG'
  },
  { 
    codigo: '4', 
    nome: 'Pedro Lima', 
    cpf: '444.555.666-77', 
    telefone: '(41)44444-4444', 
    endereco: 'Avenida Quatro, 4', 
    bairro: 'Centro Cívico', 
    cidade: 'Curitiba', 
    estado: 'PR'
  },
  { 
    codigo: '5', 
    nome: 'Julia Santos', 
    cpf: '555.666.777-88', 
    telefone: '(51)55555-5555', 
    endereco: 'Rua Cinco, 5', 
    bairro: 'Cidade Baixa', 
    cidade: 'Porto Alegre', 
    estado: 'RS'
  },
  { 
    codigo: '6', 
    nome: 'Roberto Almeida', 
    cpf: '666.777.888-99', 
    telefone: '(61)66666-6666', 
    endereco: 'Avenida Seis, 6', 
    bairro: 'Asa Sul', 
    cidade: 'Brasília', 
    estado: 'DF'
  },
  { 
    codigo: '7', 
    nome: 'Fernanda Costa', 
    cpf: '777.888.999-00', 
    telefone: '(71)77777-7777', 
    endereco: 'Rua Sete, 7', 
    bairro: 'Pelourinho', 
    cidade: 'Salvador', 
    estado: 'BA'
  },
  { 
    codigo: '8', 
    nome: 'Lucas Martins', 
    cpf: '888.999.000-11', 
    telefone: '(81)88888-8888', 
    endereco: 'Avenida Oito, 8', 
    bairro: 'Boa Viagem', 
    cidade: 'Recife', 
    estado: 'PE'
  },
  { 
    codigo: '9', 
    nome: 'Isabela Ferreira', 
    cpf: '999.000.111-22', 
    telefone: '(91)99999-9999', 
    endereco: 'Rua Nove, 9', 
    bairro: 'Cidade Velha', 
    cidade: 'Belém', 
    estado: 'PA'
  },
  { 
    codigo: '10', 
    nome: 'Thiago Rocha', 
    cpf: '000.111.222-33', 
    telefone: '(11)10101-0101', 
    endereco: 'Avenida Dez, 10', 
    bairro: 'Vila Mariana', 
    cidade: 'São Paulo', 
    estado: 'SP'
  },
  { 
    codigo: '11', 
    nome: 'Beatriz Azevedo', 
    cpf: '111.222.333-44', 
    telefone: '(11)11111-1111', 
    endereco: 'Rua Onze, 11', 
    bairro: 'Moema', 
    cidade: 'São Paulo', 
    estado: 'SP'
  }

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
