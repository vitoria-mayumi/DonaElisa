<template>
    <div class="table-container">
      <table class="table">
        <thead>
          <tr>
            <th v-for="(column, index) in columns" :key="index" @click="sortColumn(column)">
              {{ column.label }}
              <span v-if="sortedColumn === column.key">
                {{ sortOrder === 'asc' ? '▲' : '▼' }}
              </span>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, index) in paginatedData" :key="index">
            <td v-for="(column, index) in columns" :key="index">
              {{ row[column.key] }}
            </td>
          </tr>
        </tbody>
      </table>
      <div class="pagination">
        <button @click="prevPage" :disabled="currentPage === 1">
          <span class="material-icons">chevron_left</span>
        </button>
        <span>página {{ currentPage }} / {{ totalPages }}</span>
        <button @click="nextPage" :disabled="currentPage === totalPages">
          <span class="material-icons">chevron_right</span>
        </button>
      </div>
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
</script>

<style scoped>
.table-container {
  width: 100%;
  overflow-x: auto;
}

.table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  border: 1.5px solid #ddd;
  border-radius: 10px;
  overflow: hidden;
}

.table th, .table td {
  padding: 0.5rem;
  border-bottom: 1px solid #ddd;
  text-align: left;
  font-size: .9rem;
  color: #5a5a5a;
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
  margin-top: 1rem;
  display: flex;
  justify-content: flex-end;
  align-items: center;
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
</style>

  