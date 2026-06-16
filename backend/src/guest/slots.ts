import { Hono } from "hono";
import { store } from "../store.js";
import { NotFoundError, BadRequestError } from "../errors.js";

export const slotsRouter = new Hono().get("/:slug/slots", (c) => {
  const slug = c.req.param("slug");
  const duration = Number(c.req.query("duration"));

  if (!Number.isFinite(duration) || duration <= 0) {
    throw new BadRequestError("duration must be a positive integer");
  }

  const owner = store.getOwnerBySlug(slug);
  if (!owner) throw new NotFoundError("Owner", 0);

  const now = new Date();
  const from = now.toISOString();
  const to = new Date(now.getTime() + 14 * 24 * 60 * 60 * 1000).toISOString();

  const slots = store.listSlotsInRange(from, to);
  const available = slots.filter((s) => {
    const slotStart = new Date(s.startTime).getTime();
    const slotEnd = new Date(s.endTime).getTime();
    const durationMs = duration * 60 * 1000;

    const activeBookings = s.bookings.filter((b) => b.status === "active");

    if (activeBookings.length === 0) {
      return slotEnd - slotStart >= durationMs;
    }

    const gaps = findGaps(
      slotStart,
      slotEnd,
      activeBookings.map((b) => ({
        start: new Date(b.startTime).getTime(),
        end: new Date(b.endTime).getTime(),
      })),
    );

    return gaps.some((g) => g.end - g.start >= durationMs);
  });

  return c.json(available);
});

interface Gap {
  start: number;
  end: number;
}

function findGaps(slotStart: number, slotEnd: number, booked: Gap[]): Gap[] {
  const sorted = [...booked].sort((a, b) => a.start - b.start);
  const gaps: Gap[] = [];
  let cursor = slotStart;

  for (const b of sorted) {
    if (b.start > cursor) {
      gaps.push({ start: cursor, end: b.start });
    }
    cursor = Math.max(cursor, b.end);
  }

  if (cursor < slotEnd) {
    gaps.push({ start: cursor, end: slotEnd });
  }

  return gaps;
}
