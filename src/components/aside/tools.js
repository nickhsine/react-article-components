import BackToTopicIcon from '../../assets/aside/back-top-topic.svg'
import BookmarkIcon from '../../assets/aside/tool-bookmark.svg'
import DynamicComponentsContext from '../../contexts/dynamic-components-context'
import FBIcon from '../../assets/aside/share-fb.svg'
import LineIcon from '../../assets/aside/share-line.svg'
import TwitterIcon from '../../assets/aside/share-twitter.svg'
import PrintIcon from '../../assets/aside/tool-print.svg'
import PropTypes from 'prop-types'
import React from 'react'
import TextIcon from '../../assets/aside/tool-text.svg'
import mq from '../../utils/media-query'
import predefinedProps from '../../constants/prop-types/aside'
import styled from 'styled-components'

const ToolsBlock = styled.div`
  display: flex;

  > svg {
    cursor: pointer;
  }

  ${mq.mobileOnly`
    width: 300px;
    margin-left: auto;
    margin-right: auto;
    justify-content: space-around;
  `}

  ${mq.tabletOnly`
    width: 513px;
    margin-left: auto;
    margin-right: auto;
    > svg {
      margin-right: 30px;
    }
  `}

  ${mq.desktopAndAbove`
    width: 20px;
    height: ${props => props.height || 'auto'};
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
  `}
`

const BackToTopicBlock = styled.div`
  position: relative;

  &:after {
    position: absolute;
    content: '回到專題';
    color: #7f7f7f;
    font-size: 14px;
    width: calc(14px * 4);
    line-height: 23px;
    margin-left: 5px;
    opacity: 0;
  }

  &: hover {
    &:after {
      opacity: 1;
      transition: opacity 0.2s ease;
    }
  }
`

function FBShareBT(props) {
  const handleClick = () => {
    const currentURL = window.location.href
    const location =
      'https://www.facebook.com/dialog/feed?' +
      'display=page' +
      `&app_id=${props.appID}` +
      `&link=${encodeURIComponent(currentURL)}` +
      `&redirect_uri=${encodeURIComponent('https://www.facebook.com/')}`

    window.open(location, '_blank')
  }

  return <FBIcon onClick={handleClick} />
}

FBShareBT.propTypes = {
  appID: PropTypes.string.isRequired,
}

function TwitterShareBT(props) {
  const handleClick = () => {
    const currentURL = window.location.href
    const location =
      'https://twitter.com/intent/tweet?' +
      `url=${encodeURIComponent(currentURL)}`

    window.open(location, '_blank')
  }

  return <TwitterIcon onClick={handleClick} />
}

function LineShareBT(props) {
  const handleClick = () => {
    const currentURL = window.location.href
    const location = `https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(
      currentURL
    )}`

    window.open(location, '_blank')
  }

  return <LineIcon onClick={handleClick} />
}

const defaultFbAppID = '962589903815787'

export default class Tools extends React.PureComponent {
  static propTypes = predefinedProps.tools

  render() {
    const { backToTopic, fbAppID, height, onFontLevelChange } = this.props

    return (
      <ToolsBlock height={height}>
        <FBShareBT appID={fbAppID || defaultFbAppID} />
        <TwitterShareBT />
        <LineShareBT />
        <TextIcon onClick={onFontLevelChange} />
        <PrintIcon
          onClick={() => {
            window.print()
          }}
        />
        {/* TODO move bookmark widget out of twreporter-react repo */}
        <BookmarkIcon />
        {backToTopic ? (
          <DynamicComponentsContext.Consumer>
            {components => {
              return (
                <components.Link to={backToTopic} target="_self">
                  <BackToTopicBlock>
                    <BackToTopicIcon />
                  </BackToTopicBlock>
                </components.Link>
              )
            }}
          </DynamicComponentsContext.Consumer>
        ) : null}
      </ToolsBlock>
    )
  }
}
