export const Nav = ({children, className}) => {
    return (
        // If no className is passed, use the navbar styles
        <nav className={className ?? 'navbar'}>
            {/* Doing it this way makes it more reusable across this app */}
            {children}
        </nav>
    );
}