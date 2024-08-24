import { CohortFormSchema } from "./types";

export const defaultCohortFormValues: CohortFormSchema = {
  title: "",
  description: "",
  modules: [
    {
      title: "",
      lessons: [
        {
          title: "",
          description: "",
          isVideo: false,
          videoUrl: "",
          files: [],
        },
      ],
    },
  ],
};
