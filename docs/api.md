# API

## Host

### GET /slots

Список своих слотов с бронями.

### POST /slots

Создать новый слот.

- `startTime` — начало
- `endTime` — конец

### DELETE /slots/:id

Удалить слот. Блокировано, если есть активные брони.

### PATCH /bookings/:id/cancel

Отменить бронь в своём слоте.

## Booker

### GET /event-types

Системные шаблоны встреч (15 мин, 30 мин).

### GET /{slug}/slots?duration=

Свободные окна для указанной длительности.

### POST /bookings

Создать бронь.

- `slotId`
- `startTime` — начало встречи
- `endTime` — конец встречи
- `duration` — 15 или 30

### GET /bookings

Свои брони.

### PATCH /bookings/:id/cancel

Отменить свою бронь.
