const getAllActiveUsers = async () => {
  try {
    const response = await fetch('http://localhost:8080/staff-management/staff');
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
    const response = await fetch('http://localhost:8080/auth/locations');
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
    const response = await fetch(`http://localhost:8080/staff-management/staff`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userDTO),
    });
    if (!response.ok) {
      throw new Error("Failed to add user!");
    }
    return await response.json();
  } catch (error) {
    console.error("Cannot add user:", error);
  }
};

const updateUser = async (userId, userDTO) => {
  try {
    const response = await fetch(
      `http://localhost:8080/staff-management/staff/${userId}`,
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
      `http://localhost:8080/staff-management/staff/deactivate/${userId}`,
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
