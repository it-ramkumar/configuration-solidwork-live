import React, { useState } from 'react';
import axios from 'axios';

import { interiorModels, exteriorModels, systemModels } from '../../ModelData';

export default function AddData() {
    const [formData, setFormData] = useState({
        label: "",
        price: "",
        image: "",
        componentKey: "",
        type: "",
        group: "",
        description: "",
        hasSink: false,
        extensionKey: [],
        category: ""
    });
const resetForm = () => {
  setFormData({
    label: "",
    price: "",
    image: "",
    componentKey: "",
    type: "",
    group: "",
    description: "",
    hasSink: false,
    extensionKey: [],
    category: ""
  });
  setNewExtension("");
};

    // console.log(interiorModels, "interior")
    const allModel = [
        ...interiorModels,
        ...exteriorModels,
        systemModels
    ]
    const [newExtension, setNewExtension] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const addExtension = () => {
        if (newExtension.trim() !== "") {
            setFormData(prev => ({
                ...prev,
                extensionKey: [...prev.extensionKey, newExtension.trim()]
            }));
            setNewExtension("");
        }
    };

    const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true); // Start loading

  try {
    const payload = [formData]; // Wrap in array as required
    const res = await axios.post('http://localhost:5000/api/insertManyData', payload);
    alert(res.data.message);
    resetForm(); // 🔄 Clear the form here

  } catch (err) {
    console.error('Error submitting form:', err);
    alert("Something went wrong!");
  } finally {
    setLoading(false); // Stop loading after success or error
  }
};

    return (
        <div className="max-w-2xl mx-auto mt-10 p-8 bg-white rounded-lg shadow-sm border border-gray-100">
  <h2 className="text-2xl font-semibold mb-6 text-gray-800 border-b pb-4">Add New Component</h2>

  <form onSubmit={handleSubmit} className="space-y-6">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Label */}
      <div className="space-y-1">
        <label className="text-sm font-medium text-gray-700">Label*</label>
        <input
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          name="label"
          value={formData.label}
          onChange={handleChange}
          placeholder="Enter component label"
          required
        />
      </div>

      {/* Price */}
      <div className="space-y-1">
        <label className="text-sm font-medium text-gray-700">Price*</label>
        <input
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          name="price"
          type="number"
          value={formData.price}
          onChange={handleChange}
          placeholder="0.00"
          required
        />
      </div>

      {/* Image URL */}
      <div className="space-y-1 md:col-span-2">
        <label className="text-sm font-medium text-gray-700">Image URL</label>
        <input
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          name="image"
          value={formData.image}
          onChange={handleChange}
          placeholder="https://example.com/image.jpg"
        />
      </div>

      {/* Component Key */}
      <div className="space-y-1">
        <label className="text-sm font-medium text-gray-700">Component Key</label>
        <input
          list="component-suggestions"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          name="componentKey"
          value={formData.componentKey}
          onChange={handleChange}
          placeholder="Select or enter key"
        />
        <datalist id="component-suggestions">
          {[...new Set(allModel.map(item => item.component?.name))]
            .map((group, index) => (
              <option key={index} value={group} />
            ))}
        </datalist>
      </div>

      {/* Type */}
      <div className="space-y-1">
        <label className="text-sm font-medium text-gray-700">Type</label>
        <input
          list="type"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          name="type"
          value={formData.type}
          onChange={handleChange}
          placeholder="Select or enter type"
        />
        <datalist id="type">
          {[...new Set(allModel.map(item => item.type))].map((group, index) => (
            <option key={index} value={group} />
          ))}
        </datalist>
      </div>

      {/* Group */}
      <div className="space-y-1">
        <label className="text-sm font-medium text-gray-700">Group</label>
        <input
          list="group"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          name="group"
          value={formData.group}
          onChange={handleChange}
          placeholder="Select or enter group"
        />
        <datalist id="group">
          {[...new Set(allModel.map(item => item.group))].map((group, index) => (
            <option key={index} value={group} />
          ))}
        </datalist>
      </div>

      {/* Category */}
      <div className="space-y-1">
        <label className="text-sm font-medium text-gray-700">Category*</label>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          required
        >
          <option value="">Select Category</option>
          <option value="interior">Interior</option>
          <option value="exterior">Exterior</option>
          <option value="system">System</option>
        </select>
      </div>
    </div>

    {/* Description */}
    <div className="space-y-1">
      <label className="text-sm font-medium text-gray-700">Description</label>
      <textarea
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition min-h-[100px]"
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Enter component description"
      />
    </div>

    {/* Has Sink Checkbox */}
    {(formData.type === "counter-top" || formData.type === "countertop") && (
      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="hasSink"
          name="hasSink"
          checked={formData.hasSink}
          onChange={handleChange}
          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
        />
        <label htmlFor="hasSink" className="text-sm font-medium text-gray-700">
          Includes Sink
        </label>
      </div>
    )}

    {/* Extensions Section */}
    {(formData.type === "counter-top" || formData.type === "countertop") && (
      <div className="space-y-3 p-4 bg-gray-50 rounded-md border border-gray-200">
        <h3 className="text-sm font-medium text-gray-700">Extension Keys</h3>
        <div className="flex space-x-2">
          <input
            className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            type="text"
            value={newExtension}
            onChange={(e) => setNewExtension(e.target.value)}
            placeholder="Enter extension key"
          />
          <button
            type="button"
            onClick={addExtension}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
          >
            Add
          </button>
        </div>
        {formData.extensionKey.length > 0 && (
          <div className="text-sm text-gray-600 bg-white p-2 rounded border border-gray-200">
            <span className="font-medium">Current Extensions:</span> {formData.extensionKey.join(", ")}
          </div>
        )}
      </div>
    )}

    {/* Submit Button */}
    <div className="pt-4">
      <button
      disabled={loading}
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-md font-medium text-sm transition-colors shadow-sm"
      >
        {loading ? "saving" : "save component"}
      </button>
    </div>
  </form>
</div>
    );
}
