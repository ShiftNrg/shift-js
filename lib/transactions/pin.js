/*
 * Copyright © 2018 Shift Project
 *
 * See the LICENSE file at the top-level directory of this distribution
 * for licensing information.
 *
 * Unless otherwise agreed in a custom licensing agreement with the Shift Project,
 * no part of this software, including this file, may be copied, modified,
 * propagated, or distributed except according to the terms contained in the
 * LICENSE file.
 *
 * Removal or modification of this copyright notice is prohibited.
 *
 */

/**
 * Pin module provides functions for creating pin transactions.
 * @class vote
 */

var crypto      = require('./crypto.js');
var constants   = require('../constants.js');
var slots       = require('../time/slots.js');

/**
 * @method createPin
 * @param hash
 * @param bytes
 * @param secret
 * @param secondSecret
 *
 * @return {Object}
 */

function createPin (hash, bytes, parent, secret, secondSecret) {
	var keys = crypto.getKeys(secret);

	var transaction = {
		type: constants.types.pin, // 10
		amount: 0,
		fee: constants.fees.pin,
		recipientId: null,
		senderPublicKey: keys.publicKey,
		timestamp: slots.getTime(),
		asset: {
			pin: {
				hash: hash,
				bytes: bytes
			}
		}
	};

	if (parent) {
		transaction.asset.pin.parent = parent;
	}

	crypto.sign(transaction, keys);

	if (secondSecret) {
		var secondKeys = crypto.getKeys(secondSecret);
		crypto.secondSign(transaction, secondKeys);
	}

	transaction.id = crypto.getId(transaction);

	return transaction;
}

/**
 * @method createUnpin
 * @param hash
 * @param bytes
 * @param secret
 * @param secondSecret
 *
 * @return {Object}
 */

function createUnpin (hash, bytes, parent, secret, secondSecret) {
	var keys = crypto.getKeys(secret);

	var transaction = {
		type: constants.types.unpin, // 11
		amount: 0,
		fee: constants.fees.unpin,
		recipientId: null,
		senderPublicKey: keys.publicKey,
		timestamp: slots.getTime(),
		asset: {
			pin: {
				hash: hash,
				bytes: bytes
			}
		}
	};

	if (parent) {
		transaction.asset.pin.parent = parent;
	}	

	crypto.sign(transaction, keys);

	if (secondSecret) {
		var secondKeys = crypto.getKeys(secondSecret);
		crypto.secondSign(transaction, secondKeys);
	}

	transaction.id = crypto.getId(transaction);

	return transaction;
}

module.exports = {
	createPin: createPin,
	createUnpin: createUnpin
};
