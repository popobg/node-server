<script>
import axios from 'axios';

export default {
  data() {
    return {
      // Va permettre de stocker les données reçues du serveur
      user: null,
    };
  },
  async created() {

    try {
      const response = await axios.get(`http://localhost:3000/users/${this.$route.params.id}`);
      console.log(response);

      this.user = response.data;
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des détails de l'utilisateur :",
        error
      );
    }
  },
};
</script>

<template>
    <main>
        <div v-if="user">
            <h1>Vos informations</h1>
            <p>Nom : {{ user.name }}</p>
            <p>Âge : {{ user.age }}</p>
        </div>
        <div v-else>
          <p>Chargement des données...</p>
        </div>
    </main>
</template>