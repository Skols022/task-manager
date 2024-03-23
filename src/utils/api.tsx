// api.ts

import { TodoistApi } from "@doist/todoist-api-typescript";

export const api = new TodoistApi(import.meta.env.VITE_TODOIST_API_KEY);