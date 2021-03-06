//https://arjunphp.com/restful-api-using-async-await-node-express-sequelize/
import jsonwebtoken from 'jsonwebtoken';
import Config from '../config';
//var models  = require('../models');
var express = require('express');
var router  = express.Router();
var models  = require('../models');

const { secretKey, expiredAfter } = Config;


//middleware to hanlde errors
const awaitErorrHandlerFactory = middleware => {
  return async (req, res, next) => {
    try {
      await middleware(req, res, next);
    } catch (err) {
      next(err);
    }
  };
};


router.post('/login', awaitErorrHandlerFactory(async (req, res, next) => {
	const { username, password } = req.body;
	const response = {};
	// You can use DB checking here
	const user = await models.User.findOne({ where: {userName: username, password:password} });
	console.log(user)
	if (user !== null && user !== '') {
		response.token = jsonwebtoken.sign(
			{
				expiredAt: new Date().getTime() + expiredAfter,
				username,
				id: 1,
			},
			secretKey
		);
	} else {
		response.error = 'Not found';
	}
	res.json(response);
}));

router.post('/signup', awaitErorrHandlerFactory(async (req, res, next) => {
	const { username, password, email, firstname,lastname } = req.body;

	const response = {};
	// You can use DB checking here
	//doesUserEverExists

	if(false) {
		response.error = 'Not found';
	} else {

    const userinput = await models.User.create({ userName: username, password: password, email:email, firstName:firstname, lastName:lastname });
    console.log("userinput",userinput)
    response.token = jsonwebtoken.sign(
			{
				expiredAt: new Date().getTime() + expiredAfter,
				username: userinput.dataValues.id,
				id: 1,
			},
			secretKey
		);

	 }
 		res.json(response);
	})
);


router.post('/insertClaim', awaitErorrHandlerFactory(async (req, res, next) => {
  console.log(req.body)
	const { plan_name, member_policy_name, mode_of_treatment, date_of_hospitalisation_visit,
  cause_of_hospitalisation_visit, hospital_name_address, location, doctor_name,
  billing_currency, reimbursement_currency, email, phone, home_address, bank_account_number,
  account_holder_name, bank_name, bank_address, swift_address, iban_code } = req.body;

	const response = {};
	// You can use DB checking here
	//doesUserEverExists

	if(false) {
		response.error = 'Not found';
	} else {


    const input = await models.ClaimBasic.create({ plan_name, member_policy_name, mode_of_treatment, date_of_hospitalisation_visit,
    cause_of_hospitalisation_visit, hospital_name_address, location, doctor_name,
    billing_currency, reimbursement_currency, email, phone, home_address, bank_account_number,
    account_holder_name, bank_name, bank_address, swift_address, iban_code});
    console.log(input.dataValues)
		response.claimID = input.dataValues.id;

	 }
 		res.json(response);
	})
);




router.get('/allClaim', awaitErorrHandlerFactory(async (req, res, next) => {

	const response = {};
	// You can use DB checking here
	//doesUserEverExists

	if(false) {
		response.error = 'Not found';
	} else {


    const claims = await models.ClaimBasic.findAll({attributes: ['id', 'plan_name']});
    console.log('claims',claims)
		response.claimID = claims
	 }

 	 res.json(response);
	})
);


router.get('/claimByID', awaitErorrHandlerFactory(async (req, res, next) => {
  console.log(req.body)
  console.log(req.match)
 	 res.json('response');
	})
);
module.exports = router;
