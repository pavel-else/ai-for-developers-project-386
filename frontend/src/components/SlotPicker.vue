<script setup lang="ts">
import type { Slot } from '@/api/guest'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

defineProps<{
  slots: Slot[]
  selectedSlotId: number | null
}>()

const emit = defineEmits<{
  select: [slotId: number]
}>()
</script>

<template>
  <div class="grid grid-cols-2 sm:grid-cols-3 gap-3">
    <Button
      v-for="slot in slots"
      :key="slot.id"
      variant="outline"
      :class="cn(
        'justify-start',
        selectedSlotId === slot.id && 'border-primary bg-primary/5'
      )"
      @click="emit('select', slot.id)"
    >
      {{ new Date(slot.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }}
    </Button>
  </div>
  <p v-if="slots.length === 0" class="text-sm text-muted-foreground text-center py-8">
    No available slots for this duration.
  </p>
</template>
