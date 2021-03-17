import React from 'react'
import { Redirect } from 'react-router-dom'

class ProtectedRoute extends React.Component {

    render() {
        const Component = this.props.component;
        const isAuthenticated = localStorage.getItem("resolve-refresh-token");
        return isAuthenticated ? (<Component />) : (<Redirect to={{ pathname: '/userauth' }} />);
    }
}

export default ProtectedRoute;