import cors from 'cors';

export const configCors = cors(
    {
        origin: true,
        credentials: true
    }
);