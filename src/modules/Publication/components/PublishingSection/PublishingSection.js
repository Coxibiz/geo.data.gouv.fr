import React from 'react'
import DocumentTitle from 'react-document-title'

import Loader from '../../../../components/Loader/Loader'

import { container } from './PublishingSection.css'

const PublishingSection = ({ pageTitle, title, component, toWait }) => {
  return (
    <DocumentTitle title={pageTitle}>
      <div className={container}>
        <h3>{title}</h3>
        <Loader value={toWait} component={component} />
      </div>
    </DocumentTitle>
  )
}

export default PublishingSection