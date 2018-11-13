import React from 'react'
import PropTypes from 'prop-types'
import { Button } from 'react-bootstrap'

class Togglable extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: this.props.visible
    }
  }

  toggleVisibility = () => {
    this.setState({ visible: !this.state.visible })
    this.props.toggleVisibility(!this.state.visible)
  }

  render() {
    const hideWhenVisible = { display: this.state.visible ? 'none' : '' }
    const showWhenVisible = { display: this.state.visible ? '' : 'none' }

    return (
      <div>
        <div style={hideWhenVisible}>
          <Button bsStyle="primary" onClick={this.toggleVisibility}>{this.props.buttonLabel}</Button>
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