import { FC } from 'react';

interface ButtonProps {
  onClick: () => void;
  className?: string;
  title?: string
}

const Button: FC<ButtonProps> = ({ onClick, className, title }) => {
  return (
    <button onClick={onClick} className={`text bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${className}`}>
      {title}
    </button>
  )
}

export default Button;