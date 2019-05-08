import mq from '../../utils/media-query'
import React from 'react'
import styled, { css } from 'styled-components'
import predefinedPropTypes from '../../constants/prop-types'
import styles from '../../constants/css'
// lodash
import get from 'lodash/get'
import map from 'lodash/map'

const _ = {
  get,
  map,
}

const Container = styled.div`
  ${mq.desktopOnly`
    width: 480px;
  `}
  ${mq.hdOnly`
    width: 580px;
  `}
  margin: 0 auto;
`

const listStyle = css`
  ${styles.paragraphText}
  margin-block-start: 0;
  margin-block-end: 0;
  margin: 0 0 0 3em;
  padding: 0;
`

const Ul = styled.ul`
  ${listStyle}
  list-style-type: disc;
`

const Ol = styled.ol`
  ${listStyle}
  list-style-type: decimal;
`

const Li = styled.li`
  margin: 0 0 1em 0;
  padding: 0;
  &:last-child {
    margin-bottom: 0;
  }
`

const buildLi = listItem => (
  <Li dangerouslySetInnerHTML={{ __html: listItem }} />
)

// eslint-disable-next-line react/display-name
const buildList = ordered => {
  const L = ordered ? Ol : Ul
  const List = props => {
    const listItems = _.get(props, ['data', 'content'])
    if (!Array.isArray(listItems) || listItems.length === 0) {
      return null
    }
    return (
      <Container>
        <L>{_.map(listItems, buildLi)}</L>
      </Container>
    )
  }
  List.propTypes = {
    data: predefinedPropTypes.elementData,
  }
  return List
}

export default {
  UnorderedList: buildList(false),
  OrderedList: buildList(true),
}