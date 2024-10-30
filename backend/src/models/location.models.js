import mongoose, { Schema } from "mongoose";

const dealerSchema = new mongoose.Schema({
    // Other fields...
    name: { type: String, required: true }, // Example field for dealer's name
    email: { type: String, required: true, unique: true }, // Example field for email
    operationalLocations: [{
        type: {
            type: String, // 'Point' for this example
            enum: ['Point'], // Specify 'Point' as the type
            required: true
        },
        coordinates: {
            type: [Number], // Array of numbers, [longitude, latitude]
            required: true
        }
    }],
    status: {
        type: String,
        enum: ['online', 'offline'],
        default: 'offline'
    },
    // Add other relevant fields...
}, { timestamps: true });

// Create a geospatial index on the operationalLocations field
dealerSchema.index({ operationalLocations: '2dsphere' });

export const Dealer = mongoose.model('Dealer', dealerSchema);


