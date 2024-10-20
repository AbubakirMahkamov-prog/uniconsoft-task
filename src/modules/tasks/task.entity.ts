export interface Task {
  id?: string; // Optional as it may be auto-generated or not always provided
  name: string;
  detail?: string; // Optional as it is nullable in the schema
  project_id: string;
  worker_user_id: string;
  status: 'CREATED' | 'IN_PROCESS' | 'DONE'; // Enum as per the schema
  created_by_id?: string; // Optional in case it might not always be provided
  created_at: number;
  due_date: number;
  done_at?: number; // Optional since it may be null until the task is done
}
