import React from 'react'
import predefinedProps from './prop-types'
import styled from 'styled-components'

const Block = styled.article`
  padding-bottom: 15px;
  width: 100%;
`

const Thumbnail = styled.figure`
  position: relative;
  margin: 0;
  width: 100%;
  padding-bottom: 56%;
  > img {
    position: absolute;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`

const TextBlock = styled.div`
  padding-right: 19px;
`

const Category = styled.div`
  color: ${props => props.theme.colors.primary.text};
  font-size: 14px;
  font-weight: bold;
  line-height: 1.43;
  margin: 15px 0 10px 0;
`

const Title = styled.h3`
  font-size: 16px;
  font-weight: bold;
  line-height: 1.5;
  color: #404040;
`

const Desc = styled.p`
  font-size: 14px;
  line-height: 1.43;
  color: #808080;
`

const PublishedDate = styled.span`
  font-size: 12px;
  line-height: 2;
  color: #808080;
`

function Card(props) {
  const date = props.date
    ? new Date(props.date).toLocaleString('zh-hant', {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
      })
    : ''

  return (
    <Block>
      <Thumbnail>
        <img src={props.thumbnail} />
      </Thumbnail>
      <TextBlock>
        {props.category ? <Category>{props.category}</Category> : null}
        <Title>{props.title}</Title>
        {props.desc ? <Desc>{props.desc}</Desc> : null}
        {date ? <PublishedDate>{date}</PublishedDate> : null}
      </TextBlock>
    </Block>
  )
}

Card.propTypes = predefinedProps.item

export default Card
