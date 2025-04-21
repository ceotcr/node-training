export const users: User[] = [
    { id: 1, name: 'John Doe', email: 'john.doe@example.com', password: 'john123' },
    { id: 2, name: 'Jane Doe', email: 'jane.doe@example.com', password: 'jane123' },
    { id: 3, name: 'Jim Doe', email: 'jim.doe@example.com', password: 'jim123' },
]

export type User = {
    id: number;
    name: string;
    email: string;
    password: string;
}