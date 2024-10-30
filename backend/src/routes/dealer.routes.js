import express from 'express';
import {Dealer }from '../models/location.models.js'; 
const router = express.Router();



// Route to set operational locations for a dealer
router.post('/set-locations', async (req, res) => {
    const { dealerId, locations } = req.body;
    try {
        await Dealer.findByIdAndUpdate(dealerId, { operationalLocations: locations });
        res.status(200).send({ message: 'Locations updated successfully.' });
    } catch (error) {
        res.status(500).send({ message: 'Error updating locations.', error });
    }
});

export default router;
