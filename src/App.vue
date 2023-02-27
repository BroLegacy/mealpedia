<template>
  <main>
      <div>
        <nav>
          <router-link to="/">Accueil</router-link>
          <router-link to="/random">Random</router-link>
          <router-link to="/name">Name</router-link>
          <router-link to="/ingredient">ingredient</router-link>
          <router-link to="/category">Category</router-link>
          <router-link to="/zone">Zone</router-link>
        </nav>
        <router-view />
      </div>
  </main>
</template>