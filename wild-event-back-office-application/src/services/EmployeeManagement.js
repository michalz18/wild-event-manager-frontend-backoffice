const getAllActiveUsers = async () => {
  try {
    const response = await fetch(`${process.env.REACT_APP_GET_ACTIVE_USERS}`);
    if (!response.ok) {
      throw new Error("Failed to fetch active users!");
    }
    return await response.json();
  } catch (error) {
    console.error("Cannot fetch active users!");
  }
};

const getAllLocations = async () => {
  try {
    const response = await fetch(`${process.env.REACT_APP_GET_LOCATIONS}`);
    if (!response.ok) {
        throw new Error("There is an issue with fetching locations!");
    }
    return await response.json();
} catch (error) {
    console.error("Cannot fetch locations:", error);
}
};

const addUser = async (userDTO) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_ADD_USER}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userDTO),
    });

    if (!response.ok) {
      throw new Error("Failed to add user!");
    }

    const contentType = response.headers.get("content-type");
    
    if (contentType && contentType.indexOf("application/json") !== -1) {
      return await response.json();
    } else {
      return await response.text();
    }
  } catch (error) {
    console.error("Cannot add user:", error);
  }
};

const updateUser = async (userId, userDTO) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_UPDATE_USER}${userId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userDTO),
      }
    );
    if (!response.ok) {
      throw new Error("There is an issue with updating user!");
    }
  } catch (error) {
    console.error("Cannot update user:", error);
  }
};

const deactivateUser = async (userId) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_DEACTIVATE_USER}${userId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) {
      throw new Error("There is an issue with deactivating user!");
    }
  } catch (error) {
    console.error("Cannot deactivate user: ", error);
  }
};

export { getAllActiveUsers, getAllLocations, addUser, updateUser, deactivateUser };
