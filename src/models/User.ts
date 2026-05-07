import { Model } from "objection";

export class User extends Model {
    id!: number;
    name!: string
    email!: string;
    password!: string;
    created_at?: string

    static tableName = 'users';
}