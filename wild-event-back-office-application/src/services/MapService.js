const getMap = async () => {
    const url = `${process.env.REACT_APP_GET_MAP}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw Error('Failed to fetch map!')
  }
    return await response.json();
}

const saveMap = async (map) => {
  try {
      const response = await fetch('http://localhost:8080/map-config/map', {
          method: "POST",
          headers: {
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