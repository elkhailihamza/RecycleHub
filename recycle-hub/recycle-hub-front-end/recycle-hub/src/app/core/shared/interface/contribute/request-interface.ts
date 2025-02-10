import { User } from "../auth/user-interface";

export interface Request {
    id: number;
    recycleMaterial: requestMaterial;
    recyclingPictures?: [];
    estimatedWeight: number;
    addressCollect: string;
    dateCollect: string;
    timeCollect: string;
    extraNotes?: string;
    status: requestStatus;
    user: User;
}

export enum requestMaterial {
    plastic,
    glass,
    paper,
    metal
}

export enum requestStatus {
    pending,
    busy,
    in_progress,
    validated,
    rejected
}