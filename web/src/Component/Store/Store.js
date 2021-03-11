import * as styles from "./Store.module.css"
import React, { useEffect } from "react"
import PropTypes from "prop-types"

const StoreItem = ({
  categoryId,
  alt,
  displayText,
  id,
  isSpecialStore,
  logoUrl,
  name,
  oldDisplayText,
  oldPreviewText,
  shortname,
  selectStore
}) => {
  return (
    <div className={styles.Brand} onClick={() => selectStore()}>
      <img src={logoUrl} alt={shortname} />
      <div>{displayText}</div>
    </div>
  )
}

StoreItem.propTypes = {
  categoryId: PropTypes.number,
  alt: PropTypes.string,
  displayText: PropTypes.string,
  id: PropTypes.number,
  isSpecialStore: PropTypes.bool,
  logoUrl: PropTypes.string,
  name: PropTypes.string,
  oldDisplayText: PropTypes.string,
  oldPreviewText: PropTypes.string,
  shortname: PropTypes.string,
  selectStore: PropTypes.func
}

const Store = ({ store, category, actions }) => {
  useEffect(() => {
    if (category.data.length > 0 && !store.loading) {
      actions.fetchStore(category.active.id)
    }
  }, [category.data.length, category.active.id]) // eslint-disable-line
  return store.loading ? (
    <div id="loading" style={{ width: "100%" }}>
      ...
    </div>
  ) : (
    <div id="Store" className={styles.Grid}>
      {store.data.map((elm, idx) => {
        return (
          <StoreItem
            key={idx}
            {...elm}
            selectStore={() => {
              window.localStorage.setItem("store.pin", JSON.stringify(elm))
            }}
          />
        )
      })}
      <div className={styles.Btn}>
        <span>All Stores</span>
        <span>View All {category.name} Stores</span>
      </div>
    </div>
  )
}

Store.propTypes = {
  store: PropTypes.shape({
    data: PropTypes.array,
    loading: PropTypes.bool
  }),
  category: PropTypes.shape({
    data: PropTypes.array,
    active: PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string
    })
  }),
  actions: PropTypes.shape({
    fetchStore: PropTypes.func
  })
}

export default Store
