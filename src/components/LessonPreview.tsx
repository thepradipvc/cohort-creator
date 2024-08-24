import { CohortFormSchema } from "@/lib/types";
import { useWatch } from "react-hook-form";
import ReactMarkdown from "react-markdown";
import { Button } from "./ui/button";
import { DownloadIcon } from "@radix-ui/react-icons";

const LessonPreview = ({ lessonIdentifier }: { lessonIdentifier: string }) => {
  const [moduleIndex, lessonIndex] = lessonIdentifier.split("-").map(Number);
  const lessonData = useWatch<CohortFormSchema>({
    name: `modules.${moduleIndex}.lessons.${lessonIndex}`,
  }) as CohortFormSchema["modules"][number]["lessons"][number];

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
            <h2 className="text-lg font-medium">Materials</h2>
            <ul className="space-y-2">
              {lessonData.files.map((file, index) => {
                return (
                  file.url !== "" && (
                    <li
                      key={index}
                      className="flex items-center gap-2 rounded-md bg-secondary px-2 py-1"
                    >
                      <span className="flex-1">{file.name}</span>
                      <Button asChild size="icon" variant="secondary">
                        <a
                          href={file.url}
                          target="_blank"
                          download={file.name}
                          rel="noreferrer"
                        >
                          <DownloadIcon />
                        </a>
                      </Button>
                    </li>
                  )
                );
              })}
            </ul>
          </div>
        ) : (
          <div>
            <p>No material available</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LessonPreview;
