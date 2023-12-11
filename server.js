
// Import and require mysql2
const apiRoutes = require('./api');

router.use('/api', apiRoutes);


const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());




app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
module.exports = express;

