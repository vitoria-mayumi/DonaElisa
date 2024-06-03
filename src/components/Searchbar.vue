<template>
  <div class="search">
    <input
      type="text"
      placeholder="Pesquisar..."
      :value="searchTerm"
      @input="onSearch"
      class="search-bar"
    />
    <span class="material-icons">search</span>
  </div>
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

<style lang="scss" scoped>
.search {
  width: 100%;
  position: relative;
  display: inline-block;

  .material-icons {
    position: absolute;
    left: 10px; 
    top: 50%;
    transform: translateY(-50%);
    pointer-events: none; 

    font-size: 1rem;
    color: #a0a0a0;
  }
}
.search-bar {
  margin: 2rem 0 2rem 0;
  padding: 0.5rem 2rem 0.5rem 2rem;
  width: 100%;
  max-width: 400px;
  background-color: #F5F5F5;
  border: 1px solid #a0a0a0;
  border-radius: 8px;
}
</style>
