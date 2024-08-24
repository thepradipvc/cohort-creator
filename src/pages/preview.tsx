import { getCohortById } from "@/lib/utils";
import { useParams } from "react-router-dom";

const Preview = () => {
  const { cohortId } = useParams();
  const cohort = getCohortById(cohortId || "");

  if (!cohort) {
    throw new Error("Cohort not found");
  }

  return (
    <main className="grid min-h-screen p-8">
      <h1 className="text-3xl font-bold">Preview Cohort</h1>
      <p>Previewing cohort with ID: {cohortId}</p>
      <div>
        {cohort.modules.map((module, moduleIndex) => (
          <div key={moduleIndex}>
            {module.lessons.map((lesson, lessonIndex) => (
              <div key={lessonIndex}>
                {lesson.isVideo &&
                  lesson.videoUrl &&
                  lesson.videoUrl.trim() !== "" && (
                    <video controls width="600">
                      <source src={lesson.videoUrl} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  )}
                {lesson.files && lesson.files.length > 0 && (
                  <ul>
                    {lesson.files.map((file, fileIndex) => (
                      <li key={fileIndex}>
                        <a href={file.url} download>
                          {file.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </main>
  );
};

export default Preview;
