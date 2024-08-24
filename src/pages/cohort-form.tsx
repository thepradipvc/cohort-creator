import CohortPreview from "@/components/CohortPreview";
import LessonForm from "@/components/LessonForm";
import LessonPreview from "@/components/LessonPreview";
import MarkdownEditor from "@/components/MarkdownEditor";
import ModulesList from "@/components/ModulesList";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cohortFormSchemas } from "@/lib/schemas";
import { CohortFormSchema } from "@/lib/types";
import { getDefaultFormValues, saveCohort } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

const CohortForm = () => {
  const { cohortId } = useParams();
  const [currentLesson, setCurrentLesson] = useState<string | null>(null);
  const defaultValues = getDefaultFormValues(cohortId || "");
  const navigate = useNavigate();

  const form = useForm<CohortFormSchema>({
    resolver: zodResolver(cohortFormSchemas),
    defaultValues,
  });

  function onSubmit(values: CohortFormSchema) {
    saveCohort(cohortId!, values);
    navigate("/cohorts");
  }

  return (
    <main className="grid min-h-screen p-8">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <AnimatePresence initial={false} mode="popLayout">
            {currentLesson === null ? (
              <div className="grid grid-cols-[3fr_2fr] divide-x rounded-xl border border-gray-300">
                <div className="p-4">
                  <div className="space-y-6">
                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Title</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter the title..."
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Description</FormLabel>
                          <FormControl>
                            <MarkdownEditor
                              value={field.value}
                              onChange={field.onChange}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {form.formState.errors.modules?.root?.message && (
                      <div className="text-sm text-destructive">
                        {form.formState.errors.modules.root.message}
                      </div>
                    )}

                    <ModulesList setCurrentLesson={setCurrentLesson} />

                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        type="button"
                        onClick={() =>
                          // TODO: Implement cancel functionality
                          // Reset these form values to original values
                          navigate("/cohorts")
                        }
                      >
                        Back
                      </Button>
                      <Button type="submit">Submit</Button>
                    </div>
                  </div>
                </div>
                <CohortPreview />
              </div>
            ) : (
              <motion.div
                key={currentLesson}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 100 }}
                transition={{ duration: 0.3 }}
              >
                <div className="grid grid-cols-[3fr_2fr] divide-x rounded-xl border border-gray-300">
                  <div className="p-4">
                    <div className="space-y-6">
                      <LessonForm
                        lessonIdentifier={currentLesson}
                        setCurrentLesson={setCurrentLesson}
                      />
                    </div>
                  </div>
                  <LessonPreview lessonIdentifier={currentLesson} />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </form>
      </Form>
    </main>
  );
};

export default CohortForm;
