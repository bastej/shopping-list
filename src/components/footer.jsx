import React, { Component } from 'react';
import "./styles/footer.sass"

class Footer extends Component {
    state = {  }
    render() { 
        return (
            <div>
                <footer className="footer bg-dark">
                    <div className="container">
                    </div>
                </footer>
                <footer className="footer footer-copyright">
                    <div className="container text-white">
                        Copyrights
                    </div>
                </footer>
            </div>
        );
    }
}
 
export default Footer;