# API

## Host

### GET /slots

Список своих слотов с бронями.

### POST /slots

Создать новый слот.

- `startTime` — начало
- `endTime` — конец

## Booker

### GET /event-types

Системные шаблоны встреч (15 мин, 30 мин).

### GET /{slug}/slots?eventTypeId=

Свободные окна для указанного event type.

### POST /bookings

Создать бронь.

- `slotId`
- `startTime` — начало встречи
- `endTime` — конец встречи
- `eventTypeId`
