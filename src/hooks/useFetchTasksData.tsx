import { useEffect, useState } from 'react';
import { Task } from "@doist/todoist-api-typescript";
import { api } from '../utils/api';

export const useFetchTasksData = () => {
  const [data, setData] = useState<Array<Task> | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const completedTasks = await fetch('https://api.todoist.com/sync/v9/completed/get_all', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${import.meta.env.VITE_TODOIST_API_KEY}`
          }
        });
        const resultInProgressTasks = await api.getTasks();
        const responseCompletedTasks = await completedTasks.json();
        const tasks = [...(responseCompletedTasks?.items || []), ...resultInProgressTasks]
        setData(tasks);
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    };

    fetchData();
  }, []);

  return { data, isLoading };
};