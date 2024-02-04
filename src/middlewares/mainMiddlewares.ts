import cors from 'cors';

export const configCors = cors(
    {
        origin: "https://festival-du-jeu-1u44.onrender.com", // allow all origins
        
    }
);