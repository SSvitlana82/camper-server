import { model, Schema } from 'mongoose';
const camperSchema = new Schema({});

export const campersCollection = model('campers', camperSchema);
