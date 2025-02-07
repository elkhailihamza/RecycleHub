export interface request {
    id: number;
    recycleMaterial: 'plastic' | 'glass' | 'paper' | 'metal';
    recyclingPictures?: [];
    estimatedWeight: number;
    addressCollect: string;
    dateCollect: string;
    timeCollect: string;
    extraNotes?: string;
}