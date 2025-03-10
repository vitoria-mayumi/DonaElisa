<template>
  <div class="table-container">
    <div class="actions">
      <button @click="handleDeleteAction">
        <span class="material-icons">delete</span>
      </button>
      <button @click="handleEditAction">
        <span class="material-icons">edit</span>
      </button>
    </div>
    <div class="table-wrapper">
      <table class="table">
        <thead>
          <tr>
            <th>
              <input type="checkbox" @change="toggleSelectAll" :checked="isAllSelected"/>
            </th>
            <th v-for="(column, index) in columns" :key="index">
              {{ column.label }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, index) in paginatedData" :key="index">
            <td>
              <input type="checkbox" v-model="selectedRows" :value="row"/>
            </td>
            <td v-for="(column, index) in columns" :key="index">
              <img v-if="column.type === 'image'" :src="row[column.key]" alt="Image" />
              <span v-else>{{ row[column.key] }}</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="pagination">
      <button @click="prevPage" :disabled="currentPage === 1">
        <span class="material-icons">chevron_left</span>
      </button>
      <span>página {{ currentPage }} / {{ totalPages }}</span>
      <button @click="nextPage" :disabled="currentPage === totalPages">
        <span class="material-icons">chevron_right</span>
      </button>
    </div>
    <transition name="fade">
      <div class="notification" v-if="showNotification">
        <p>{{ notificationMessage }}</p>
        <button @click="dismissNotification">
          <span class="material-icons">cancel</span>
        </button>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const props = defineProps({
  data: Array,
  columns: Array,
  rowsPerPage: {
    type: Number,
    default: 10
  }
});

const currentPage = ref(1);
const sortedColumn = ref('');
const sortOrder = ref('asc');

const selectedRows = ref([]);

const sortedData = computed(() => {
  if (!sortedColumn.value) return props.data;

  return [...props.data].sort((a, b) => {
    if (a[sortedColumn.value] < b[sortedColumn.value]) return sortOrder.value === 'asc' ? -1 : 1;
    if (a[sortedColumn.value] > b[sortedColumn.value]) return sortOrder.value === 'asc' ? 1 : -1;
    return 0;
  });
});

const totalPages = computed(() => Math.ceil(props.data.length / props.rowsPerPage));

const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * props.rowsPerPage;
  const end = start + props.rowsPerPage;
  return sortedData.value.slice(start, end);
});

const sortColumn = (column) => {
  if (sortedColumn.value === column.key) {
    sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc';
  } else {
    sortedColumn.value = column.key;
    sortOrder.value = 'asc';
  }
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
};

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};

const toggleSelectAll = (event) => {
  if (event.target.checked) {
    selectedRows.value = [...selectedRows.value, ...paginatedData.value];
  } else {
    selectedRows.value = selectedRows.value.filter(row => !paginatedData.value.includes(row));
  }
};

const isAllSelected = computed(() => {
  return paginatedData.value.length && selectedRows.value.length === paginatedData.value.length;
});

const hasSelectedRows = computed(() => selectedRows.value.length > 0);

const showNotification = ref(false);
const notificationMessage = ref('');

const handleDeleteAction = () => {
  if (!hasSelectedRows.value) {
    notificationMessage.value = 'Nenhuma linha selecionada. Selecione uma linha para excluir.';
    showNotification.value = true;
    setTimeout(() => {
      showNotification.value = false;
    }, 5000); 
    return;
  }
  deleteSelectedRows();
};

const handleEditAction = () => {
  if (!hasSelectedRows.value) {
    notificationMessage.value = 'Nenhuma linha selecionada. Selecione uma linha para editar.';
    showNotification.value = true;
    setTimeout(() => {
      showNotification.value = false;
    }, 5000); 
    return;
  }
  editSelectedRows();
};

const dismissNotification = () => {
  showNotification.value = false;
};
</script>

<style lang="scss" scoped>
.table-container {
  
  position: relative;
}

.actions {
  display: flex;
  align-items: center;
  gap: .5rem;
  margin-bottom: .5rem;

  button {
    border: none;
    background-color: transparent;

    .material-icons {
      font-size: 1.2rem;
      color: #5a5a5a;
      cursor: pointer;
      transition: .2s ease-out;
    }
  }

  .material-icons:hover {
    color: #b5b5b5;
  }
}

.table-wrapper {
  overflow: auto;
  border: 1.5px solid #ddd;
  border-radius: 10px;
}

.table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
}

.table th, .table td {
  padding: 0.7rem 1rem 0.7rem 0.5rem;
  border-bottom: 1px solid #ddd;
  text-align: left;
  font-size: .9rem;
  color: #5a5a5a;
  white-space: nowrap;

  img {
    max-width: 40px;
    height: auto;
    border-radius: 3px;
  }
}

.table th:first-child, .table td:first-child {
  width: 50px; 
}

.table th {
  background-color: #f4f4f4;
}

.table tr:last-child td {
  border-bottom: none;
}

.table td:nth-child(2n) {
  padding: 0 0 0 1rem;
}

input[type=checkbox] {
  position: relative;
  cursor: pointer;
}

input[type=checkbox]:before {
  content: "";
  display: block;
  position: absolute;
  width: 18px;
  height: 18px;
  top: 0;
  left: 0;
  background-color: #f4f4f4;
  border: 1px solid #b5b5b5;
  border-radius: 3px;
}

input[type=checkbox]:checked:before {
  content: "";
  display: block;
  position: absolute;
  width: 18px;
  height: 18px;
  top: 0;
  left: 0;
  background-color: #940000;
}

input[type=checkbox]:checked:after {
  content: "";
  display: block;
  width: 5px;
  height: 10px;
  border: solid white;
  border-width: 0 2px 2px 0;
  -webkit-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
  position: absolute;
  top: 2px;
  left: 6px;
}

.table th {
  background-color: #f4f4f4;
}

.table tr:last-child td {
  border-bottom: none;
}

.table th span {
  margin-left: 0;
}

.pagination {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-top: 1rem;
  font-size: .8rem;
  color: #5a5a5a;
}

.pagination button {
  border: none;
  background-color: transparent;
  cursor: pointer;
  padding: 0 .5rem 0 .5rem;
}

.pagination button .material-icons {
  font-size: 1.2rem;
}

.pagination button:disabled {
  cursor: not-allowed;
}

.notification {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: rgba(189, 4, 4, 0.811);
  color: white;
  padding: 15px;
  border-radius: 5px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: .5rem;
}

.notification p {
  margin: 0;
  flex-grow: 1;
}

.notification button {
  background-color: transparent;
  border: none;
  color: white;
  cursor: pointer;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
