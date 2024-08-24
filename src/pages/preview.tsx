import { getCohortById } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { useEffect } from "react";
import { FileTextIcon } from "@radix-ui/react-icons";
import RomanNumerals from "roman-numerals";

const Preview = () => {
  const { cohortId } = useParams();
  const cohort = getCohortById(cohortId || "");

  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView();
      }
    }
  }, [hash]);

  if (!cohort) {
    throw new Error("Cohort not found");
  }

  return (
    <main className="grid min-h-screen w-full grid-cols-[5fr_2fr] divide-x overflow-hidden">
      <div className="space-y-24 p-8">
        <div>
          <h1 className="pt-8 text-4xl font-bold" id="home">
            {cohort.title}
          </h1>
          <div className="prose mt-12">
            <ReactMarkdown className="mt-2">{cohort.description}</ReactMarkdown>
          </div>
        </div>
        {cohort.modules.map((module, moduleIndex) => (
          <div key={moduleIndex}>
            <h2 className="text-3xl font-bold" id={`m${moduleIndex + 1}`}>
              {moduleIndex + 1}. {module.title}
            </h2>
            <ul className="mt-4 space-y-12">
              {module.lessons?.map((lesson, lessonIndex) => (
                <li key={lessonIndex} className="space-y-4">
                  {lesson.isVideo && lesson.videoUrl !== "" && (
                    <div>
                      <video
                        src={lesson.videoUrl}
                        controls
                        className="w-full"
                      ></video>
                    </div>
                  )}
                  <h3
                    className="text-2xl font-semibold"
                    id={`m${moduleIndex + 1}l${lessonIndex + 1}`}
                  >
                    {RomanNumerals.toRoman(lessonIndex + 1).toLowerCase()}.{" "}
                    {lesson.title}
                  </h3>
                  <div className="prose">
                    <ReactMarkdown className="mt-2">
                      {lesson.description}
                    </ReactMarkdown>
                  </div>
                  {lesson.files && lesson.files?.length > 0 && (
                    <div>
                      <h4 className="text-lg font-medium">Resources</h4>
                      <ul className="space-y-2">
                        {lesson.files?.map((file, index) => {
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
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="fixed right-0 h-screen overflow-y-scroll p-4">
        <p className="text-center text-2xl font-bold">Outline</p>
        <p className="mt-8 text-lg font-semibold">
          <Link to={`/cohorts/preview/${cohortId}#home`}>Home</Link>
        </p>
        <ul className="mt-4 list-inside list-decimal space-y-6">
          {cohort.modules.map((module, moduleIndex) => (
            <li key={moduleIndex}>
              <span>
                <Link to={`#m${moduleIndex + 1}`}>{module.title}</Link>
              </span>
              <ul className="mt-1 list-inside list-[lower-roman] space-y-2">
                {module.lessons?.map((lesson, lessonIndex) => (
                  <li key={lessonIndex} className="ml-12">
                    <span>
                      <Link to={`#m${moduleIndex + 1}l${lessonIndex + 1}`}>
                        {lesson.title}
                      </Link>
                    </span>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
};

export default Preview;
