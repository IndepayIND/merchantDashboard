const LogoutScreen = ({ onLogout }) => {
    const handleLogout = () => {
        // Perform logout logic here
        onLogout();
    };

    return (
        <div>
            <h2>Logout</h2>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default LogoutScreen;
