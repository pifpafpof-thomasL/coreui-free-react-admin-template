import React from 'react'
import {
  CCard,
  CCardBody,
  CCardGroup,
  CCardHeader
} from '@coreui/react'
import TableNext from './TableNext'


const CoursReact = () => {

  return (
    <CCardGroup columns className = "cols-2" >
      <CCard>
        <CCardHeader>
          React table 2
        </CCardHeader>
        <CCardBody>
          <TableNext />
        </CCardBody>
      </CCard>

    
    </CCardGroup>
  )
}

export default CoursReact
