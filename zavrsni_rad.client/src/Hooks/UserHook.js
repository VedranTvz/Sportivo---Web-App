export function UserSession() {

    const user = JSON.parse(sessionStorage.getItem("user"));
    return user;
}