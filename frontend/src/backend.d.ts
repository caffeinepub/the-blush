import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export class ExternalBlob {
    getBytes(): Promise<Uint8Array<ArrayBuffer>>;
    getDirectURL(): string;
    static fromURL(url: string): ExternalBlob;
    static fromBytes(blob: Uint8Array<ArrayBuffer>): ExternalBlob;
    withUploadProgress(onProgress: (percentage: number) => void): ExternalBlob;
}
export interface CustomerPhoto {
    id: bigint;
    customerName: string;
    review: string;
    timestamp: Time;
    photo: ExternalBlob;
}
export type Time = bigint;
export interface Staff {
    id: bigint;
    bio: string;
    name: string;
    role: string;
}
export interface Service {
    id: bigint;
    duration: bigint;
    name: string;
    description: string;
    category: string;
    price: number;
}
export interface Appointment {
    id: bigint;
    status: Status;
    staffId: bigint;
    clientName: string;
    serviceId: bigint;
    datetime: Time;
}
export interface UserProfile {
    name: string;
}
export enum Status {
    cancelled = "cancelled",
    pending = "pending",
    confirmed = "confirmed"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addCustomerPhoto(customerName: string, photo: ExternalBlob, review: string): Promise<void>;
    addService(name: string, description: string, duration: bigint, price: number, category: string): Promise<void>;
    addStaffMember(name: string, role: string, bio: string): Promise<void>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    bookAppointment(clientName: string, serviceId: bigint, staffId: bigint, datetime: Time): Promise<bigint>;
    deleteCustomerPhoto(id: bigint): Promise<void>;
    editCustomerPhotoReview(id: bigint, newReview: string): Promise<void>;
    getAppointment(id: bigint): Promise<Appointment>;
    getAppointments(): Promise<Array<Appointment>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getCustomerPhotoReviews(): Promise<Array<string>>;
    getCustomerPhotos(): Promise<Array<CustomerPhoto>>;
    getPendingAppointments(): Promise<Array<Appointment>>;
    getServices(): Promise<Array<Service>>;
    getServicesByCategory(category: string): Promise<Array<Service>>;
    getStaffMembers(): Promise<Array<Staff>>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    updateAppointmentStatus(id: bigint, status: Status): Promise<void>;
}
