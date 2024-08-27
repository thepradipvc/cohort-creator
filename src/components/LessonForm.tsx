"use client";

import MarkdownEditor from "@/components/MarkdownEditor";
import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFormContext } from "react-hook-form";
import FilesForm from "./FilesForm";
import VideoForm from "./VideoForm";
import { CohortFormSchema } from "@/lib/types";

type LessonFormProps = {
  lessonIdentifier: string;
  setCurrentLesson: (lesson: string | null) => void;
};

const LessonForm = ({
  lessonIdentifier,
  setCurrentLesson,
}: LessonFormProps) => {
  const [moduleIndex, lessonIndex] = lessonIdentifier.split("-").map(Number);
  const form = useFormContext<CohortFormSchema>();

  return (
    <div className="space-y-4">
      <FormField
        control={form.control}
        name={`modules.${moduleIndex}.lessons.${lessonIndex}.title`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Lesson Title</FormLabel>
            <FormControl>
              <Input placeholder="Enter the lesson title..." {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name={`modules.${moduleIndex}.lessons.${lessonIndex}.description`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Lesson Description</FormLabel>
            <FormControl>
              <MarkdownEditor value={field.value} onChange={field.onChange} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <VideoForm moduleIndex={moduleIndex} lessonIndex={lessonIndex} />
      <FilesForm moduleIndex={moduleIndex} lessonIndex={lessonIndex} />
      <div className="flex gap-2">
        <Button
          variant="ghost"
          type="button"
          onClick={() => {
            const originalLessonData =
              // @ts-expect-error - have just set this temporarily
              window.tempCurrentLessonData as CohortFormSchema["modules"][number]["lessons"][number];
            // @ts-expect-error - have just set this temporarily
            delete window.tempCurrentLessonData;
            setCurrentLesson(null);
            if (originalLessonData) {
              form.resetField(`modules.${moduleIndex}.lessons.${lessonIndex}`, {
                defaultValue: originalLessonData,
              });
            }
          }}
        >
          Back
        </Button>
        <Button
          type="button"
          onClick={async () => {
            const isValid = await form.trigger(
              `modules.${moduleIndex}.lessons.${lessonIndex}`,
            );
            if (isValid) {
              // @ts-expect-error - have just set this temporarily
              delete window.tempCurrentLessonData;
              setCurrentLesson(null);
            }
          }}
        >
          Save
        </Button>
      </div>
    </div>
  );
};

export default LessonForm;
