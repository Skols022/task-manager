import { useEffect, useState } from 'react';
import { api } from '../utils/api';
import { remapTasksData } from '../utils/remapTasksData';

export interface ServedTasks {
  isCompleted: boolean;
  content: string;
  description: string | undefined;
  assigneeId: string | undefined;
  taskStatus: string | undefined;
  inProgressTaskId: string;
  completedTaskId: string;
  otherData: { [key: string]: string | number | boolean | undefined | null }
}

export const useFetchTasksData = () => {
  const [data, setData] = useState<Array<ServedTasks> | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [refetch, setRefetch] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const completedTasks = await fetch(`
          ${import.meta.env.VITE_API_DOMAIN_URL}/sync/v9/completed/get_all`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${import.meta.env.VITE_TODOIST_API_KEY}`
          }
        });
        const resultInProgressTasks = await api.getTasks();
        const responseCompletedTasks = await completedTasks.json();
        const tasks = [...(responseCompletedTasks?.items || []), ...resultInProgressTasks];
        const remappedTasks = remapTasksData({ data: tasks });
        setData(remappedTasks);
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    };

    fetchData();
  }, [refetch]);

  return { data, isLoading, setRefetch, setData };
};