import React from 'react'
import predefinedPropTypes from '../../constants/prop-types/body'
import styled from 'styled-components'
// lodash
import forEach from 'lodash/forEach'
import get from 'lodash/get'
import merge from 'lodash/merge'

const _ = {
  forEach,
  get,
  merge,
}

const Container = styled.div`
  overflow: visible;
`

const Embedded = styled.div`
  overflow: visible;
  text-align: center;
`

const Caption = styled.div`
  line-height: 1.36;
  letter-spacing: 0.5px;
  font-size: 14px;
  color: ${props => props.theme.colors.base.text};
  padding: 20px;
  text-align: center;
`

function dispatchLoadEvent() {
  let loadEvent
  try {
    loadEvent = new Event('load') // eslint-disable-line no-undef
  } catch (err) {
    loadEvent = document.createEvent('Event')
    loadEvent.initEvent('load', true, true)
  }
  window.dispatchEvent(loadEvent)
}

/**
 * Pick attributes that start with data and return them with a new object.
 * Example: ({ dataWidth: 100, dataPicId: 'xn3K8s' }) => ({ width: 100, picId: 'xn3K8s' })
 * Ref: https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dataset
 *
 * @param {Object} attributes attributes object with camelcased keys
 * @returns {Object} dataset object
 */
function _pickDatasetFromAttribs(attributes) {
  const dataset = {}
  _.forEach(attributes, (value, key) => {
    const reg = /^data[^a-z]/
    if (reg.test(key)) {
      const newKeyInDataset = key.replace(reg, matched =>
        matched.substr(-1, 1).toLowerCase()
      )
      dataset[newKeyInDataset] = value
    }
  })
  return dataset
}

export default class EmbeddedCode extends React.PureComponent {
  static propTypes = {
    data: predefinedPropTypes.elementData,
  }

  constructor(props) {
    super(props)
    this._embbed = React.createRef()
  }

  componentDidMount() {
    // workaround for rendering venngage embedded infographics
    // In the script(https://infograph.venngage.com/js/embed/v1/embed.js) venngage provided,
    // it addEventListener on 'load' event.
    // After 'load' event emits, it renders the iframe.
    // Hence, we emit the 'load' event after the script downloaded and executed.
    const node = this._embbed.current
    const scripts = _.get(this.props, ['data', 'content', 0, 'scripts'])
    if (node && Array.isArray(scripts)) {
      _.forEach(scripts, script => {
        const scriptEle = document.createElement('script')
        const attribs = script.attribs
        const dataset = _pickDatasetFromAttribs(attribs)
        _.merge(scriptEle, attribs, {
          dataset,
          text: script.text || '',
          onload: dispatchLoadEvent,
        })
        node.appendChild(scriptEle)
      })
    }
  }

  render() {
    const { caption, embeddedCodeWithoutScript } = _.get(
      this.props,
      ['data', 'content', 0],
      {}
    )
    return (
      <Container>
        <Embedded
          ref={this._embbed}
          dangerouslySetInnerHTML={{ __html: embeddedCodeWithoutScript }}
        />
        {caption ? <Caption>{caption}</Caption> : null}
      </Container>
    )
  }
}
