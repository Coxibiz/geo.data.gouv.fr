import React from 'react'
import DocumentTitle from 'react-document-title'
import { isArray, forEach } from 'lodash'

import Datasets from '../../components/Datasets/Datasets'

const DISABLED_FILTERS = [ 'q', 'page', 'offset', 'limit' ]

export function _extractFilters(query) {
  let filters = []
  forEach(query, function(value, key) {
    if (DISABLED_FILTERS.includes(key)) {
      return
    }

    if (isArray(value)) {
      forEach(value, function(current) {
        filters.push({name: key, value: current})
      })
    } else {
      filters.push({name: key, value})
    }
  })

  return filters
}

export function parseQuery(query) {
  return {
    textInput: query.q,
    page: query.page || 1,
    filters: _extractFilters(query),
  }
}

class WrappedDatasets extends Component {
  constructor(props) {
    super(props)
    this.state = { query: parseQuery(this.props.location.query) }
  }

  render() {
    return (
      <DocumentTitle title={'Recherche jeu de données'}>
        <Datasets pathname={this.props.location.pathname} query={this.state.query}/>
      </DocumentTitle>
    )
  }
}

export default WrappedDatasets
