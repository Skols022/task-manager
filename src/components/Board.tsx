import { FC, useRef, useState } from 'react'
import Button from './UI/Button';
import TaskCard from './TaskCard';
import SelectField from './UI/SelectField';

const dummyCards = [
  { id: 1, name: 'Name 1', description: 'Description 1', assignedTo: 'Pera Peric', status: 'Completed' },
  { id: 2, name: 'Name 2', description: 'Description 2', assignedTo: 'Pera Peric', status: 'Completed' },
  { id: 3, name: 'Name 3', description: 'Description 3', assignedTo: 'Pera Peric', status: 'In Progress' },
  { id: 4, name: 'Name 4', description: 'Description 4', assignedTo: 'Pera Peric', status: 'Completed' },
  { id: 5, name: 'Name 5', description: 'Description 5', assignedTo: 'Pera Peric', status: 'In Progress' },
  { id: 6, name: 'Name 6', description: 'Description 6', assignedTo: 'Pera Peric', status: 'In Progress' }
];

const Board: FC = () => {
  const [cards, setCards] = useState(dummyCards);
  const draggedPerson = useRef<number>(0);
  const draggedOverPerson = useRef<number>(0);

  const handleDrag = () => {
    const clonedCards = [...cards];
    const temp = clonedCards[draggedPerson?.current];
    clonedCards[draggedPerson?.current] = clonedCards[draggedOverPerson?.current];
    clonedCards[draggedOverPerson?.current] = temp;
    setCards(clonedCards);
  }

  return (
    <div className='flex flex-column-center cursor-pointer'>
      <Button />
      <div className='mt-[20px]'>
        <h4 className='h4-text font-bold'>Search Tasks by asignee:</h4>
        <SelectField />
      </div>
      {cards.map(({ id, name, description, status, assignedTo }, index) => (
        <TaskCard 
          draggable={true}
          onDragStart={() => draggedPerson.current = index}
          onDragEnter={() => draggedOverPerson.current = index}
          onDragEnd={handleDrag} key={id} name={name} description={description} status={status} assignedTo={assignedTo} />
      ))}
    </div>
  )
}

export default Board;