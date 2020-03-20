
import React, { useState, useEffect } from "react";

export const NotificationContext = React.createContext("light");

export function withNotification(Component) {
  return class extends React.Component {
    render() {

      return (
        <NotificationContext.Consumer>
          {value => <Component {...value} {...this.props} />}
        </NotificationContext.Consumer>
      );
    }
  };
}