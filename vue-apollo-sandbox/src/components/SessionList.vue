<template>
  <v-card variant="elevated" max-width="800px" class="my-6" title="Sessions actives">
    <v-data-table
      :headers="headers"
      :items="sessions"
      :sort-by="[{ key: 'updatedAt', order: 'asc' }]"
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
  </v-card>
</template>

<script setup lang="ts">
import type { Session } from '@/types/session.model'

const headers = [
  { title: 'Nom', key: 'name' },
  { title: 'Auteur', key: 'createdBy' },
  { title: 'Création', key: 'createdAt' },
  { title: 'Dernière MAJ', key: 'updatedAt' },
  { title: '', key: 'actions', sortable: false }
]

const sessions: Session[] = [
  {
    id: 1,
    name: 'Session privée',
    createdBy: 'Louise',
    createdAt: new Date(2024, 8, 18),
    updatedAt: new Date(2024, 9, 11)
  },
  {
    id: 2,
    name: 'Equipe Failover',
    createdBy: 'John',
    createdAt: new Date(2024, 7, 23),
    updatedAt: new Date(2024, 9, 17)
  },
  {
    id: 3,
    name: 'PI 12 - Sprint 3',
    createdBy: 'Bob',
    createdAt: new Date(2024, 6, 2),
    updatedAt: new Date(2024, 7, 1)
  }
]

const joinSession = (sessionId: number) => {
  console.log('Joining sessionId: ', sessionId)
}

const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat('fr-FR', {
    year: '2-digit',
    month: 'numeric',
    day: 'numeric'
  }).format(new Date(date))
}
</script>
