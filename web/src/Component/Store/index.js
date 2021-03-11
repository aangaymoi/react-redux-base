import { bindActionCreators } from "redux"
import { connect } from "react-redux"

import { fetchStore } from "./Store.action"
import Store from "./Store"

const mapStateToProps = state => ({
  store: state.storeReducer.store,
  category: state.categoryReducer.category
})
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      fetchStore
    },
    dispatch
  )
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Store)
