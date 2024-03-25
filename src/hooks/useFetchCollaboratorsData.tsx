import { useEffect, useState } from 'react';
import { User } from "@doist/todoist-api-typescript";
import { api } from '../utils/api';

export const useFetchCollaboratorsData = () => {
  const [data, setData] = useState<Array<User> | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const collaborators = await api.getProjectCollaborators(import.meta.env.VITE_PROJECT_ID);
        setData(collaborators);
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    };

    fetchData();
  }, []);

  return { data, isLoading };
};