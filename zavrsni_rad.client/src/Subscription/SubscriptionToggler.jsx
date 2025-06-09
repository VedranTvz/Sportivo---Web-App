

import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function SubscriptionToggle({ user, categoryId }) {


    const [isSubscribed, setIsSubscribed] = useState(false);

    useEffect(() => {
        const checkSubscription = async () => {

            try {
                const res = await axios.get(`https://localhost:5068/api/Subscription/${user.id}`);
                const subs = res.data || [];
                const subscribed = subs.some(sub => sub.categoryId === categoryId);
                setIsSubscribed(subscribed);

            } catch (error) {
                console.error("Failed to get subscriptions", error);
            }
        };

        if (user) {
            checkSubscription();
        }
    }, [user, categoryId]);

    const handleSubscribeClick = async () => {
        if (!user) {
            toast.warn("Please log in to subscribe.");
            return;
        }

        if (isSubscribed) {
            toast.warn("Already subscribed.");
            return;
        }

        try {
            await axios.post("https://localhost:5068/api/Subscription", {
                userId: user.id,
                categoryId: categoryId
            });

            setIsSubscribed(true);
            toast.success("Subscribed successfully!");
        } catch (error) {
            toast.error("Failed to subscribe.");
            console.error(error);
        }
    };

    const handleUnsubscribeClick = async () => {
        try {
            await axios.delete("https://localhost:5068/api/Subscription", {
                params: {
                    userId: user.id,
                    categoryId: categoryId
                }
            });

            setIsSubscribed(false);
            toast.success("Unsubscribed successfully!");
        } catch (error) {
            toast.error("Failed to unsubscribe.");
            console.error(error);
        }
    };

    return (

        <div
            onClick={isSubscribed ? handleUnsubscribeClick : handleSubscribeClick}
            style={{
                fontSize: 20,
                cursor: "pointer",
                color: "black",
                display: "inline-block",
                marginLeft: "10px"
            }}
        >
            {isSubscribed ? (
                <i className="bi bi-star-fill" style={{ color: "yellow", WebkitTextStroke: "1px black"  }}></i>
            ) : (
                <i className="bi bi-star"></i>
            )}
        </div>
    );
}

export default SubscriptionToggle;
