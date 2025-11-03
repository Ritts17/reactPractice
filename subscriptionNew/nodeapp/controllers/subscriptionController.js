const Subscriptions = require('../models/subscriptionModel');

async function getAllSubscription (req, res) {
    try{
        const subscriptions = await Subscriptions.find({});
        return res.status(200).json(subscriptions);
    } catch (error) {
        console.log("Error with status 500: ", error.message);
        return res.status(500).json({message : "Internal Server Error"});
    }
}

async function getSubscriptionById (req, res) {
    try{
        const {id} = req.params;
        let subscription = await Subscriptions.findById(id);

        if(subscription) {
            return res.status(200).json({message : "Success", subscription});
        }

        return res.status(404).json({message : "Subscription not found"});
    } catch (error) {
        return res.status(500).json({message : "Internal Server Error"});
    }
}

async function addSubscription (req, res) {
    try {
        const newSubscription = {...req.body};
        const newSub = await Subscriptions.create(newSubscription);
        return res.status(201).json({message : "New Subscription Added Successfully"});
    } catch (error) {
        return res.status(500).json({message : "Internal Server Error"});
    }
}

async function updateSubscription (req, res) {
    try {
        const {id} = req.params;
        const updatedSubscription = {...req.body};
        const subscription = await Subscriptions.findByIdAndUpdate(
            id, 
            updatedSubscription,
            {new : true, runValidators: true}
        );
        
        if(subscription) {
            return res.status(200).json({message : "Subscription updated successfully", subscription});
        }
        
        return res.status(404).json({message : "Subscription not found"});
    } catch (error) {
        return res.status(500).json({message : "Internal Server Error"});
    }
}

async function removeSubscription (req, res) {
    try {
        const {id} = req.params;
        const deletedSubscription = await Subscriptions.findByIdAndDelete(id);
        
        if(deletedSubscription) {
            return res.status(200).json({message : "Subscription Deleted successfully"});
        }
        
        return res.status(404).json({message : "Subscription not found"});
    } catch (error) {
        return res.status(500).json({message : "Internal Server Error"});
    }
}

module.exports = {
    getAllSubscription,
    getSubscriptionById,
    addSubscription,
    updateSubscription,
    removeSubscription
};