const getLocations = async (token) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_GET_LOCATIONS}`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });
        if (!response.ok) {
            throw new Error("Problem occured with fetching locations!")
        }
        return await response.json();
    } catch (error) {
        console.error("Locations cannot be downloaded!")
    }
}

const submitLocation = async (token, location) => {
    if (location.id) {
        try {
            const response = await fetch(`${process.env.REACT_APP_SUBMIT_LOCATION}`, {
                method: "PATCH",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(location)
            });

            if (!response.ok) {
                throw new Error("Problem occurred while updating the location!");
            }
        } catch (error) {
            console.error("Location could not be updated: ", error);
        }

    } else {
        try {
            const response = await fetch(`${process.env.REACT_APP_SUBMIT_LOCATION}`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(location)
            });
            if (!response.ok) {
                throw new Error("Problem occurred while adding the location!");
            }
        } catch (error) {
            console.error("Location could not be added:", error);
        }
    }

}

const deleteLocation = async (token, id) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_DELETE_LOCATION}/${id}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
        });
        if (!response.ok) {
            throw new Error("Problem occurred while deleting the location!");
        }
    } catch (error) {
        return console.error("Location could not be deleted:", error);
    }
}

export { getLocations, submitLocation, deleteLocation };