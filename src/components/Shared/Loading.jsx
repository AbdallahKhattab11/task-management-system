

const Loading = ({display}) => {
  return (
    <div className={`flex items-center justify-center ${display ? 'opacity-100' : 'opacity-0'} `}>
      <div className="size-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
};

export default Loading;
