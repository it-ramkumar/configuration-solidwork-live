import { useState } from "react";
import { interiorTypes, exteriorTypes, systemTypes } from "../json data/modelTypes";

export default function ModelDataForm() {
    const [typeCategory, setTypeCategory] = useState("");
    const ModelType = ["interior", "exterior", "system"];
    const type = typeCategory === "interior" ? interiorTypes :
        typeCategory === "exterior" ? exteriorTypes : typeCategory === "system" ? systemTypes : [];
    const [formData, setFormData] = useState({
        label: "",
        price: "",
        image: "",
        component: {
            id: "",
            modelUrl: ""
        },
        componentKey: "",
        type: "",
        group: "",
        description: "",
        hasSink: false,
    });


    const validateForm = (formData) => {
  if (!formData.label.trim()) {
    alert("Label is required");
    return false;
  }

  if (!formData.price) {
    alert("Price is required");
    return false;
  }

  if (!formData.image.trim()) {
    alert("Image URL is required");
    return false;
  }

  if (!formData.componentKey.trim()) {
    alert("Component key is required");
    return false;
  }

  if (!formData.type.trim()) {
    alert("Type is required");
    return false;
  }

  if (!formData.group.trim()) {
    alert("Group is required");
    return false;
  }

  if (!formData.description.trim()) {
    alert("Description is required");
    return false;
  }

//   if (!formData.component.id.trim()) {
//     alert("Component ID is required");
//     return false;
//   }

//   if (!formData.component.modelUrl.trim()) {
//     alert("Model URL is required");
//     return false;
//   }

  return true;
};

    // Handle normal inputs
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    // Handle nested component inputs
    const handleComponentChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            component: {
                ...formData.component,
                [name]: value
            }
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
         if (validateForm(formData)) {
    // Form is valid, proceed with submission
    console.log("Form is valid", formData);
    // Add your submission logic here
  }

        try {
            const res = await fetch("http://localhost:5000/api/modelsData", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });

            const data = await res.json();
            console.log("Response:", data);
            alert("Data sent successfully!");
        } catch (error) {
            console.error(error);
            alert("Error sending data");
        }
    };

    const inputStyle =
        "border rounded-lg p-3 w-full focus:ring-2 focus:ring-blue-500 outline-none";

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <form
                onSubmit={handleSubmit}
                className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-lg space-y-5"
            >
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                    Add Component
                </h2>

                {/* Label */}
                <select
                    name="type"
                    onChange={(e) => setTypeCategory(e.target.value)}
                    className={inputStyle}
                >
                    <option value="">Select Type</option>
                    {ModelType.map((t, index) => (
                        <option key={index} value={t}>
                            {t}
                        </option>
                    ))}
                </select>
                <input
                    name="label"
                    placeholder="Label"
                    value={formData.label}
                    onChange={handleChange}
                    className={inputStyle}
                    required
                />

                {/* Price */}
                <input
                    name="price"
                    placeholder="Price"
                    type="number"
                    value={formData.price}
                    onChange={handleChange}
                    className={inputStyle}
                    required
                />

                {/* Image */}
                <input
                    name="image"
                    placeholder="Image URL"
                    value={formData.image}
                    onChange={handleChange}
                    className={inputStyle}
                />

                {/* Component ID */}
                <input
                    name="id"
                    placeholder="Component ID"
                    value={formData.component.id}
                    onChange={handleComponentChange}
                    className={inputStyle}
                />

                {/* Model URL */}
                <input
                    name="modelUrl"
                    placeholder="Model URL"
                    value={formData.component.modelUrl}
                    onChange={handleComponentChange}
                    className={inputStyle}
                />

                {/* Component Key */}
                <input
                    name="componentKey"
                    placeholder="Component Key"
                    value={formData.componentKey}
                    onChange={handleChange}
                    className={inputStyle}
                />

                <select
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    className={inputStyle}
                >
                    <option value="">Select Type</option>
                    {type.map((t, index) => (
                        <option key={index} value={t}>
                            {t}
                        </option>
                    ))}
                </select>

                {/* Group */}
                <input
                    name="group"
                    placeholder="Group"
                    value={formData.group}
                    onChange={handleChange}
                    className={inputStyle}
                />
                {/* Has Sink Selector */}
                {formData.type === "counter-top" && <select
                    name="hasSink"
                    value={formData.hasSink}
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            hasSink: e.target.value === "true"
                        })
                    }
                    className={inputStyle}
                >
                    <option value="false">No</option>
                    <option value="true">Yes</option>
                </select>}

                {/* Description */}
                <textarea
                    name="description"
                    placeholder="Description"
                    value={formData.description}
                    onChange={handleChange}
                    className={`${inputStyle} h-24`}
                />


                {/* Submit Button */}
                <button
                    type="submit"
                    className="bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-blue-700 transition-all w-full"
                >
                    Submit
                </button>
            </form>
        </div>
    );
}
