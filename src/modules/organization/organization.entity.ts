export interface Organization {
    id?: string; // Use string since your schema uses string for id
    name: string;
    created_by_id?: string; // Optional since it may not always be provided
  }
  