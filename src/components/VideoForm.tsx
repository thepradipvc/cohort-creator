"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { CohortFormSchema } from "@/lib/types";
import { useFormContext, useWatch } from "react-hook-form";
import { Switch } from "./ui/switch";
import { useState } from "react";
import { Input } from "./ui/input";

const VideoForm = ({
  moduleIndex,
  lessonIndex,
}: {
  moduleIndex: number;
  lessonIndex: number;
}) => {
  const form = useFormContext<CohortFormSchema>();
  const currentLesson = useWatch({
    name: `modules.${moduleIndex}.lessons.${lessonIndex}`,
  }) as CohortFormSchema["modules"][number]["lessons"][number];

  const [isVideoEditable, setIsVideoEditable] = useState(
    () => currentLesson.videoUrl === "",
  );

  return (
    <div>
      <span className="mb-2 inline-block text-sm">Lesson Video</span>
      <div className="space-y-4 rounded-sm border border-gray-300 p-4">
        <FormField
          control={form.control}
          name={`modules.${moduleIndex}.lessons.${lessonIndex}.isVideo`}
          render={({ field }) => (
            <FormItem className="space-x-2">
              <FormLabel>Include Video</FormLabel>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={(value) => {
                    field.onChange(value);
                    if (!value) {
                      form.setValue(
                        `modules.${moduleIndex}.lessons.${lessonIndex}.videoUrl`,
                        "",
                      );
                      setIsVideoEditable(true);
                    }
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {currentLesson.isVideo &&
          (isVideoEditable ? (
            <FormField
              control={form.control}
              name={`modules.${moduleIndex}.lessons.${lessonIndex}.videoUrl`}
              render={({ field }) => {
                const { onChange, ...other } = field;
                return (
                  <FormItem>
                    <FormLabel>Upload Video</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        accept="video/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          setIsVideoEditable(false);
                          const url = URL.createObjectURL(file!);
                          onChange(url);
                        }}
                        {...other}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
          ) : (
            <p>{currentLesson.videoUrl}</p>
          ))}
      </div>
    </div>
  );
};

export default VideoForm;
