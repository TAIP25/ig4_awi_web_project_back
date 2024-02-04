import cors from 'cors';

export const configCors = cors(
    {
        origin: true,
        credentials: true,
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    }
);