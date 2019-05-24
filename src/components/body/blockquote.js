import mq from '../../utils/media-query'
import predefinedPropTypes from '../../constants/prop-types/body'
import React, { PureComponent } from 'react'
import styled from 'styled-components'
import typography from '../../constants/typography'
// lodash
import get from 'lodash/get'

const _ = {
  get,
}

const Quote = styled.blockquote`
  // clear default margin
  margin: 0;

  line-height: 2.11;
  letter-spacing: 0.6px;
  color: ${props => props.theme.colors.base.lightText};
  font-size: ${props => props.theme.fontSizeOffset + 18}px;
  font-weight: ${typography.font.weight.normal};
  border-left: 2px solid ${props => props.theme.colors.base.line};
  ${mq.mobileOnly`
    padding-left: 16px;
  `}
  ${mq.tabletOnly`
    padding-left: 18px;
  `}
  ${mq.desktopOnly`
    padding-left: 18px;
  `}
  ${mq.hdOnly`
    padding-left: 20px;
  `}
`

export default class Blockquote extends PureComponent {
  static propTypes = {
    data: predefinedPropTypes.elementData.isRequired,
  }

  render() {
    const { data } = this.props
    const quote = _.get(data, ['content', 0])
    return quote ? <Quote dangerouslySetInnerHTML={{ __html: quote }} /> : null
  }
}
