import * as z from "zod";

export const formSchema = z.object({
  prompt: z.string().min(1, {
    // it should have atleast 1 character
    message: "Music Prompt is required",
  }),
});
