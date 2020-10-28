import mongoose from 'mongoose';
import { TodoSchema } from './Todo';
export const AccountSchema = new mongoose.Schema({
    compoundId: String,
    userId: mongoose.Types.ObjectId,
    providerType: String,
    providerId: String,
    accessToken: String,
    createdAt: Date,
    updatedAt: Date,
    todos: [TodoSchema],
});

export const Account =
    mongoose.models?.Account || mongoose.model('Account', AccountSchema);
