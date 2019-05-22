import PropTypes from 'prop-types'

const elementColors = PropTypes.shape({
  primary: PropTypes.shape({
    text: PropTypes.string,
    line: PropTypes.string,
    shape: PropTypes.string,
  }),
  secondary: PropTypes.shape({
    text: PropTypes.string,
  }),
  base: PropTypes.shape({
    text: PropTypes.string,
    lightText: PropTypes.string,
    line: PropTypes.string,
    shape: PropTypes.string,
  }),
})

export default {
  elementColors,
}
