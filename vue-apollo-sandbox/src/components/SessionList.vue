<template>
  <v-card variant="elevated" max-width="800px" class="my-6" title="Sessions actives">
    <div v-if="error">Error: {{ error?.message }}</div>
    <div v-else-if="activeSessionItems">
      <v-data-table
        :headers="headers"
        :items="activeSessionItems"
        :sort-by="[{ key: 'updatedAt', order: 'asc' }]"
        :loading="loading"
      >
        <template v-slot:item.createdAt="{ item }">
          {{ formatDate(item.createdAt) }}
        </template>
        <template v-slot:item.updatedAt="{ item }">
          {{ formatDate(item.updatedAt) }}
        </template>
        <template v-slot:item.actions="{ item }">
          <v-btn variant="tonal" color="green-lighten-1" @click="joinSession(item.id)"
            >Rejoindre</v-btn
          >
        </template>
      </v-data-table>
    </div>
  </v-card>
</template>

<script setup lang="ts">
// IMPORTS
import { GET_SESSIONS } from '@/graphql/session'
import { useQuery } from '@vue/apollo-composable'
import { ref } from 'vue'

// CONSTANTS AND TYPES
type sessionTabItem = {
  id: number
  sessionName: string
  createdBy: string
  createdAt: Date
  updatedAt: Date
}

const headers = [
  { title: 'Nom', key: 'sessionName' },
  { title: 'Auteur', key: 'createdBy' },
  { title: 'Création', key: 'createdAt' },
  { title: 'Dernière MAJ', key: 'updatedAt' },
  { title: '', key: 'actions', sortable: false }
]

const activeSessionItems = ref(new Array<sessionTabItem>())

const joinSession = (sessionId: number) => {
  console.log('Joining sessionId: ', sessionId)
}

// ACTIONS
const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat('fr-FR', {
    year: '2-digit',
    month: 'numeric',
    day: 'numeric'
  }).format(new Date(date))
}

const { loading, error, result, onResult } = useQuery(GET_SESSIONS)

onResult(() => {
  activeSessionItems.value = result.value?.sessions?.map((session: any) => {
    return {
      id: session.id,
      sessionName: session.sessionName,
      createdBy: session.createdBy.username,
      createdAt: new Date(session.createdAt * 1000),
      updatedAt: new Date(session.updatedAt * 1000)
    } as sessionTabItem
  })
})

if (error.value) {
  console.error('Error while fetching sessions', error.value)
}
</script>
