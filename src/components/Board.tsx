import { FC, useEffect, useState } from 'react'
import { unknownData } from '../utils/api';
import { useFetchCollaboratorsData } from '../hooks/useFetchCollaboratorsData';
import { ServedTasks } from '../hooks/useFetchTasksData';
import { useSelector } from 'react-redux';
import DraggableList from './DragableList';
import Skeleton from './Skeleton';

interface BoardProps {
  data: Array<ServedTasks> | null;
}

const Board: FC<BoardProps> = ({ data }) => {
  const { data: collabData, isLoading } = useFetchCollaboratorsData();
  const [cards, setCards] = useState<unknownData>(data);
  const filters = useSelector((state: unknownData) => state.tasks.filter);

  useEffect(() => {
    const filteredCards = filters?.assignee.length > 0 || filters?.status ?
      (data || []).filter((task: ServedTasks) => {
        let statusPasses = true;
        let assigneePasses = true;
        let allPasses = true;
        
        if (filters.status && task.taskStatus !== filters.status) {
          statusPasses = false;
        }
        
        if (filters.assignee.length > 0 && !filters.assignee.includes(task.assigneeId)) {
          assigneePasses = false;
        }

        if (
            filters.assignee.length > 0 && 
            filters.status && 
            filters.assignee.includes(task.assigneeId) && 
            task.taskStatus !== filters.status
          ) {
          allPasses = false;
        }

        return statusPasses && assigneePasses && allPasses;
      })
      : data;
    setCards(filteredCards);
  }, [filters, data]);

  return (
    <div className='flex flex-column-center cursor-pointer'> 
      {isLoading ? <Skeleton withoutHeader={true} /> : <DraggableList items={cards} collabData={collabData} />}
    </div>
  )
}

export default Board;