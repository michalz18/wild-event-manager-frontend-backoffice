const getAllRoles = async () => {
    try {
        const response = await fetch(`${process.env.REACT_APP_GET_ROLES}`);
        if (!response.ok) {
            throw new Error("Problem z pobieraniem ról!");
        }
        return await response.json();
    } catch (error) {
        console.error("Nie można pobrać ról:", error);
    }
};

export { getAllRoles };