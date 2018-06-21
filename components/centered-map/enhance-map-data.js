import React from 'react'
import PropTypes from 'prop-types'
import hoist from 'hoist-non-react-statics'
import computeBbox from '@turf/bbox'
import flip from '@turf/flip'

import {isBboxFlipped, flipBbox} from '../../lib/geo/bbox'

export default Map => hoist(class extends React.PureComponent {
  static propTypes = {
    frozen: PropTypes.bool,
    extent: PropTypes.object,
    data: PropTypes.shape({
      features: PropTypes.arrayOf(PropTypes.shape({
        properties: PropTypes.object.isRequired
      }))
    }).isRequired
  }

  static defaultProps = {
    frozen: false,
    extent: null
  }

  render() {
    const {data, extent, frozen, ...otherProps} = this.props

    let transformed = false
    let transformedData = data

    let bbox = computeBbox(transformedData)
    if (extent) {
      if (isBboxFlipped(bbox, computeBbox(extent))) {
        transformed = true
        transformedData = flip(data, {mutate: false})
        bbox = flipBbox(bbox)
      }
    }

    if (!frozen) {
      // We’re adding a unique id to all features so that we can easily identify them later.

      if (transformedData.features) {
        if (!transformed) {
          transformedData = {...transformedData}
        }

        transformedData.features = transformedData.features.map((feature, id) => ({
          ...feature,
          id
        }))
      }
    }

    return (
      <Map
        data={transformedData}
        frozen={frozen}
        bbox={bbox}
        {...otherProps}
      />
    )
  }
}, Map)
