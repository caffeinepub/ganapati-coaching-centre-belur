import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Student {
    id: bigint;
    pin: bigint;
    fees: Array<boolean>;
    name: string;
}
export interface backendInterface {
    createStudent(name: string, pin: bigint): Promise<bigint>;
    getAllFees(): Promise<Array<[bigint, Array<boolean>]>>;
    getStudent(id: bigint): Promise<Student | null>;
    getStudents(): Promise<Array<Student>>;
    loginStudent(id: bigint, pin: bigint): Promise<boolean>;
    markFeePaid(id: bigint, month: bigint, paid: boolean): Promise<void>;
}
