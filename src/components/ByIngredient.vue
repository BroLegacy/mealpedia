<template>
  <div>
    <h1>Recherche de plats par ingrédient</h1>
    <div>
      <label for="ingredient">Ingrédient :</label>
      <input type="text" v-model="ingredient" id="ingredient" @keyup.enter="searchMeals"/>
      <button @click="searchMeals">Rechercher</button>
    </div>
    <div v-if="meals && meals.length">
      <h2>{{ meals.length }} résultats :</h2>
      <ul>
        <li v-for="meal in meals" :key="meal.idMeal">
          <router-link :to="{ name: 'meal-details', params: { id: meal.idMeal } }">{{ meal.strMeal }}</router-link>        </li>
      </ul>
    </div>
    <div v-else-if="ingredient===''">
      <p>Veuillez saisir un ingredient.</p>
    </div>
    <div v-else>
      <p>Aucun résultat pour cette recherche.</p>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "SearchByIngredient",
  data() {
    return {
      ingredient: "",
      meals: [],
    };
  },
  methods: {
    searchMeals() {
      if (!this.ingredient) {
        return;
      }
      axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${this.ingredient}`)
          .then((response) => {
            this.meals = response.data.meals;
          })
          .catch((error) => {
            console.error(error);
          });
    },
  },
};
</script>
