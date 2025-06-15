const PrimaryButton = ({ text, onclick, type, customStyles, isLoading }) => {
  return (
    <button
      disabled={isLoading}
      type={type}
      onClick={onclick}
      className={
        customStyles
          ? customStyles
          : "h-[40px] md:h-[48px] lg:h-[56px] w-[188px] md:w-[190px] lg:w-[193px] text-base lg:text-[18px] text-white font-medium tracking-wide rounded-xl bg-blue cursor-pointer hover:scale-102 transition-all duration-200 disabled:opacity-50 "
      }
    >
      <p className="">{text}</p>

    </button>
  );
};

export default PrimaryButton;
