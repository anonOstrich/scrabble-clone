type ColorType = 'danger' | 'success' | 'neutral';

interface DebugButtonProps {
  children: React.ReactNode;
  handleClick: () => void;
  className?: string;
  type?: ColorType;
}

const colorsByType = {
  danger: '#77002f',
  success: '#006511',
  neutral: '#aa19b0',
};

const lightColorsByType = {
  danger: '#ae0046',
  success: '#007213',
  neutral: '#e25de8',
};

function stripedBackground(color: ColorType) {
  return `repeating-linear-gradient(
      45deg,
      ${colorsByType[color]},
      ${colorsByType[color]} 10px,
      ${lightColorsByType[color]} 10px,
      ${lightColorsByType[color]} 20px
    )`;
}

/* 
    Meant for exploring functionality from the frontend, but in the finished product the interaction might start differently than from a button press. 
*/
export default function DebugButton({ children, handleClick, className, type = 'danger' }: DebugButtonProps) {
  return (
    <button
      className={`${className} text-white p-[10px] m-2 border-[2px] border-dashed  rounded-lg uppercase hover:scale-105 focus:scale-105 transition-transform ${colorsByType[type]} hover:border-[4px] hover:p-[8px]  focus:border-[4px] focus:p-[8px] hover:border-solid focus:border-solid font-bold`}
      style={{
        background: stripedBackground(type),
      }}
      onClick={handleClick}
    >
      {children}
    </button>
  );
}
