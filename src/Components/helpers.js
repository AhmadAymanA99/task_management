// Simple function to generate a token (for demonstration purposes)
export const generateToken = () => {
    return Math.random().toString(36).substr(2) + Date.now().toString(36);
};

export const isAuthenticated = () => {
    const token = localStorage.getItem("authToken");
    if (!token) {
        return false;
    } else {
        return true;
    }
};
