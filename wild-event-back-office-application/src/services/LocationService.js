
const getLocations = async () => {
    const url = `${'http://localhost:8080/auth/locations'}`;
    const response = await fetch(url);
    if (!response.ok) {
        throw Error('Failed to deleated todo item!')
    }
    return await response.json()
  }

  export {getLocations};