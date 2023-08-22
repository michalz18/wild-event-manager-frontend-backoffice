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
const addEvent = async () => {}
export { getAllEvents,addEvent };