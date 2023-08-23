const getUsers = async () => {
    const url = `${'http://localhost:8080/auth/user/names'}`;
    const response = await fetch(url);
    if (!response.ok) {
        throw Error('Failed to deleated todo item!')
    }
    return await response.json()
  }

  export {getUsers};