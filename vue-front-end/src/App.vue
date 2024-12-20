<script setup>
import { ref, onMounted } from 'vue'

</script>

<template>
    <header>
        <h1>Mon application User</h1>
        <hr>
        <nav>
            <RouterLink to="/">
                Accueil
            </RouterLink> |
            <RouterLink to="/users">
                Utilisateurs
            </RouterLink> |
            <RouterLink to="/users/create">
                Inscrivez-vous
            </RouterLink>
        </nav>
    </header>
    <main>

        <div class="container">
            <RouterView></RouterView>
        </div>
    </main>
</template>

<style scoped>
h1 {
    text-align: center;
}

nav {
    display: flex;
    gap: 1em;
}
</style>
