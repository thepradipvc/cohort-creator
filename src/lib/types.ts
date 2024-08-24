import { z } from "zod";
import { cohortFormSchemas } from "./schemas";

export type CohortFormSchema = z.infer<typeof cohortFormSchemas>;
