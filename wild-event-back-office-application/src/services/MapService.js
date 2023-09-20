const getMap = async (token) => {
    const response = await fetch(`${process.env.REACT_APP_GET_MAP}`, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
    if (!response.ok) {
      throw Error('Failed to fetch map!')
  }
    return await response.json();
}

const saveMap = async (token, map) => {
  try {
      const response = await fetch(`${process.env.REACT_APP_SAVE_MAP}`, {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${token}`,
              "Content-Type": "application/json"
          },
          body: JSON.stringify(map)
      });
      if (!response.ok) {
          throw new Error("Problem occurred while saving map!");
      }
  } catch (error) {
      console.error("Map could not be saved:", error);
  }
}

export { getMap, saveMap };