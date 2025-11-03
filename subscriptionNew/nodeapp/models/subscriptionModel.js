const mongoose = require('mongoose');

const subscriptionSchema = mongoose.Schema({
    subscriptionName : {
        type : String,
        required : true
    },
    cost : {
        type : Number,
        required : true
    },
    category : {
        type : String,
        required : true,
        enum : ["Entertainment & Media", "Software & Productivity", "Utilities & Services", "Health & Fitness", "Learning & Education", "Other / Miscellaneous"]
    },
    frequency : {
        type : String,
        required : true,
        enum : ["Weekly", "Monthly", "Yearly"]
    },
    paymentDate : {
        type : Date,
        required : true
    },
    notes : {
        type : String
    }
}, {
    timestamps : true
});

module.exports = mongoose.model('Subscription', subscriptionSchema);