import Card from './card'
import DynamicComponentsContext from '../../contexts/dynamic-components-context'
import PropTypes from 'prop-types'
import React from 'react'
import get from 'lodash/get'
import map from 'lodash/map'
import predefinedProps from './prop-types'
import styled from 'styled-components'

const _ = {
  get,
  map,
}

const mockup = {
  desktop: {
    card: {
      width: 184, // px
      marginRight: 4, // px
    },
    descriptor: {
      width: 180, // px
      marginRight: 8, // px
    },
  },
}

const Block = styled.section`
  display: flex;
`

const Descriptor = styled.div`
  width: ${mockup.desktop.descriptor.width}px;
  flex-shrink: 0;
  font-size: 16px;
  font-weight: bold;
  line-height: 1.5;
  letter-spacing: 0.4px;
  color: #494949;
  margin-right: ${mockup.desktop.descriptor.marginRight}px;
`

const SeparationLine = styled.div`
  width: 100%;
  height: 12px;
  border-right: solid 0.5px #d8d8d8;
`

const UpperSeparationLine = styled(SeparationLine)`
  border-top: solid 0.5px #d8d8d8;
  margin-bottom: -2px;
`

const List = styled.div`
  display: inline-flex;
  flex-wrap: wrap;
`

const Item = styled.div`
  flex: 0 1 ${mockup.desktop.card.width}px;
  margin-right: ${mockup.desktop.card.marginRight}px;
  border-style: solid;
  border-width: 0 0.5px 0.5px 0;
  border-color: #d8d8d8;
  margin-bottom: 40px;
`

export default class Related extends React.PureComponent {
  static propTypes = {
    data: PropTypes.arrayOf(predefinedProps.card),
  }

  static defaultProps = {
    data: [],
  }

  render() {
    const { data } = this.props

    const cards = _.map(data, item => {
      return (
        <DynamicComponentsContext.Consumer key={item.id}>
          {components => {
            return (
              <Item>
                <components.Link
                  to={item.href}
                  target={
                    _.get(item, 'isTargetBlank', false) ? '_blank' : '_self'
                  }
                >
                  <Card {...item} />
                </components.Link>
              </Item>
            )
          }}
        </DynamicComponentsContext.Consumer>
      )
    })

    return (
      <Block>
        <Descriptor>
          <UpperSeparationLine />
          相關文章
        </Descriptor>
        <List>{cards}</List>
      </Block>
    )
  }
}
