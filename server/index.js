import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import 'dotenv/config';
import authRoutes from './routes/auth.js';
import noteRoutes from './routes/note.js';

const app = express();
app.use(function (req, res, next) {
	res.header('Access-Control-Allow-Credentials', true);
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', '*');
	res.header(
		'Access-Control-Allow-Headers',
		'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept'
	);
	next();
});

app.use(express.json());
app.use(cookieParser());

mongoose
	.connect(process.env.MONGODB)
	.then(() => console.log('Connected to MongoDB'));

app.use('/api/auth', authRoutes);
app.use('/api/note', noteRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log('Server is running on port ' + PORT));
