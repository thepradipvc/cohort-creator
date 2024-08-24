"use client";

import { useMemo } from "react";
import SimpleMdeReact from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";

type MarkdownProps = {
  value?: string;
  onChange: (value: string) => void;
};

const MarkdownEditor = ({ value, onChange }: MarkdownProps) => {
  const markdownOptions = useMemo(() => {
    return {
      spellChecker: false,
      status: false,
    } as EasyMDE.Options;
  }, []);

  return (
    <SimpleMdeReact
      value={value}
      onChange={onChange}
      options={markdownOptions}
    />
  );
};

export default MarkdownEditor;
