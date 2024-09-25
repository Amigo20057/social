export const corsOptions = {
	origin: 'http://localhost:5173',
	methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
	allowedHeaders: ['Content-Type', 'Authorization'],
	exposedHeaders: ['Cross-Origin-Resource-Policy'],
}
