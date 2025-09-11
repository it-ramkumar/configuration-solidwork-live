import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setAddedModels } from '../../redux/slices/addedModels.js'
import Swal from "sweetalert2";
import { handleGetQuote } from '../../customeHooks/handleQuote.js';
import { useNavigate } from 'react-router-dom';

export default function SummaryModal({
  SummaryModal,
  setSummaryModal,
  sceneRef,                // 👈 use groupRef directly
  setUploadProgress,
  setIsUploading,
  setUploadSuccess,
  setModelUrl,
}) {
  const dispatch = useDispatch();
  const router = useNavigate()
  const addedModels = useSelector((state) => state.addedModels.addedModels);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleClose = () => {
    setSummaryModal(false);
  };
  const handleRemoveItem = (itemId) => {
    const updatedModels = addedModels.filter((item) => item.label !== itemId);
    dispatch(setAddedModels(updatedModels));
  };
  const handleConfirmOrder = () => {
    setSummaryModal(false);
    handleGetQuote(sceneRef,
      setUploadProgress,
      setIsUploading,
      setUploadSuccess,
      setModelUrl, addedModels,
      router)
  };



  // const totalAmount = addedModels?.reduce((sum, item) => sum + item.price, 0);
  // const itemCount = addedModels?.length;
  return (
    <>
      {SummaryModal && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center backdrop-blur-md bg-black/70 transition-all duration-300">
          <div className="bg-white shadow-2xl rounded-xl w-[95%] max-w-5xl h-[85vh] flex flex-col overflow-hidden border border-gray-300 relative animate-fade-in">

            {/* Header */}
            <div className="flex justify-between items-center px-6 py-4 border-b bg-white shadow-sm">
              <h2 className="text-xl font-bold text-gray-800 tracking-wide">🛒 Your Selected Items</h2>
              <button onClick={handleClose} className="text-gray-500 hover:text-red-600 text-2xl font-bold transition">
                &times;
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4 bg-gradient-to-br from-white to-gray-100">
              {addedModels.length === 0 ? (
                <p className="text-center text-sm text-gray-500 italic mt-10">No items selected.</p>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {addedModels.map((item, i) => (
                    <div
                      key={i}
                      className="bg-white shadow-md border border-gray-200 rounded-lg p-3 flex flex-col justify-between hover:shadow-xl hover:ring-2 hover:ring-blue-400 hover:scale-[1.03] transition-all duration-300"
                      style={{ height: '170px' }}
                    >
                      <div className="flex items-start gap-3">
                        <img
                          src={item.image}
                          alt={item.label}
                          className="w-14 h-14 object-cover rounded-lg border shadow-sm"
                        />
                        <div className="flex-1 overflow-hidden">
                          <p className="font-semibold text-gray-800 text-sm truncate" title={item.label}>
                            {item.label}
                          </p>
                          <p className="text-xs text-gray-500 truncate">{item.group}</p>
                        </div>
                      </div>
                      <div className="mt-2 flex justify-between items-center text-xs">
                        {/* <span className="font-bold text-green-700">${item.price}</span> */}
                        <div className="flex gap-2">
                          <button
                            onClick={() => setSelectedItem(item)}
                            className="text-blue-600 hover:underline hover:font-medium transition"
                          >
                            View Details
                          </button>
                          {/* <button
                            onClick={() => handleRemoveItem(item.label)}
                            className="text-red-600 hover:text-red-700 font-medium"
                          >
                            Remove
                          </button> */}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="px-6 py-4 border-t bg-white flex justify-between items-center shadow-inner">
              {/* <div className="text-gray-700 text-sm">
                <p>Total Items: <span className="font-semibold">{itemCount}</span></p>
                <p>Total Amount: <span className="font-semibold">${totalAmount}</span></p>
              </div> */}
              <div className="">
                <button
                  onClick={handleClose}
                  className="px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300 text-gray-700 text-sm transition font-medium"
                >
                  Back
                </button>

              </div>
              <div>
                <button
                  onClick={() => handleConfirmOrder()}
                  className="px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white text-sm transition font-semibold"
                >
                  Confirm
                </button>
              </div>
            </div>

            {selectedItem && (
              <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in">
                <div className="bg-white p-6 rounded-2xl shadow-2xl w-[95%] max-w-2xl relative border border-gray-200 ring-2 ring-blue-300 transition-all duration-300 scale-[1.01]">

                  {/* Close Button */}
                  <button
                    onClick={() => setSelectedItem(null)}
                    className="absolute top-4 right-4 text-gray-500 hover:text-red-500 text-2xl font-bold transition"
                    title="Close"
                  >
                    &times;
                  </button>

                  {/* Header */}
                  <h2 className="text-2xl font-bold mb-4 text-blue-700 tracking-wide border-b pb-2">
                    📄 Item Details
                  </h2>

                  <div className="flex flex-col md:flex-row gap-6">

                    {/* Image */}
                    <div className="w-full md:w-[45%]">
                      <img
                        src={selectedItem.image}
                        alt={selectedItem.label}
                        className="w-full h-60 object-cover rounded-md shadow-md transition hover:scale-105"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-1 text-gray-800 text-sm space-y-3">
                      <p><strong>🛍️ Label:</strong> {selectedItem.label}</p>
                      <p><strong>🏷️ Group:</strong> {selectedItem.group}</p>


                      <div>
                        <p className="font-semibold mt-2 mb-1">📝 Description:</p>
                        <p className="text-gray-600 text-justify leading-relaxed bg-gray-50 p-3 rounded-md shadow-inner whitespace-pre-line">
                          {selectedItem.description || 'No description provided for this item.'}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="mt-6 text-right">
                    <button
                      onClick={() => setSelectedItem(null)}
                      className="px-5 py-2 rounded-md bg-gray-100 hover:bg-gray-200 text-gray-800 text-sm font-medium transition"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>
      )}
    </>
  )
}
