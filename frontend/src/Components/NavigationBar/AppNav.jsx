import { Link } from "react-router-dom";
import { Nav, NavItem, NavSection } from './index'
export const AppNav = () => {
    return (
        <Nav>
            <NavSection onClick={() => console.log('Hello Nav!')}>
                <NavItem>
                    {/* Don't use anchor tags with react-router-dom
                        anchor tags by default refresh the page */}
                    {/* Link does NOT refresh the page. It works the same though */}
                    {/* <a className="nav-link" href="/">Home</a> */}
                    <Link to="/" className="nav-link">Home</Link>
                </NavItem>
                <NavItem>
                    <Link to="/about" className="nav-link">About</Link>
                </NavItem>
                <NavItem>
                    <Link to="/car" className="nav-link">Car List</Link>
                </NavItem>
                <NavItem>
                    <Link to="/contact" className="nav-link">Contact Us</Link>
                </NavItem>
            </NavSection>
        </Nav>
    );
}