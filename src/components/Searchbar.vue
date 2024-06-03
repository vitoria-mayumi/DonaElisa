<template>
  <input
    type="text"
    placeholder="Pesquisar..."
    :value="searchTerm"
    @input="onSearch"
    class="search-bar"
  />
</template>

<script setup>
const props = defineProps({
  searchTerm: {
    type: String,
    required: true
  }
});

const emit = defineEmits(['update:searchTerm']);

const onSearch = (event) => {
  emit('update:searchTerm', event.target.value);
};
</script>

<style scoped>
.search-bar {
  margin: 2rem 0 2rem 0;
  padding: 0.5rem;
  width: 100%;
  max-width: 400px;
  background-color: #F5F5F5;
  border: 1px solid #a0a0a0;
  border-radius: 8px;
}
</style>
