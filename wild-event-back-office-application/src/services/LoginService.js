export const loginUser = async(email, password) => {
    const response = await fetch(`${process.env.REACT_APP_LOGIN_USER}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({email, password}),
    });
    
    if (response.ok) {
        console.log(response)
        return await response.json();
      } else {
        const message = await response.text();
        throw new Error(message);
      }
}

export const generateResetLink = async (email) => {
  const response = await fetch(`${process.env.REACT_APP_GENERATE_RESET_PASSWORD_LINK}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email }),
  });

  if (response.ok) {
    return 'Reset link has been sent to your email address.';
  } else {
    const message = await response.text();
    throw new Error(message);
  }
};