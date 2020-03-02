const express = require('express');
const router = express();
const db = require('../seeds/config');

router.get('/', async (req, res, next) => {
	try {
		const cars = await db.select('*').from('cars');
		res.json(cars);
	} catch (err) {
		next(err);
	}
});

router.post('/', validateCarInfo, async (req, res, next) => {
	try {
		const payload = {
			vin: req.body.vin,
			make: req.body.make,
			model: req.body.model,
			milage: req.body.milage,
			title_status: req.body.title_status
		};
		const [ id ] = await db.insert(payload).into('cars');
		const newCar = await db('cars').where('id', id).first();
		res.json(newCar);
	} catch (err) {
		next(err);
	}
});

router.put('/:id', validateId, async (req, res, next) => {
	try {
		const payload = {
			vin: req.body.vin,
			make: req.body.make,
			model: req.body.model,
			milage: req.body.milage,
			title_status: req.body.title_status
		};
		const update = await db('cars').where({ id: req.params.id }).update(payload);
		if (update > 0) {
			res.json({ message: 'Successfully updated.' });
		}
	} catch (err) {
		next(err);
	}
});

router.delete('/:id', validateId, async (req, res, next) => {
	try {
		await db('cars').where('id', req.params.id).del();
		res.json({ message: 'Successfully Deleted.' });
	} catch (err) {
		next(err);
	}
});

async function validateId(req, res, next) {
	const id = await db('cars').where({ id: req.params.id });
	console.log(id);
	if (!id[0]) {
		res.json({ message: 'this car with this specific id is not found.' });
	}
	else {
		next();
	}
}

function validateCarInfo(req, res, next) {
	const payload = {
		vin: req.body.vin,
		make: req.body.make
	};
	if (!payload.vin || !payload.make) {
		res.status(400).json({ message: "can't add car without the Vin & Make." });
	}
	else {
		next();
	}
}

module.exports = router;
