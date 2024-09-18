<template>
  <v-card variant="elevated" max-width="500px" class="my-6" title="Nouvelle session">
    <v-sheet class="mx-auto, mt-2" width="500">
      <v-form fast-fail @submit.prevent="handleCreation">
        <v-text-field
          v-model="sessioName"
          :rules="[rules.required]"
          placeholder="Session 1"
          label="Nom de la session"
        ></v-text-field>

        <v-text-field
          v-model="username"
          :rules="[rules.required]"
          placeholder="Louise"
          label="Mon nom d'utilisateur"
        ></v-text-field>

        <v-btn
          :disabled="!isValid()"
          class="ma-4 px-10"
          type="submit"
          color="green-lighten-1"
          variant="tonal"
          >Créer</v-btn
        >
      </v-form>
    </v-sheet>
  </v-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'

let sessioName = ref('')
let username = ref('')

const rules = {
  required: (text: string) => !!text || 'Champ requis'
}

const isValid = () => {
  return !!sessioName.value && !!username.value
}

const handleCreation = () => {
  console.log('Creating session with name: ', sessioName.value, ' and username: ', username.value)
}
</script>
