import { FC } from 'react';

const Button: FC = () => {
  return (
    <button onClick={() => console.log('Modal Opened')} className='text bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
      Create New Task
    </button>
  )
}

export default Button;