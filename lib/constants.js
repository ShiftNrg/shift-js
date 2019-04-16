/**
 * `constants` are the objects containing information about the fee size for different tranasctions.
 *
 * @property constants
 * @static
 * @type object
 */

module.exports = {
	types: {
		send: 0,
		secondsignature: 1,
		delegate: 2,
		vote: 3,
		multisignature: 4,
		dapp: 5,
		inTransfer: 6,
		outTransfer: 7,
		lock: 8,
		unlock: 9,
		pin: 10,
		unpin: 11
	},
	fees: {
		send: 1000000,		// 0.01
		secondsignature: 10000000,	// 0.1
		delegate: 6000000000,	// 60
		vote: 100000000,	// 1
		multisignature: 50000000, // 0.5
		dapp: 2500000000,	// 25
		lock: 100000000,		// 1
		unlock: 100000000,		// 1
		pin: 1000000,		// 0.01
		unpin: 0		// 0
	},
	fee: {
		0: 1000000,
		1: 10000000,
		2: 6000000000,
		3: 100000000,
		4: 50000000,
		5: 2500000000,
		6: 1000000,
		7: 1000000,
		8: 100000000,
		9: 100000000,
		10: 1000000,
		11: 0
	}
};
