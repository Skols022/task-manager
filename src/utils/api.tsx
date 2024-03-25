// api.ts

import { TodoistApi } from "@doist/todoist-api-typescript";

export const api = new TodoistApi(import.meta.env.VITE_TODOIST_API_KEY);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type unknownData = any;