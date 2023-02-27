<template>
  <div>
    <h1>Recherche de plats par ingrédient</h1>
    <label for="ingredient">Ingrédient:</label>
    <select id="ingredient" v-model="selectedIngredient" @change="searchMeal">
      <option value="">Sélectionnez un ingrédient</option>
      <option v-for="ingredient in ingredients" :value="ingredient">{{ ingredient }}</option>
    </select>
    <div v-if="meals && meals.length">
      <h2>{{ meals.length }} {{ meals.length > 1 ? 'résultats' : 'résultat' }} :</h2>
      <ul>
        <li v-for="meal in meals" :key="meal.idMeal">
          <router-link :to="{ name: 'meal-details', params: { id: meal.idMeal } }">{{ meal.strMeal }}</router-link>
        </li>
      </ul>
    </div>
    <div v-else-if="selectedIngredient === ''">

    </div>
    <div v-else>
      <p>Aucun plats n'est associé a cette ingredient.</p>
    </div>
  </div>
</template>
<script>
import axios from 'axios';

export default {
  name: 'SearchMealByIngredient',
  data() {
    return {
      selectedIngredient: '',
      ingredients: [],
      meals: [],
    };
  },
  methods: {
    searchMeal() {
      if (this.selectedIngredient === '') {
        this.meals = [];
        return;
      }

      axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${this.selectedIngredient}`)
          .then(response => {
            this.meals = response.data.meals;
          })
          .catch(error => {
            console.log(error);
          });
    },
    fetchIngredients() {
      axios.get(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
          .then(response => {
            this.ingredients = response.data.meals.map(meal => meal.strIngredient);
          })
          .catch(error => {
            console.log(error);
          });
    },
  },
  mounted() {
    this.fetchIngredients();
  },
};
</script>