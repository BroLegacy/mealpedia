<template>
  <div>
    <h1>Recherche de plats par nom</h1>
    <div>
      <label for="search">Rechercher un plat:</label>
      <input id="search" type="text" v-model="searchTerm" @input="searchMeal">
    </div>
    <div v-if="meals && meals.length">
      <h2>{{ meals.length }} résultats :</h2>
      <ul>
        <li v-for="meal in meals" :key="meal.idMeal">
          <router-link :to="{ name: 'meal-details', params: { id: meal.idMeal } }">{{ meal.strMeal }}</router-link>
        </li>
      </ul>
    </div>
    <div v-else-if="searchTerm===''">
      <p>Veuillez saisir un nom.</p>
    </div>
    <div v-else>
      <p>Aucun résultat pour cette recherche.</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'SearchMeal',
  data() {
    return {
      searchTerm: '',
      meals: [],
    };
  },
  methods: {
    searchMeal() {
      if (this.searchTerm==='') {
        return this.meals = [];
      }
      axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${this.searchTerm}`)
          .then(response => {
            this.meals = response.data.meals;
          })
          .catch(error => {
            console.log(error);
          });
    },
  },
};
</script>
