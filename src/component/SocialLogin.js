import React from 'react'
import SocialLogin from 'react-social-login'

class SocialButton extends React.Component {

    render() {
        const { children, triggerLogin, ...props } = this.props
        return (
            <button onClick={triggerLogin} {...props} style={{ width: 50, height: 50, borderRadius: 20, border: "1px solid lightgrey", marginTop: 10, display: "flex", justifyContent: "center", alignItems: "center" }}>
                {children}
            </button>
        );
    }
}

export default SocialLogin(SocialButton);