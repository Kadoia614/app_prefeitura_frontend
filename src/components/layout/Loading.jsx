import { ProgressSpinner } from 'primereact/progressspinner';
        

const Loading = () => {
  return (
    <>
      <div id="Loading" className="absolute flex justify-center items-center h-full w-full left-0 top-0 brightness-100 bg-gray-700 opacity-60 z-999">
        <ProgressSpinner/>
      </div>

    </>
  );
};

export default Loading;
