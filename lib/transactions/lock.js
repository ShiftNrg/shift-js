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
 * Vote module provides functions for creating vote transactions.
 * @class vote
 */

var crypto      = require('./crypto.js');
var constants   = require('../constants.js');
var slots       = require('../time/slots.js');

/**
 * @method createLock
 * @param amount
 * @param bytes
 * @param secret
 * @param secondSecret
 *
 * @return {Object}
 */

function createLock (amount, bytes, secret, secondSecret) {
	var keys = crypto.getKeys(secret);

	var transaction = {
		type: constants.types.lock, // 8
		amount: amount,
		fee: constants.fees.lock,
		recipientId: null,
		senderPublicKey: keys.publicKey,
		timestamp: slots.getTime(),
		asset: {
			lock: {
				bytes: bytes
			}
		}
	};

	crypto.sign(transaction, keys);

	if (secondSecret) {
		var secondKeys = crypto.getKeys(secondSecret);
		crypto.secondSign(transaction, secondKeys);
	}

	transaction.id = crypto.getId(transaction);

	return transaction;
}

/**
 * @method createUnlock
 * @param amount
 * @param bytes
 * @param secret
 * @param secondSecret
 *
 * @return {Object}
 */

function createUnlock (amount, bytes, secret, secondSecret) {
	var keys = crypto.getKeys(secret);

	var transaction = {
		type: constants.types.unlock, // 9
		amount: amount,
		fee: constants.fees.unlock,
		recipientId: null,
		senderPublicKey: keys.publicKey,
		timestamp: slots.getTime(),
		asset: {
			unlock: {
				bytes: bytes
			}
		}
	};

	crypto.sign(transaction, keys);

	if (secondSecret) {
		var secondKeys = crypto.getKeys(secondSecret);
		crypto.secondSign(transaction, secondKeys);
	}

	transaction.id = crypto.getId(transaction);

	return transaction;
}

module.exports = {
	createLock: createLock,
	createUnlock: createUnlock
};
