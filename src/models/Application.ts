import ApplicationFile from "./ApplicationFile";

export default interface Application {
    id: number;
    date: string;
    reason: string;
    power: number;
    comment: string;
    customerId: number;
    customerName?: string;
    file?: ApplicationFile | null;
}