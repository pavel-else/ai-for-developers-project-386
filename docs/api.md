# API

## Admin (владелец)

### EventTypes

#### GET /admin/event-types

Список всех типов событий.

#### POST /admin/event-types

Создать тип события.

- `name` — название
- `description` — описание
- `duration` — длительность в минутах

#### PUT /admin/event-types/:id

Обновить тип события.

- `name` — название
- `description` — описание
- `duration` — длительность в минутах

#### DELETE /admin/event-types/:id

Удалить тип события.

### Slots

#### GET /admin/slots

Список своих слотов с бронями.

#### POST /admin/slots

Создать новый слот.

- `startTime` — начало
- `endTime` — конец

#### DELETE /admin/slots/:id

Удалить слот. Блокировано, если есть активные брони.

### Bookings

#### GET /admin/bookings

Все предстоящие встречи (active, startTime ≥ сейчас), отсортированные по startTime. С данными EventType.

#### PATCH /admin/bookings/:id/cancel

Отменить бронь.

## Guest

#### GET /event-types

Список доступных типов событий.

#### GET /{slug}/slots?duration=

Свободные окна для указанной длительности.
Возвращает только слоты в ближайшие 14 дней от текущей даты.

#### POST /bookings

Создать бронь.

- `slotId`
- `eventTypeId`
- `startTime` — начало встречи
- `endTime` — конец встречи
- `name` — имя гостя
- `email` — email гостя

#### GET /bookings?email=

Свои брони по email.

#### PATCH /bookings/:id/cancel

Отменить свою бронь. В теле: `{ email }`
