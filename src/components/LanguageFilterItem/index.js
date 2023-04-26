import './index.css'

const LanguageFilterItem = props => {
  const {tabDetails, clickTabItem, isActive} = props
  const {language, id} = tabDetails

  const tabdesign = isActive ? 'classBorder' : ''

  const onClickTabItem = () => {
    clickTabItem(id)
  }

  return (
    <li className="list">
      <button
        type="button"
        onClick={onClickTabItem}
        className={`border${tabdesign}`}
      >
        {language}
      </button>
    </li>
  )
}

export default LanguageFilterItem
