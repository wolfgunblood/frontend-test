import { z } from "zod";

export const adSchema = z.object({
  type: z.enum(["AUTO", "STATIC", "AB"]),
  timestamp: z.number(),
});
export const adSchemaDB = z.object({
  id: z.string(),
  type: z.enum(["AUTO", "STATIC", "AB"]),
  timestamp: z.number(),
  createdOn: z.string().datetime(),
});

export type ZodAd = z.infer<typeof adSchema>;
export type ZodAdDB = z.infer<typeof adSchemaDB>;

export const adSchemaUpdate = z.object({
  updatedTime: z.number(),
  id: z.string(),
});
