<template>
  <div>
    <h1>Recherche de plats par zone</h1>
    <label for="zone">Zone:</label>
    <select id="zone" v-model="selectedZone" @change="searchMeal">
      <option value="">Sélectionnez une zone</option>
      <option v-for="zone in zones" :value="zone">{{ zone }}</option>
    </select>
    <div v-if="meals && meals.length">
      <h2>{{ meals.length }} {{ meals.length > 1 ? 'résultats' : 'résultat' }} :</h2>
      <ul>
        <li v-for="meal in meals" :key="meal.idMeal">
          <router-link :to="{ name: 'meal-details', params: { id: meal.idMeal } }">{{ meal.strMeal }}</router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'SearchMealByZone',
  data() {
    return {
      selectedZone: '',
      zones: ['American', 'British', 'Canadian', 'Chinese', 'Dutch', 'Egyptian', 'French', 'Greek', 'Indian', 'Irish', 'Italian', 'Jamaican', 'Japanese', 'Kenyan', 'Malaysian', 'Mexican', 'Moroccan', 'Russian', 'Spanish', 'Thai', 'Tunisian', 'Turkish', 'Unknown', 'Vietnamese'],
      meals: [],
    };
  },
  methods: {
    searchMeal() {
      if (this.selectedZone === '') {
        this.meals = [];
        return;
      }

      axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${this.selectedZone}`)
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
