const getAllEvents = async () => {
    try {
        const response = await fetch(`http://localhost:8080/event-management/event`);
        if (!response.ok) {
            throw new Error("Problem occured with fetching today events!")
        }
        return await response.json();
    } catch (error) {
        console.error("Events cannot be downloaded!")
    }
}
const addEvent = async (eventData) => {
    try {
        const response = await fetch(`http://localhost:8080/event-management/event`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(eventData)
        });
        if (!response.ok) {
            throw new Error("Problem occurred while adding an event!");
        }
    } catch (error) {
        console.error("Event could not be added:", error);
    }
}
export { getAllEvents, addEvent };