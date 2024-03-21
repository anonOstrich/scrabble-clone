interface DebugButtonProps {
  children: React.ReactNode;
  handleClick: () => void;
  className?: string;
  type?: 'danger' | 'success' | 'neutral';
}

const colorsByType = {
  danger: 'bg-rose-700 hover:bg-rose-500 focus:bg-rose-500',
  success: 'bg-green-700 hover:bg-green-500 focus:bg-green-500',
  neutral: 'bg-blue-700 hover:bg-blue-500 focus:bg-blue-500',
};

/* 
    Meant for exploring functionality from the frontend, but in the finished product the interaction might start differently than from a button press. 
*/
export default function DebugButton({ children, handleClick, className, type = 'danger' }: DebugButtonProps) {
  return (
    <button
      className={`${className} p-4 m-2 border-2 border-dashed  rounded-lg uppercase hover:scale-105 focus:scale-105 transition-transform ${colorsByType[type]}`}
      onClick={handleClick}
    >
      {children}
    </button>
  );
}
