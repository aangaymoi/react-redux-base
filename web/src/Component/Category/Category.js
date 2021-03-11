import * as styles from "./Category.module.css"

import React, { useEffect } from "react"
import PropTypes from "prop-types"

import { Scrollbars } from "react-custom-scrollbars"

const CategoryItem = ({
  id,
  name,
  shortname,
  iconUrl,
  actived,
  selectCategory
}) => {
  return (
    <div
      className={actived ? `${styles.Tab} ${styles.TabActive}` : styles.Tab}
      onClick={event => {
        event.preventDefault()
        event.stopPropagation()
        selectCategory()
      }}
    >
      <img src={iconUrl} alt={shortname} />
      <div>{name}</div>
    </div>
  )
}

CategoryItem.propTypes = {
  id: PropTypes.number,
  name: PropTypes.string,
  shortname: PropTypes.string,
  href: PropTypes.string,
  iconUrl: PropTypes.string,
  actived: PropTypes.bool,
  selectCategory: PropTypes.func
}

const Category = ({ category, actions }) => {
  useEffect(() => {
    if (!category.data.length && !category.loading) {
      actions.fetchCategory()
    }
  })

  return category.loading === true || !category.active ? (
    <div id="loading" style={{ width: "100%" }}>
      ...
    </div>
  ) : (
    <Scrollbars className={styles.Scroll}>
      <div id="Category" className={styles.Bar}>
        {category.data.map((elm, idx) => {
          return (
            <CategoryItem
              key={idx}
              actived={elm.id === category.active.id}
              selectCategory={() => actions.selectCategory(elm)}
              {...elm}
            />
          )
        })}
      </div>
    </Scrollbars>
  )
}

Category.propTypes = {
  category: PropTypes.shape({
    data: PropTypes.array,
    active: PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string
    }),
    loading: PropTypes.bool
  }),
  actions: PropTypes.shape({
    fetchCategory: PropTypes.func,
    selectCategory: PropTypes.func
  })
}

export default Category
