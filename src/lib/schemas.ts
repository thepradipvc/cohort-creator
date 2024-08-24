import { z } from "zod";

const fileSchema = z.object({
  name: z.string({ message: "File name is required" }),
  fileType: z.string({ message: "File type is required" }),
  url: z.string().url("Please upload a file"),
});

const lessonSchema = z
  .object({
    title: z.string().min(1, "Lesson title is required"),
    description: z.string().min(1, "Lesson description is required"),
    isVideo: z.boolean(),
    videoUrl: z.string().optional(),
    files: z.array(fileSchema).optional(),
  })
  .refine((data) => !data.isVideo || (data.isVideo && data.videoUrl), {
    message: "Please upload a video or uncheck the include video option",
    path: ["videoUrl"],
  });

const moduleSchema = z.object({
  title: z.string().min(1, "Module title is required"),
  lessons: z.array(lessonSchema).min(1, "At least one lesson is required"),
});

export const cohortFormSchemas = z.object({
  title: z.string().min(1, "Cohort title is required"),
  description: z.string().min(1, "Cohort description is required"),
  modules: z.array(moduleSchema).min(1, "At least one module is required"),
});
