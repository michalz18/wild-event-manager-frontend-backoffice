const getLocations = async () => {
    try {
        const response = await fetch(`${process.env.REACT_APP_GET_LOCATIONS}`);
        if (!response.ok) {
            throw new Error("Problem occured with fetching locations!")
        }
        return await response.json();
    } catch (error) {
        console.error("Locations cannot be downloaded!")
    }
}

export { getLocations };