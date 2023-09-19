const getAllActiveUsers = async (token) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_GET_ACTIVE_USERS}`, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });
    if (!response.ok) {
      throw new Error("Failed to fetch active users!");
    }
    return await response.json();
  } catch (error) {
    console.error("Cannot fetch active users:", error);
  }
};


const getAllLocations = async (token) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_GET_LOCATIONS}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    if (!response.ok) {
      throw new Error("There is an issue with fetching locations!");
    }
    return await response.json();
  } catch (error) {
    console.error("Cannot fetch locations:", error);
  }
};

const registerUser = async (userDTO) => {
  const response = await fetch(`${process.env.REACT_APP_REGISTER_USER}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userDTO),
  });

  if (response.ok) {
    const data = await response.json();
    return data;
  } else {
    const message = await response.text();
    throw new Error(message);
  }
};

const updateUser = async (userId, userDTO, token) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_UPDATE_USER}${userId}`,
      {
        method: "PUT",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
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

const deactivateUser = async (userId, token) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_DEACTIVATE_USER}${userId}`,
      {
        method: "PUT",
        headers: {
          "Authorization": `Bearer ${token}`
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

const resetPassword = async (token, newPassword) => {
  const response = await fetch(`${process.env.REACT_APP_RESET_PASSWORD}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ token, newPassword }),
  });

  if (response.ok) {
    const message = await response.text();
    console.log("Password reset successful:", message);
    return message;
  } else {
    const errorMessage = await response.text();
    console.error("Cannot reset password:", errorMessage);
    throw new Error(errorMessage);
  }
};



export { getAllActiveUsers, getAllLocations, registerUser, updateUser, deactivateUser, resetPassword };
