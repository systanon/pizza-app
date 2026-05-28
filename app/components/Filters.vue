<template>
  <v-chip-group
    :model-value="categoryId"
    v-if="!mobile"
    column
    @update:model-value="categoryId = $event ? Number($event) : null"
  >
    <v-chip v-for="cat in categories" :key="cat.id" :value="cat.id">
      {{ cat.name }}
    </v-chip>
  </v-chip-group>
  <template v-else>
    <v-btn
      variant="tonal"
      :append-icon="expanded ? 'mdi-chevron-up' : 'mdi-chevron-down'"
      block
      @click="expanded = !expanded"
    >
      {{ categoryId ? categories?.find((c) => c.id === categoryId)?.name : 'All Categories' }}
    </v-btn>

    <v-expand-transition>
      <v-chip-group
        v-show="expanded"
        :model-value="categoryId"
        column
        class="pt-2"
        @update:model-value="
          categoryId = $event ? Number($event) : null;
          expanded = false;
        "
      >
        <v-chip v-for="cat in categories" :key="cat.id" :value="cat.id" filter>
          {{ cat.name }}
        </v-chip>
      </v-chip-group>
    </v-expand-transition>
  </template>
  <v-row align="center" class="my-2">
    <v-col cols="12" md="6">
      <v-text-field
        v-model="q"
        label="Search"
        prepend-inner-icon="mdi-magnify"
        clearable
        hide-details
      />
    </v-col>
    <v-col cols="12" md="6">
      <v-btn variant="text" block @click="emit('resetFilters')">Reset</v-btn>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
  const categoryId = defineModel<number | null>('categoryId', { default: null });
  const q = defineModel<string>('q', { default: '' });
  const { data: categories } = useCategories();
  const { mobile } = useDisplay();

  const expanded = ref(false);

  const emit = defineEmits<{
    (e: 'resetFilters'): void;
  }>();
</script>
