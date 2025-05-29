

const TetiaryButton = ({type, onclick, text,customStyles}) => {
  return (
    <button type={type} onClick={onclick} className={customStyles ? customStyles : 'tetiaryButton'}>
      {text}
    </button>
  )
}

export default TetiaryButton
