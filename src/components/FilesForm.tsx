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
import { CohortFormSchema } from "@/lib/types";
import { TrashIcon } from "@radix-ui/react-icons";
import { useFieldArray, useFormContext, useWatch } from "react-hook-form";

const FilesForm = ({
  moduleIndex,
  lessonIndex,
}: {
  moduleIndex: number;
  lessonIndex: number;
}) => {
  const form = useFormContext<CohortFormSchema>();

  const fieldArray = useFieldArray({
    name: `modules.${moduleIndex}.lessons.${lessonIndex}.files`,
  });

  const files = useWatch({
    name: `modules.${moduleIndex}.lessons.${lessonIndex}.files`,
  }) as CohortFormSchema["modules"][number]["lessons"][number]["files"];

  const handleChange = (fileIndex: number, file: File) => {
    const name = file.name;
    const fileType = file.type;
    const url = URL.createObjectURL(file);

    form.setValue(
      `modules.${moduleIndex}.lessons.${lessonIndex}.files.${fileIndex}`,
      {
        name,
        fileType,
        url,
      },
    );
  };

  console.log("Hello world");

  return (
    <div>
      <span className="mb-2 inline-block text-sm">Lesson Files</span>
      <div className="space-y-4 rounded-sm border border-gray-300 p-4">
        {fieldArray.fields.length === 0 && (
          <span className="mx-auto block w-max text-sm text-muted-foreground">
            No files added yet. Add a file to this lesson.
          </span>
        )}
        {fieldArray.fields.map((field, fileIndex) => {
          const fileUrl = files?.[fileIndex]?.url;

          return (
            <div key={field.id} className="space-y-4">
              {fileUrl && fileUrl !== "" ? (
                <div className="flex items-center gap-2">
                  <p className="flex-1">
                    {fileIndex + 1}. {files[fileIndex].name}
                  </p>
                  <Button
                    variant="destructive"
                    onClick={() => fieldArray.remove(fileIndex)}
                    size="icon"
                  >
                    <TrashIcon />
                  </Button>
                </div>
              ) : (
                <FormField
                  control={form.control}
                  name={`modules.${moduleIndex}.lessons.${lessonIndex}.files.${fileIndex}.url`}
                  render={({ field }) => {
                    const { onChange, value, ...other } = field;
                    return (
                      <FormItem className="flex items-center gap-2">
                        <FormLabel>{fileIndex + 1}.</FormLabel>
                        <FormControl>
                          <Input
                            type="file"
                            onChange={(e) => {
                              handleChange(fileIndex, e.target.files![0]);
                            }}
                            {...other}
                          />
                        </FormControl>
                        <FormMessage />
                        <Button
                          variant="destructive"
                          onClick={() => fieldArray.remove(fileIndex)}
                          size="icon"
                        >
                          <TrashIcon />
                        </Button>
                      </FormItem>
                    );
                  }}
                />
              )}
            </div>
          );
        })}
        <Button
          variant="outline"
          className="w-full"
          onClick={() => fieldArray.append({ name: "", fileType: "", url: "" })}
          type="button"
        >
          Add File
        </Button>
      </div>
    </div>
  );
};

export default FilesForm;
