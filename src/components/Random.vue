<template>
  <div>
    <h2>Plat Aléatoire</h2>
    <button @click="getRandomMeal">Afficher un plat aléatoire</button>
    <div v-if="meal">
      <h3>{{ meal.strMeal }}</h3>
      <img :src="meal.strMealThumb" :alt="meal.strMeal" />
      <p><strong>Catégorie:</strong> {{ meal.strCategory }}</p>
      <p><strong>Origine:</strong> {{ meal.strArea }}</p>
      <h4>Ingrédients:</h4>
      <ul>
        <li v-for="ingredient in ingredients">{{ ingredient }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      meal: null,
      ingredients: [],
    };
  },
  methods: {
    getRandomMeal() {
      axios.get('https://www.themealdb.com/api/json/v1/1/random.php')
          .then(response => {
            this.meal = response.data.meals[0];
            this.ingredients = this.getIngredients(this.meal);
          })
          .catch(error => console.log(error));
    },
    getIngredients(meal) {
      const ingredients = [];
      for (let i = 1; i <= 15; i++) {
        const ingredient = meal[`strIngredient${i}`];
        const measure = meal[`strMeasure${i}`];
        if (ingredient && measure) {
          ingredients.push(`${ingredient} - ${measure}`);
        }
      }
      return ingredients;
    },
  },
};
</script>
