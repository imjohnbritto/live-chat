import { Types } from 'mongoose';

export type ChatInfo = {
    username: string;
    message: string | null;
    timestamp: string;
    phone: string;
    participants: string[];
    isGroup: boolean;
}

export type DBChat = {
    _id: Types.ObjectId;
} & ChatInfo;