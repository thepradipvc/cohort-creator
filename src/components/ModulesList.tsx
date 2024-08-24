"use client";

import { Button } from "@/components/ui/button";
import { defaultCohortFormValues } from "@/lib/constants";
import { CohortFormSchema } from "@/lib/types";
import { useFieldArray } from "react-hook-form";
import ModuleForm from "./ModuleForm";

type ModulesListProps = {
  setCurrentLesson: (lesson: string | null) => void;
};

const ModulesList = ({ setCurrentLesson }: ModulesListProps) => {
  const fieldArray = useFieldArray<CohortFormSchema>({
    name: "modules",
  });

  return (
    <div>
      <div className="space-y-8">
        {fieldArray.fields.map((field, index) => (
          <ModuleForm
            key={field.id}
            moduleIndex={index}
            setCurrentLesson={setCurrentLesson}
            deleteModule={() => fieldArray.remove(index)}
          />
        ))}
        <Button
          type="button"
          className="mx-auto block"
          variant="outline"
          onClick={() => fieldArray.append(defaultCohortFormValues.modules[0])}
        >
          Add Module
        </Button>
      </div>
    </div>
  );
};

export default ModulesList;
