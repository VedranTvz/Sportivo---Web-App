import * as signalR from "@microsoft/signalr";


export const connection = new signalR.HubConnectionBuilder()

    .withUrl("https://localhost:5068/notificationhub") 
    .withAutomaticReconnect()
    .build();


connection.start()
    .then(() => console.log("✅ SignalR konekcija uspostavljena."))
    .catch((err) => console.error("❌ Greška pri povezivanju na SignalR:", err));