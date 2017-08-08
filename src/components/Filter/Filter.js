import React from 'react'
import { translate } from 'react-i18next'
import PropTypes from 'prop-types'

import styles from './Filter.scss'

const Filter = ({ detail, remove, filter, style, onClick, t, i18n }) => {
  const title = t(`components.Filter.${filter.name}`)
  const value = i18n.exists(`components.Filter.${filter.value}`)
    ? t(`components.Filter.${filter.value}`)
    : filter.value

  return (
    <button
      className={styles.link}
      title={`${title}: ${value}`}
      style={style}
      onClick={onClick && (() => onClick(filter))}
    >
      <span>{detail && `${title}:`}</span><span className={styles.filterValue}>{value}</span>
      {remove && (
        <span> <i className='remove icon' /></span>
      )}
    </button>
  )
}

Filter.propTypes = {
  detail: PropTypes.bool,
  remove: PropTypes.bool,
  filter: PropTypes.shape({
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired
  }).isRequired,
  style: PropTypes.object,
  onClick: PropTypes.func,

  t: PropTypes.func.isRequired,
  i18n: PropTypes.object.isRequired
}

Filter.defaultProps = {
  detail: false,
  remove: false
}

export default translate('Common')(Filter)
