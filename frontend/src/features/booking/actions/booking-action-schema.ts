import z from "zod";

export const bookingSchema = z.object({
  course: z.string(),
  date: z.string(),
  time: z.string(),
  name: z.string(),
  memo: z.string().optional(),
});

export type BookingInput = z.infer<typeof bookingSchema>;
