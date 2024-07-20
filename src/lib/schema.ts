import { z } from 'zod';

export const adSchema = z.object({
    type: z.enum(['AUTO', 'STATIC','AB']),  
    timestamp: z.number().nonnegative(),
});


export type ZodAd = z.infer<typeof adSchema>;

