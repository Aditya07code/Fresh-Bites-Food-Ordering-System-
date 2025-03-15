import React, { useState, useEffect } from "react";
import "./List.css";
import axios from "axios";
import { toast } from "react-toastify";

const List = ({ url }) => {
    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(true);

    // ✅ Fetch food list from API
    const fetchList = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${url}/api/food/list`);
            console.log("API Response:", response.data);

            if (response.data.success) {
                setList(response.data.data);
            } else {
                toast.error("Failed to fetch food list.");
            }
        } catch (error) {
            console.error("Error fetching list:", error);
            toast.error("Could not fetch food list. Check API.");
        }
        setLoading(false);
    };

    // ✅ Remove a food item
    const removeFood = async (foodId) => {
        if (!foodId) {
            toast.error("Invalid food item.");
            return;
        }

        try {
            console.log("Removing Food ID:", foodId);
            const response = await axios.post(`${url}/api/food/remove`, { id: foodId });

            if (response.data.success) {
                toast.success(response.data.message);
                fetchList(); // ✅ Refresh the list after removal
            } else {
                toast.error("Failed to remove item.");
            }
        } catch (error) {
            console.error("Error removing food:", error);
            toast.error("Error removing item.");
        }
    };

    useEffect(() => {
        fetchList();
    }, [url]);

    return (
        <div className="list-navbar">
            <h2>All Food List</h2>
            {loading ? (
                <p>Loading food list...</p>
            ) : list.length > 0 ? (
                <div className="list-container">
                    {list.map((item, index) => {
                        console.log("Food Item:", item); // ✅ Debugging

                        return (
                            <div key={index} className="list-item">
                                <img src={`${url}/images/${item.image}`} alt={item.name} />
                                <p className="food-name">{item.name}</p>
                                <p className="food-category">{item.category}</p>
                                <p className="food-price">${item.price}</p>
                                <button className="remove-btn" onClick={() => removeFood(item._id)}>Remove</button>
                            </div>
                        );
                    })}
                </div>
            ) : (
                <p>No food items available.</p>
            )}
        </div>
    );
};

export default List;
