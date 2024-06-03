<template>
  <button @click="onAdd" class="add-button">
    <span class="material-icons">add_circle</span>
    Adicionar
  </button>
</template>

<script setup>
const emit = defineEmits(['add']);

const onAdd = () => {
  emit('add');
};
</script>

<style lang="scss" scoped>
.add-button {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  gap: .3rem;

  padding: 0.5rem 1rem;
  background-color: #068722;
  color: white;

  border: none;
  border-radius: 5px;
  cursor: pointer;

  transition: .2s ease-out;

  .material-icons {
    font-size: 1rem;
  }
}

.add-button:hover {
  background-color: #45a049;
}
</style>