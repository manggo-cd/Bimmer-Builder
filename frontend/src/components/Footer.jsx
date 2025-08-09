import { Link } from 'react-router';

import '../css/Footer.css';

function Footer() {
    return <footer className="footer">
        <div className="navigation">
            <div className="company">
                <Link to="/" className="logo">Home</Link>
                <p>Dedicated to maximizing your smiles per gallon </p>
            </div>

            <div className="links">
                <ul>
                    <li><p>Links</p></li>
                    <li><Link to="/" className="foot-link">About</Link></li>
                    <li><Link to="/" className="foot-link">Link 1</Link></li>
                </ul>
            </div>
        </div>

        <hr />

        <div className="copyright">
            <p>&#169;2025 until the death of combustion engines, Bimmer Builder, LLC. All rights reserved.</p>
        </div>
    </footer>
};

export default Footer;
