import jwt from 'jsonwebtoken';

export const getPhoneFromToken = (): string | null => {
    const token: string | null = localStorage.getItem('token');
    if (token) {
        try {
            const decodedToken: any = jwt.verify(token, process.env.TOKEN_SECRET!);
            const phone: string = decodedToken.phone;
            return phone;
        } catch (error) {
            console.error('Error decoding token:', error);
            return null;
        }
    } else {
        console.error('Token not found in localStorage');
        return null;
    }
};
