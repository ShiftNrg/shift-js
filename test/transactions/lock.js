if (typeof module !== 'undefined' && module.exports) {
	var common = require('../common');
	var lisk = common.lisk;
}

describe('lock.js', function () {

	var lock = lisk.lock;

	it('should be ok', function () {
		(lock).should.be.ok;
	});

	it('should be object', function () {
		(lock).should.be.type('object');
	});

	it('should have createLock property', function () {
		(lock).should.have.property('createLock');
	});

	describe('#createLock', function () {
		
		var trs1, trs2;
		var createLock = lock.createLock;
		var createUnlock = lock.createUnlock;
		var publicKey = lisk.crypto.getKeys('secret').publicKey;

		it('should be ok', function () {
			(createLock).should.be.ok && (createUnlock).should.be.ok;
		});

		it('should be function', function () {
			(createLock).should.be.type('function') && (createUnlock).should.be.type('function');
		});

		it('should create lock', function () {
			trs1 = createLock(1000, 5000, 'secret', 'second secret') && trs2 = createUnlock(500, 2500, 'secret', 'second secret');
		});

		describe('returned lock', function () {

			it('should be ok', function () {
				(trs1).should.be.ok && (trs2).should.be.ok;
			});

			it('should be object', function () {
				(trs1).should.be.type('object') && (trs2).should.be.type('object');
			});

			it('should have recipientId equal null', function () {
				(trs1).should.have.property('recipientId').and.type('object').and.be.empty && 
				(trs2).should.have.property('recipientId').and.type('object').and.be.empty;
			});			

			it('should have amount number equal to 1000', function () {
				(trs1).should.have.property('amount').and.be.type('number').and.equal(1000) &&
				(trs2).should.have.property('amount').and.be.type('number').and.equal(500);
			});	

			it('should have type number equal to 8', function () {
				(trs1).should.have.property('type').and.be.type('number').and.equal(8) && 
				(trs2).should.have.property('type').and.be.type('number').and.equal(9);
			});

			it('should have timestamp number', function () {
				(trs1).should.have.property('timestamp').and.be.type('number') &&
				(trs2).should.have.property('timestamp').and.be.type('number');
			});

			it('should have senderPublicKey hex string equal to sender public key', function () {
				[trs1,trs2].forEach(function(trs) {
					(trs).should.have.property('senderPublicKey').and.be.type('string').and.match(function () {
						try {
							new Buffer(trs.senderPublicKey, 'hex');
						} catch (e) {
							return false;
						}

						return true;
					}).and.equal(publicKey);
				});
			});

			it('should have signature hex string', function () {
				[trs1,trs2].forEach(function(trs) {
					(trs).should.have.property('signature').and.be.type('string').and.match(function () {
						try {
							new Buffer(trs.signature, 'hex');
						} catch (e) {
							return false;
						}

						return true;
					});
				});
			});

			it('should have second signature hex string', function () {
				[trs1,trs2].forEach(function(trs) {
					(trs).should.have.property('signSignature').and.be.type('string').and.match(function () {
						try {
							new Buffer(trs.signSignature, 'hex');
						} catch (e) {
							return false;
						}

						return true;
					});
				});
			});

			it('should be signed correctly', function () {
				var result1 = lisk.crypto.verify(trs1);
				var result2 = lisk.crypto.verify(trs2);
				(result1).should.be.ok && (result2).should.be.ok;
			});

			it('should be second signed correctly', function () {
				var result1 = lisk.crypto.verifySecondSignature(trs1, lisk.crypto.getKeys('second secret').publicKey);
				var result2 = lisk.crypto.verifySecondSignature(trs2, lisk.crypto.getKeys('second secret').publicKey);
				(result1).should.be.ok && (result2).should.be.ok;
			});

			it('should not be signed correctly now', function () {
				trs1.amount = 100;
				var result1 = lisk.crypto.verify(trs1);
				trs2.amount = 50;
				var result2 = lisk.crypto.verify(trs2);
				(result1).should.be.not.ok && (result2).should.be.not.ok;
			});

			it('should not be second signed correctly now', function () {
				trs1.amount = 100;
				var result1 = lisk.crypto.verifySecondSignature(trs1, lisk.crypto.getKeys('second secret').publicKey);
				trs2.amount = 50;
				var result2 = lisk.crypto.verifySecondSignature(trs2, lisk.crypto.getKeys('second secret').publicKey);
				(result1).should.be.not.ok && (result2).should.be.not.ok;
			});

			it('should have asset', function () {
				(trs1).should.have.property('asset').and.not.empty &&
				(trs2).should.have.property('asset').and.not.empty;
			});

			describe('lock asset', function () {

				it('should be ok', function () {
					(trs1.asset).should.have.property('lock').and.be.ok &&
					(trs2.asset).should.have.property('unlock').and.be.ok;
				});

				it('should be object', function () {
					(trs1.asset.lock).should.be.type('object') &&
					(trs2.asset.unlock).should.be.type('object');
				});

				it('should be not empty', function () {
					(trs1.asset.lock).should.be.not.empty &&
					(trs2.asset.unlock).should.be.not.empty;
				});

				it('should be have property bytes', function () {
					(trs1.asset.lock).should.have.property('bytes').and.be.type('number').and.equal(5000) &&
					(trs2.asset.unlock).should.have.property('bytes').and.be.type('number').and.equal(2500);
				});
			});
		});
	});
});
