import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { CohortFormSchema } from "./types";
import { defaultCohortFormValues } from "./constants";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const COHORTS_KEY = "cohorts";

export const getDefaultFormValues = (cohortId: string) => {
  return getCohortById(cohortId) || defaultCohortFormValues;
};

export const getAllCohorts = (): Record<string, CohortFormSchema> => {
  if (typeof window === "undefined") {
    return {};
  }
  const cohortsJson = localStorage.getItem(COHORTS_KEY);
  return cohortsJson ? JSON.parse(cohortsJson) : {};
};

export const getCohortById = (id: string): CohortFormSchema | null => {
  const cohorts = getAllCohorts();
  return cohorts[id] || null;
};

export const saveCohort = (cohortId: string, cohort: CohortFormSchema) => {
  const cohorts = getAllCohorts();
  cohorts[cohortId] = cohort;
  localStorage.setItem(COHORTS_KEY, JSON.stringify(cohorts));
};

export const removeCohort = (id: string) => {
  const existingCohorts = getAllCohorts();
  delete existingCohorts[id];
  localStorage.setItem("cohorts", JSON.stringify(existingCohorts));
};
