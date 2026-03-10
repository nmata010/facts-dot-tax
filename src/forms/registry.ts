import type { ComponentType } from "react";
import { Form1040 } from "./form-1040";
import { FormTbd } from "./form-tbd";
import { Schedule1 } from "./schedule-1";
import { Schedule2 } from "./schedule-2";
import { Schedule3 } from "./schedule-3";
import { ScheduleA } from "./schedule-a";
import { Schedule1A } from "./schedule-1a";
import { Schedule8812 } from "./schedule-8812";
import { Form8995 } from "./form-8995";
import { Form8889 } from "./form-8889";
import { ScheduleB } from "./schedule-b";
import { ScheduleSE } from "./schedule-se";
import { Eic } from "./eic-worksheet";

export interface FormEntry {
  id: string;
  label: string;
  component: ComponentType;
  xmlFile: string;
}

export const FORMS: FormEntry[] = [
  { id: "form1040", label: "Form 1040", component: Form1040, xmlFile: "1040.xml" },
  { id: "schedule1", label: "Schedule 1", component: Schedule1, xmlFile: "schedule1.xml" },
  { id: "schedule1A", label: "Schedule 1-A", component: Schedule1A, xmlFile: "schedule1A.xml" },
  { id: "schedule2", label: "Schedule 2", component: Schedule2, xmlFile: "schedule2.xml" },
  { id: "schedule3", label: "Schedule 3", component: Schedule3, xmlFile: "schedule3.xml" },
  { id: "scheduleA", label: "Schedule A", component: ScheduleA, xmlFile: "scheduleA.xml" },
  { id: "scheduleB", label: "Schedule B", component: ScheduleB, xmlFile: "scheduleB.xml" },
  { id: "schedule8812", label: "Schedule 8812", component: Schedule8812, xmlFile: "schedule8812.xml" },
  { id: "form8995", label: "Form 8995", component: Form8995, xmlFile: "f8995.xml" },
  { id: "form8889", label: "Form 8889", component: Form8889, xmlFile: "f8889.xml" },
  { id: "scheduleSE", label: "Schedule SE", component: ScheduleSE, xmlFile: "scheduleSE.xml" },
  { id: "eic", label: "EIC Worksheet", component: Eic, xmlFile: "eic-worksheet.xml" },
  { id: "formtbd", label: "Form TBD", component: FormTbd, xmlFile: "formtbd.xml" },
];
