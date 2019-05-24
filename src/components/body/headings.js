import React from 'react'
import get from 'lodash.get'
import styled, { css } from 'styled-components'
import typography from '../../constants/typography'

const _ = {
  get,
}

const heading = css`
  // clear default margin
  margin: 0;

  font-weight: ${typography.font.weight.bold};
`

const StyledH1 = styled.h1`
  ${heading}
  color: ${props => props.theme.colors.base.text};
  font-size: 34px;
`

const StyledH2 = styled.h2`
  ${heading}
  color: ${props => props.theme.colors.base.text};
  font-size: 28px;
`

const H1 = props => {
  const content = _.get(props, 'data.content.0', '')
  return <StyledH1>{content}</StyledH1>
}

const H2 = props => {
  const content = _.get(props, 'data.content.0', '')
  return <StyledH2>{content}</StyledH2>
}

export default {
  H1,
  H2,
}
