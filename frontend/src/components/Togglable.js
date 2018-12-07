import React from 'react'
import PropTypes from 'prop-types'
import { Button } from 'react-bootstrap'

class Togglable extends React.Component {
  render() {
    const hideWhenVisible = { display: this.props.visible ? 'none' : '' }
    const showWhenVisible = { display: this.props.visible ? '' : 'none' }

    return (
      <div>
        <div style={hideWhenVisible}>
          <Button bsStyle="primary" onClick={this.props.toggleVisibility}>{this.props.buttonLabel}</Button>
        </div>
        <div style={showWhenVisible}>
          {this.props.children}
        </div>
      </div>
    )
  }
}

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}

export default Togglable