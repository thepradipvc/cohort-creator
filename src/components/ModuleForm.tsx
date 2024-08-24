"use client";

import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { defaultCohortFormValues } from "@/lib/constants";
import { CohortFormSchema } from "@/lib/types";
import { TrashIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { useFieldArray, useFormContext, useWatch } from "react-hook-form";
import { Save } from "lucide-react";

type ModuleFormProps = {
  moduleIndex: number;
  setCurrentLesson: (lesson: string | null) => void;
  deleteModule: () => void;
};

const ModuleForm = ({
  moduleIndex,
  setCurrentLesson,
  deleteModule,
}: ModuleFormProps) => {
  const form = useFormContext<CohortFormSchema>();

  const fieldArray = useFieldArray({
    name: `modules.${moduleIndex}.lessons`,
  });

  const currentModule = useWatch({
    name: `modules.${moduleIndex}`,
  }) as CohortFormSchema["modules"][number];

  const [isTitleEditable, setIsTitleEditable] = useState(
    () => currentModule.title === "",
  );

  return (
    <div className="space-y-4 rounded-sm border border-gray-300 p-4">
      {isTitleEditable ? (
        <div className="flex gap-8">
          <FormField
            control={form.control}
            name={`modules.${moduleIndex}.title`}
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Module Title</FormLabel>
                <FormControl>
                  <Input placeholder="Enter the module title..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            variant="outline"
            disabled={currentModule.title === ""}
            onClick={() => {
              setIsTitleEditable(false);
            }}
            size="icon"
          >
            <Save className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <div className="flex items-center justify-between">
          <h2 className="flex-1">
            Module {moduleIndex + 1} - {currentModule.title}
          </h2>
          <Button
            variant="destructive"
            className="mx-auto block"
            onClick={deleteModule}
          >
            Delete Module
          </Button>
        </div>
      )}

      <div className="space-y-2">
        {currentModule.lessons.map((lesson, lessonIndex) => (
          <div
            key={lessonIndex}
            className="flex items-center justify-between space-x-4 text-sm"
          >
            <div
              className="flex-1 cursor-pointer rounded-md p-2 pl-4 hover:bg-accent hover:text-accent-foreground"
              onClick={() => setCurrentLesson(`${moduleIndex}-${lessonIndex}`)}
            >
              <span>Lesson {lessonIndex + 1}. </span>
              <span>{lesson.title}</span>
            </div>
            <Button
              variant="ghost"
              className="text-destructive hover:text-destructive"
              onClick={() => fieldArray.remove(lessonIndex)}
              size="icon"
            >
              <TrashIcon />
            </Button>
          </div>
        ))}
      </div>
      {form.formState.errors.modules?.[moduleIndex]?.lessons?.root?.message && (
        <div className="text-sm text-destructive">
          {form.formState.errors.modules?.[moduleIndex]?.lessons?.root?.message}
        </div>
      )}
      <Button
        className="w-full"
        variant="outline"
        onClick={() => {
          fieldArray.append(defaultCohortFormValues.modules[0].lessons[0]);
          setCurrentLesson(`${moduleIndex}-${fieldArray.fields.length}`);
        }}
      >
        Add Lesson
      </Button>
    </div>
  );
};

export default ModuleForm;
