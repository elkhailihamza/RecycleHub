export interface request {
    id: number;
    recycleMaterial: requestMaterial;
    recyclingPictures?: [];
    estimatedWeight: number;
    addressCollect: string;
    dateCollect: string;
    timeCollect: string;
    extraNotes?: string;
    status: requestStatus;
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