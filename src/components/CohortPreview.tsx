import { CohortFormSchema } from "@/lib/types";
import { useWatch } from "react-hook-form";
import ReactMarkdown from "react-markdown";

const CohortPreview = () => {
  const formData = useWatch<CohortFormSchema>();
  return (
    <div className="relative space-y-4 p-4 pt-8">
      <span className="absolute left-0 top-0 rounded-br-md bg-slate-200 p-1">
        Preview
      </span>
      <div className="mt-10 space-y-8">
        <h1 className="text-3xl font-bold">{formData.title}</h1>

        <div className="prose">
          <ReactMarkdown className="mt-2">{formData.description}</ReactMarkdown>
        </div>

        <div>
          <p className="text-center text-2xl font-medium">Outline</p>
          <ul className="mt-4 space-y-6">
            {formData.modules?.map((module, moduleIndex) => (
              <li key={moduleIndex}>
                <span>
                  {moduleIndex + 1}. {module.title}
                </span>
                <ul className="list-inside list-[lower-roman] space-y-2">
                  {module.lessons?.map((lesson, lessonIndex) => (
                    <li key={lessonIndex} className="ml-12">
                      <span>{lesson.title}</span>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CohortPreview;
