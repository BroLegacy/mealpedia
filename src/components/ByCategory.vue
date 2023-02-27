<template>
  <div>
    <h2>Recherche de plats par zone</h2>
    <label for="category">Rechercher un plat par catégorie:</label>
    <select id="category" v-model="selectedCategory" @change="searchMealByCategory">
      <option value="">Sélectionner une catégorie</option>
      <option v-for="category in categories" :key="category.strCategory">{{ category.strCategory }}</option>
    </select>

    <ul>
      <li v-for="meal in meals" :key="meal.idMeal">
        <router-link :to="{ name: 'meal-details', params: { id: meal.idMeal } }">{{ meal.strMeal }}</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'SearchMealByCategory',
  data() {
    return {
      selectedCategory: '',
      categories: [],
      meals: [],
    };
  },
  methods: {
    searchCategories() {
      axios.get('https://www.themealdb.com/api/json/v1/1/categories.php')
          .then(response => {
            this.categories = response.data.categories;
          })
          .catch(error => {
            console.log(error);
          });
    },
    searchMealByCategory() {
      if (this.selectedCategory) {
        axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${this.selectedCategory}`)
            .then(response => {
              this.meals = response.data.meals;
            })
            .catch(error => {
              console.log(error);
            });
      } else {
        this.meals = [];
      }
    },
  },
  mounted() {
    this.searchCategories();
  },
};
</script>
