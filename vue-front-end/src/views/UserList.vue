<script>
import axios from 'axios';

export default {
    data() {
        return {
            users: [],
        };
    },
    async created() {
        try {
            // Récupération des utilisateurs
            const response = await axios.get("http://localhost:3000/users");
            this.users = response.data.data;
        } catch (error) {
            console.error("Erreur lors de la récupération des utilisateurs :", error);
        }
    },
    methods: {
        async deleteUser(id) {
            const response = await axios.delete(`http://localhost:3000/users/delete/${id}`);

            if (response.status !== 200) {
                console.log("Failed to delete the user");
                return;
            }

            // refresh the data
            this.users = this.users.filter((u) => u.id !== id);
        }
    }
};
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
                <tr v-for="user in users">
                    <td>{{ user.id }}</td>
                    <td>{{ user.name }}</td>
                    <td>{{ user.age }}</td>
                    <td>
                        <!-- SPA = Single Page Application -> no reload -->
                        <RouterLink :to="{ name: 'UserDetails', params: { id: user.id } }">
                            Détails
                        </RouterLink>
                    </td>
                    <td>Modifier</td>
                    <td><button @click="deleteUser(user.id)">Supprimer</button></td>
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
    font-family: Arial, Helvetica, sans-serif;
    border-collapse: collapse;
    width:100%;
}

table th {
    padding-top: 1em;
    padding-bottom: 1em;
    text-align: left;
    background-color: #05404f;
    color: white;
}

table td,
table th {
    border: 1px solid #ddd;
    padding: 1em;
}

table tr:nth-child(even) {
    background-color: #f2f2f2;
}

table tr:hover {
    background-color: #ddd;
}
</style>
