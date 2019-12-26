"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
exports.OrderSchema = new mongoose_1.Schema({
    userId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User' },
    quantity: Number,
    shipDate: Date,
    status: { type: String, enum: ['PLACED', 'APPROVED', 'DELIVERED'] },
    complete: Boolean,
});
exports.OrderModel = mongoose_1.model('Order', exports.OrderSchema);
