<script setup>
import { ref, onMounted } from 'vue'

const items = ref([]);

onMounted(() => {
    const myRequest = new Request("http://localhost:3000/users");

    // Récupérer les données du serveur
    window.fetch(myRequest)
        .then((res) => {
            console.log("After fetch");
            return res.json();
        })
        .then((JsonResponse) => {
            // L'objet JSON contient de nombreux éléments ;
            // on a seulement besoin de la clé "data" qui contient le tableau d'utilisateurs
            items.value = JsonResponse.data;
        });
});
</script>

<template>
    <main>
        <table>
            <caption>
                Liste utilisateurs
            </caption>
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Age</th>
                    <th>Détails</th>
                    <th>Modifier</th>
                    <th>Supprimer</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in items">
                    <td>{{ item.id }}</td>
                    <td>{{ item.name }}</td>
                    <td>{{ item.age }}</td>
                    <td>Détails</td>
                    <td>Modifier</td>
                    <td>Supprimer</td>
                </tr>
            </tbody>
        </table>
    </main>
</template>

<style scoped>
caption {
    padding: 1em;
    font-size: larger;
}

table {
    margin: 3em auto;
    border-collapse: collapse;
    background: #F0FFFF;
}

th,
td {
    padding: 1em;
    border: 0.15em solid rgba(93, 138, 168, 0.4);
}

td {
    text-align: center;
}
</style>
