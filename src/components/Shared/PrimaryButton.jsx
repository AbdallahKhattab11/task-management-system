

const PrimaryButton = ({text, onclick, type, customStyles}) => {
  return (
    <button type={type} onClick={onclick} className={customStyles ? customStyles : 'primaryButton'}>
      {text}
    </button>
  )
}

export default PrimaryButton
