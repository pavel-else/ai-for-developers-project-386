# API

## Host

### GET /slots

Список своих слотов с бронями.

### POST /slots

Создать новый слот.

- `startTime` — начало
- `endTime` — конец

## Booker

### GET /{slug}/event-types

Event type'ы пользователя.

### GET /{slug}/slots?eventTypeId=

Свободные окна для указанного event type.

### POST /bookings

Создать бронь.

- `slotId`
- `startTime` — начало встречи
- `endTime` — конец встречи
- `eventTypeId`
