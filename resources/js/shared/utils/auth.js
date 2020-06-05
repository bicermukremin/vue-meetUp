export function isLoggedIn() {
    return localStorage.getItem("isLoggedIn") == "true";
}
export function isAdmin() {
    return (
        localStorage.getItem("isAdmin") == "Admin" || "Editor" || "Moderator"
    );
}

export function logIn() {
    localStorage.setItem("isLoggedIn", true);
}

export function logOut() {
    localStorage.setItem("isLoggedIn", false);
    localStorage.setItem("isAdmin", null);
}
