export default function authHeader() {
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
  console.log("Usuario en localStorage:", storedUser);
  console.log("Roles en localStorage:", storedUser.roles);

  console.log("Usuario en localStorage:", user); // Depuración

  if (user && user.accessToken) {
    return { 'x-access-token': user.accessToken };
  } else {
    return {};
  }
}
