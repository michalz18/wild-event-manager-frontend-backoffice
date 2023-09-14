export const loginUser = async(email, password) => {
    const response = await fetch(`${process.env.REACT_APP_LOGIN_USER}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({email, password}),
    });
    
    if (response.ok) {
        return await response.json();
      } else {
        const message = await response.text();
        throw new Error(message);
      }
}