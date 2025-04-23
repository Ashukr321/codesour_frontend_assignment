// Function to handle user logout
export const handleLogout = () => {
  // Clear all authentication related data
  localStorage.removeItem('userToken')
  localStorage.removeItem('token')
  localStorage.removeItem('userEmail')
  localStorage.removeItem('userPassword')
  localStorage.removeItem('userName')

  // Trigger storage event for navbar update
  window.dispatchEvent(new Event('storage'))
}

// Function to check if user is logged in
export const isAuthenticated = () => {
  return !!localStorage.getItem('token')
}