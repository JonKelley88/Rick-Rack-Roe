import express from 'express';
import exphbs from 'express-handlebars';

const PORT = 1111;
const app = express();

app.use('/public', express.static('dist'));
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.get('/', (req, res) => res.render('home'));

app.listen(PORT, () => console.log(`listening on port ${PORT}`));