//structure: https://help.insight.com/app/answers/detail/a_id/140/~/creating-a-node.js-rest-api-in-azure

//https://blogs.technet.microsoft.com/sltechgeeks/2018/05/28/create-and-host-your-node-js-api-in-azure/

//https://scotch.io/tutorials/keeping-api-routing-clean-using-express-routers

//https://sequelize.readthedocs.io/en/1.7.0/articles/express/#implementing-a-todo-app

import express from 'express';
import bodyParser from 'body-parser';
import jsonwebtoken from 'jsonwebtoken';
import cors from 'cors';
import Config from './config';
import { authenticate, authError } from './middleware';
import sql from 'mssql';
import Sequelize from 'sequelize';
import routes from './routes/index';
import apis from './routes/apis';

const { port } = Config;
const app = express();



app
	.use(bodyParser.urlencoded({ extended: true }))
	.use(bodyParser.json())
	.use(cors());


// error handler
// no stacktraces leaked to user unless in development environment
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: (app.get('env') === 'development') ? err : {}
  });
});



app.use('/', routes);

app.use('/api', apis);


app.use('/api/secret', [authenticate, authError]);
app.post('/api/secret/test', (req, res) => {
	res.json({
		status: 200,
		message: 'succcesful',
	});
});

app.listen(port, () => {
	console.log('Isomorphic JWT login ' + port);
});
