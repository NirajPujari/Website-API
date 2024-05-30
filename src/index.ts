import app from './app';
import Database from './db';

const port = process.env.PORT || 5000;

// (async () => {
//   try {
//     const database = Database.getInstance();
//     await database.connect(); // Connect to the database
//     console.log('Database connected successfully. Starting server...');

//     app.listen(port, () => {
//       console.log(`Server is running on http://localhost:${port}`);
//     });
//   } catch (error) {
//     console.error('Failed to connect to the database. Server not started.', error);
//     process.exit(1); // Exit the process with failure code
//   }
// })();

export default app;