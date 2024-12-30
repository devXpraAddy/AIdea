import * as z from "zod";

export const formSchema = z.object({
  image: z.any().refine((file) => file instanceof File, {
    message: "Image is required",
  }),
});

export const aspectRatioOptions = [
  {
    value: "1:1",
    label: "Square (1:1)",
  },
  {
    value: "4:3",
    label: "Standard (4:3)",
  },
  {
    value: "16:9",
    label: "Wide (16:9)",
  },
];
