import cors from 'cors';

export const configCors = cors(
    {
        origin: "*", // allow all origins
        credentials: true, // allow cookies
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    }
);