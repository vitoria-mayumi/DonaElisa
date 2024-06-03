<template>
  <button @click="onAdd" class="add-button">Adicionar</button>
</template>

<script setup>
const emit = defineEmits(['add']);

const onAdd = () => {
  emit('add');
};
</script>

<style scoped>
.add-button {
  padding: 0.5rem 1rem;
  background-color: #4CAF50;
  color: white;
  border: none;
  cursor: pointer;
}

.add-button:hover {
  background-color: #45a049;
}
</style>