import { bindActionCreators } from "redux"
import { connect } from "react-redux"

import { fetchCategory, selectCategory } from "./Category.action"
import Category from "./Category"

const mapStateToProps = state => ({ category: state.categoryReducer.category })
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      fetchCategory,
      selectCategory
    },
    dispatch
  )
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Category)
