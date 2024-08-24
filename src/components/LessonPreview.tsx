import { CohortFormSchema } from "@/lib/types";
import { FileTextIcon } from "@radix-ui/react-icons";
import { useWatch } from "react-hook-form";
import ReactMarkdown from "react-markdown";

const LessonPreview = ({ lessonIdentifier }: { lessonIdentifier: string }) => {
  const [moduleIndex, lessonIndex] = lessonIdentifier.split("-").map(Number);
  const lessonData = useWatch<CohortFormSchema>({
    name: `modules.${moduleIndex}.lessons.${lessonIndex}`,
  }) as CohortFormSchema["modules"][number]["lessons"][number];

  console.log(lessonData.files);
  console.log("length", lessonData.files?.length);

  return (
    <div className="relative space-y-4 p-4 pt-8">
      <span className="absolute left-0 top-0 rounded-br-md bg-slate-200 p-1">
        Preview
      </span>
      {lessonData.isVideo && lessonData.videoUrl !== "" && (
        <div>
          <video src={lessonData.videoUrl} controls className="w-full"></video>
        </div>
      )}
      <div className="mt-10 space-y-8">
        <h1 className="text-3xl font-bold">{lessonData.title}</h1>

        <div className="prose">
          <ReactMarkdown className="mt-2">
            {lessonData.description}
          </ReactMarkdown>
        </div>

        {lessonData.files?.length ? (
          <div>
            <h2 className="text-lg font-medium">Resources</h2>
            <ul className="space-y-2">
              {lessonData.files.map((file, index) => {
                return (
                  file.url !== "" && (
                    <li
                      key={index}
                      className="flex items-center text-blue-500 underline-offset-4 hover:text-blue-700 hover:underline"
                    >
                      <a
                        href={file.url}
                        target="_blank"
                        download={file.name}
                        rel="noreferrer"
                      >
                        <span className="line-clamp-1 space-x-2">
                          <FileTextIcon className="mr-1 inline-block h-4 w-4" />
                          {file.name}
                        </span>
                      </a>
                    </li>
                  )
                );
              })}
            </ul>
          </div>
        ) : (
          <div>
            <p>No resources available</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LessonPreview;
