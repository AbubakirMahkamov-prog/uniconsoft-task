export interface Project {
    id?: string; // Use string since your schema uses string for id
    name: string;
    org_id: string;
    created_by_id?: string; // Optional since it may not always be provided
  }
  