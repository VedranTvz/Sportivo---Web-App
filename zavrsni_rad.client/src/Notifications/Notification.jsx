import React, { useEffect, useState } from "react";
import axios from "axios";
import { UserSession } from "../Hooks/UserHook";
import { connection } from "../signalR/connection"




const Notification = () => {

    const [notifications, setNotifications] = useState([]);
    const getUser = UserSession();

    const userId = getUser.id;

    useEffect(() => {

        if (!userId) return;

        
        const fetchNotifications = async () => {
            try {
                const res = await axios.get(`https://localhost:5068/api/notifications/${userId}`);

                setNotifications(res.data);

            } catch (error) {
                console.error("Greška pri dohvaćanju notifikacija:", error);
            }
        };

        fetchNotifications();



        const handleNotification = (notification) => {

            console.log("Primljena SignalR notifikacija:", notification);
            setNotifications((prev) => [notification, ...prev]);

        };

        connection.on("ReceiveNotification", handleNotification);

        return () => {

            connection.off("ReceiveNotification", handleNotification);
        };

    }, [userId]);



    const deleteNotification = async (id) => {

        try {

            await axios.delete(`https://localhost:5068/api/notifications/${id}`);
            setNotifications(notifications.filter((n) => n.id !== id));

        } catch (error) {

            console.error("Failed to delete notification", error);
        }
    };


    return (

        <div>
            {notifications.length === 0 ? (
                <p>No notifications</p>

            ) : (
                notifications.map((notification) => (
                    <div
                        key={notification.id}
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            padding: "8px",
                            borderBottom: "1px solid #ccc",
                        }}
                    >
                        <span>{notification.message}</span>
                        <button

                            onClick={() => deleteNotification(notification.id)}
                            style={{
                                border: "none",
                                background: "transparent",
                                fontWeight: "bold",
                                cursor: "pointer",
                                color: "red",
                            }}
                            aria-label="Delete notification"
                        >
                            ✕
                        </button>
                    </div>
                ))
            )}
        </div>
    );
};

export default Notification;
