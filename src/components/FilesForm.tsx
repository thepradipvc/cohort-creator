"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CohortFormSchema } from "@/lib/types";
import { TrashIcon } from "@radix-ui/react-icons";
import { useFieldArray, useWatch } from "react-hook-form";

const FilesForm = ({
  moduleIndex,
  lessonIndex,
}: {
  moduleIndex: number;
  lessonIndex: number;
}) => {
  const fieldArray = useFieldArray({
    name: `modules.${moduleIndex}.lessons.${lessonIndex}.files`,
  });

  const files = useWatch({
    name: `modules.${moduleIndex}.lessons.${lessonIndex}.files`,
  }) as CohortFormSchema["modules"][number]["lessons"][number]["files"];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) {
      return;
    }

    const name = file.name;
    const fileType = file.type;
    const url = URL.createObjectURL(file);

    fieldArray.append({ name, fileType, url });
  };

  return (
    <div>
      <span className="mb-2 inline-block text-sm">Lesson Files</span>
      <div className="space-y-4 rounded-sm border border-gray-300 p-4">
        {files?.length === 0 && (
          <span className="mx-auto block w-max text-sm text-muted-foreground">
            No files added yet. Add a file to this lesson.
          </span>
        )}
        {files?.map((file, fileIndex) => (
          <div key={fileIndex} className="flex items-center gap-2">
            <p className="flex-1">
              {fileIndex + 1}. {file.name}
            </p>
            <Button
              variant="destructive"
              onClick={() => fieldArray.remove(fileIndex)}
              size="icon"
            >
              <TrashIcon />
            </Button>
          </div>
        ))}
        <Button
          variant="outline"
          className="relative w-full"
          aria-hidden
          type="button"
        >
          <Input
            className="absolute inset-0 opacity-0"
            type="file"
            onChange={handleChange}
          />
          Add File
        </Button>
      </div>
    </div>
  );
};

export default FilesForm;
