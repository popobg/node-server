<script>
import axios from 'axios';

export default {
  data() {
    return {
      name: '',
      age: '',
      message: ''
    };
  },
  methods: {
    async createUser() {
      try {
        const newUser = {
          name: this.name,
          age: this.age
        };
        const response = await axios.post('http://localhost:3000/users/create', newUser);
        this.message = 'Utilisateur créé avec succès !';
        this.name = '';
        this.age = '';
        console.log('Created user:', response.data.data);
      } catch (error) {
        console.error('Erreur lors de la création de l\'utilisateur :', error);
        this.message = 'Erreur lors de la création de l\'utilisateur.';
      }
    },
  },
};
</script>

<template>
  <main>
    <h1>Entrez vos informations :</h1>
    <form @submit.prevent="createUser">
      <div>
        <label for="name">Nom :</label>
        <input type="text" id="name" name="name" v-model="name" required />
      </div>
      <div>
        <label for="age">Âge :</label>
        <input type="number" id="age" name="age" v-model="age" required />
      </div>
      <button type="submit">Créer votre compte</button>
    </form>
    <p v-if="message">{{ message }}</p>
  </main>
</template>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  max-width: 300px;
}
form > div {
  margin-bottom: 1em;
}
</style>
