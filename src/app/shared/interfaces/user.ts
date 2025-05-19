export interface User {
    id: number;
    name: string;
    username: string;
    email: string;
    address: {
        street: string;
        city: string;
        suite: string;
        zipcode: string;
    };
    phone: string;
    website: string;
    company: {
        name: string;
    };
}