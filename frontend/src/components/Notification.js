import React from 'react'
import { connect } from 'react-redux'
import { Alert } from 'react-bootstrap'

class NotificationBase extends React.Component {
  render() {
    if (this.props.notification.type > 0) {
      return (
        <Alert className="alert-fixed" bsStyle={ this.props.notification.type === 2 ? 'danger' : 'success' }>
          {this.props.notification.content}
        </Alert>
      )
    }

    // info is empty, don't show anything
    return null
  }
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification
  }
}

const Notification = connect(
  mapStateToProps
)(NotificationBase)

export default Notification
