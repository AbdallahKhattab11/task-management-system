

const SecondaryButton = ({type, onclick, text,customStyles}) => {
  return (
    <button type={type} onClick={onclick} className={customStyles ? customStyles : 'secondaryButton'}>
      {text}
    </button>
  )
}

export default SecondaryButton
