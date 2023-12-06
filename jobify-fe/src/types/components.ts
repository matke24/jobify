import { JobStatus, JobType } from "../enum";

export interface FormRowProps {
  id: string;
  type: string;
  name: string;
  placeholder?: string;
  required?: boolean;
  label?: string;
  defaultValue?: string;
}

export interface FromRowSelectProps {
  name: string;
  label?: string;
  list: string[];
  defaultValue?: JobStatus | JobType;
}
