import React, { useState, useEffect } from 'react';

const Coustomer = () => {
    const [wasteType, setWasteType] = useState('');
    const [image, setImage] = useState(null);
    const [uploads, setUploads] = useState([]);

    // Fetch previous uploads from the backend
    useEffect(() => {
        const fetchUploads = async () => {
            try {
                // Fetch data from MongoDB backend (replace with your API endpoint)
                const response = await fetch('/api/uploads');
                const data = await response.json();
                setUploads(data);
            } catch (error) {
                console.error("Error fetching uploads:", error);
            }
        };

        fetchUploads();
    }, []);

    // Handle form submission to upload image and waste type
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const formData = new FormData();
        formData.append('wasteType', wasteType);
        formData.append('image', image);

        try {
            // Post data to MongoDB backend (replace with your API endpoint)
            const response = await fetch('/api/uploads/upload', {
                method: 'POST',
                body: formData,
            });
            const data = await response.json();

            // Update uploads list with new upload
            setUploads((prevUploads) => [...prevUploads, data]);
            setWasteType('');
            setImage(null);
        } catch (error) {
            console.error("Error uploading file:", error);
        }
    };

    return (
        <div className="container mx-auto p-6">
            <h2 className="text-2xl font-bold mb-4">Your Waste Uploads</h2>
            
            {/* Display previous uploads */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {uploads.map((upload) => (
                    <div key={upload._id} className="border p-4 rounded-lg shadow">
                        <img src={`uploads/${upload.image}`} alt="Uploaded" className="w-full h-40 object-cover mb-3 rounded"/>
                        <p className="text-gray-700">Waste Type: {upload.wasteType}</p>
                        <p className="text-gray-500 text-sm">Uploaded on: {new Date(upload.createdAt).toLocaleDateString()}</p>
                    </div>
                ))}
            </div>

            {/* Form to upload new image and select waste type */}
            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded p-6">
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Select Waste Type:</label>
                    <select 
                        value={wasteType} 
                        onChange={(e) => setWasteType(e.target.value)} 
                        className="block w-full p-2 border border-gray-300 rounded"
                        required
                    >
                        <option value="" disabled>Select type</option>
                        <option value="eWaste">eWaste</option>
                        <option value="Domestic">Domestic</option>
                        <option value="Metal">Metal</option>
                        <option value="Plastic">Plastic</option>
                        <option value="Paper">Paper</option>
                    </select>
                </div>
                
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Upload Image:</label>
                    <input 
                        type="file" 
                        onChange={(e) => setImage(e.target.files[0])} 
                        className="block w-full p-2 border border-gray-300 rounded"
                        required
                    />
                </div>

                <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
                    Upload Next Item
                </button>
            </form>
        </div>
    );
};

export default Coustomer;
