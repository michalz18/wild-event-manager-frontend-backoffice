const getUsers = async (token) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_GET_USER}`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });
        if (!response.ok) {
            throw new Error("Problem occured with fetching users!")
        }
        return await response.json();
    } catch (error) {
        console.error("Users cannot be downloaded!")
    }
}

export { getUsers };