import React, { useState } from "react";
import "./Add.css";
import { assets } from "../../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";
import Resizer from "react-image-file-resizer"; // ✅ Image Resizer Library

const Add = ({ url }) => {
    const [image, setImage] = useState(null);
    const [data, setData] = useState({
        name: "",
        description: "",
        price: "",
        category: "Salad",
    });

    // ✅ Handle Input Change
    const onChangeHandler = (event) => {
        const { name, value } = event.target;
        setData((prevData) => ({ ...prevData, [name]: value }));
    };

    // ✅ Image Resizing Before Upload
    const onImageChange = (event) => {
        const file = event.target.files[0];

        if (file) {
            if (file.size > 200 * 1024) {
                toast.warning("Image is too large. Resizing...");
                
                Resizer.imageFileResizer(
                    file,
                    300, // Max width
                    300, // Max height
                    "JPEG", // Output format
                    80, // Quality (0-100)
                    0, // Rotation
                    (uri) => {
                        setImage(uri);
                        toast.success("Image resized successfully!");
                    },
                    "file" // Output type
                );
            } else {
                setImage(file);
            }
        }
    };

    // ✅ Handle Form Submission
    const onSubmitHandler = async (event) => {
        event.preventDefault();

        if (!image) {
            toast.error("Please upload an image.");
            return;
        }

        try {
            const formData = new FormData();
            formData.append("name", data.name);
            formData.append("description", data.description);
            formData.append("price", Number(data.price));
            formData.append("category", data.category);
            formData.append("image", image);

            console.log("Submitting Data:", Object.fromEntries(formData.entries())); // ✅ Debugging

            const response = await axios.post(`${url}/api/food/add`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            console.log("Response:", response.data); // ✅ Debugging API Response

            if (response.data && response.data.success) {
                // ✅ Reset form after successful submission
                setData({ name: "", description: "", price: "", category: "Salad" });
                setImage(null);

                // ✅ Show "Food Added Successfully" notification
                toast.success("🎉 Food added successfully!");

                // ✅ Log to confirm
                console.log("✅ Food added successfully!");
            } else {
                toast.error("❌ Failed to upload food. Please try again!");
            }
        } catch (error) {
            console.error("Upload Error:", error);
            toast.error(error.response?.data?.message || "❌ Something went wrong. Please try again!");
        }
    };

    return (
        <div className="add">
            <form className="flex flex-col" onSubmit={onSubmitHandler}>
                {/* Image Upload */}
                <div className="add-image-upload flex-col">
                    <p>Upload Image</p>
                    <label htmlFor="image">
                        <img src={image ? URL.createObjectURL(image) : assets.upload_icon} alt="Upload Preview" />
                    </label>
                    <input onChange={onImageChange} type="file" id="image" hidden required />
                </div>

                {/* Product Name */}
                <div className="add-product-name flex-col">
                    <p>Product Name</p>
                    <input onChange={onChangeHandler} value={data.name} type="text" name="name" placeholder="Type here" required />
                </div>

                {/* Product Description */}
                <div className="add-product-description flex-col">
                    <p>Product Description</p>
                    <textarea onChange={onChangeHandler} value={data.description} name="description" rows="6" placeholder="Write content here" required></textarea>
                </div>

                {/* Category & Price */}
                <div className="add-category-price">
                    <div className="add-category flex-col">
                        <p>Product Category</p>
                        <select onChange={onChangeHandler} name="category" value={data.category}>
                            <option value="Salad">Salad</option>
                            <option value="Rolls">Rolls</option>
                            <option value="Desserts">Desserts</option>
                            <option value="Sandwich">Sandwich</option>
                            <option value="Cake">Cake</option>
                            <option value="Pure Veg">Pure Veg</option>
                            <option value="Pasta">Pasta</option>
                            <option value="Noodles">Noodles</option>
                        </select>
                    </div>

                    <div className="add-price flex-col">
                        <p>Product Price</p>
                        <input onChange={onChangeHandler} value={data.price} type="number" name="price" placeholder="$20" required />
                    </div>
                </div>

                {/* Submit Button */}
                <button type="submit" className="add-btn">ADD</button>
            </form>
        </div>
    );
};

export default Add;
