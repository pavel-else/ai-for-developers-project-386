import { store } from "./store.js";

export function seed(): void {
  store.createOwner({
    name: "Владелец",
    slug: "owner",
    email: "owner@example.com",
  });

  store.createEventType({
    ownerId: 1,
    name: "15 минут",
    description: "Короткая встреча на 15 минут",
    duration: 15,
  });

  store.createEventType({
    ownerId: 1,
    name: "30 минут",
    description: "Стандартная встреча на 30 минут",
    duration: 30,
  });
}
