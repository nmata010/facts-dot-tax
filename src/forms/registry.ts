import type { ComponentType } from "react";
import { Form1040 } from "./form-1040";
import { FormTbd } from "./form-tbd";

export interface FormEntry {
  id: string;
  label: string;
  component: ComponentType;
}

export const FORMS: FormEntry[] = [
  { id: "form1040", label: "Form 1040", component: Form1040 },
  { id: "formtbd", label: "Form TBD", component: FormTbd },
];
