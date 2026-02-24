import type { ComponentType } from "react";
import { Form1040 } from "./form-1040";
import { FormTbd } from "./form-tbd";

export interface FormEntry {
  id: string;
  label: string;
  component: ComponentType;
  xmlFile: string;
}

export const FORMS: FormEntry[] = [
  { id: "form1040", label: "Form 1040", component: Form1040, xmlFile: "1040.xml" },
  { id: "formtbd", label: "Form TBD", component: FormTbd, xmlFile: "formtbd.xml" },
];
