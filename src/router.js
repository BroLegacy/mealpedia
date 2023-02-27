import { createRouter, createWebHistory } from 'vue-router'
import Random from "@/components/Random.vue";
import ByIngredient from "@/components/ByIngredient.vue";
import ByName from "@/components/ByName.vue";
import ByCategory from "@/components/ByCategory.vue";
import ByZone from "@/components/ByZone.vue";
import MealDetails from "@/components/MealDetails.vue";

const routes = [
    { path: '/random', component: Random },
    { path: '/ingredient', component: ByIngredient },
    { path: '/name', component: ByName },
    { path: '/category', component: ByCategory },
    { path: '/zone', component: ByZone },
    { path: '/meals/:id', name: 'meal-details', component: MealDetails, props: true }


]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
