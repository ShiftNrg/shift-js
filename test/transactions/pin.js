if (typeof module !== 'undefined' && module.exports) {
	var common = require('../common');
	var lisk = common.lisk;
}

describe('pin.js', function () {

	var pin = lisk.pin;

	it('should be ok', function () {
		(pin).should.be.ok;
	});

	it('should be object', function () {
		(pin).should.be.type('object');
	});

	it('should have createPin and createUnpin property', function () {
		(pin).should.have.property('createPin') && (pin).should.have.property('createUnpin');
	});

	describe('#createPin', function () {
		
		var trs1, trs2;
		var createPin = pin.createPin;
		var createUnpin = pin.createUnpin;
		var publicKey = lisk.crypto.getKeys('secret').publicKey;
		var parentTrs = 7554740114467168525;

		it('should be ok', function () {
			(createPin).should.be.ok && (createUnpin).should.be.ok;
		});

		it('should be function', function () {
			(createPin).should.be.type('function') && (createUnpin).should.be.type('function');
		});

		it('should create pin', function () {
			trs1 = createPin('QmQaJR8tiTQ7gRg4B9giebytLQcgVVMKb13fbe8qg5dMBQ', 3462, parentTrs, 'secret', 'second secret');
			trs2 = createUnpin('QmQaJR8tiTQ7gRg4B9giebytLQcgVVMKb13fbe8qg5dMBQ', 3462, null, 'secret', 'second secret');
		});

		describe('returned pin', function () {

			it('should be ok', function () {
				(trs1).should.be.ok && (trs2).should.be.ok;
			});

			it('should be object', function () {
				(trs1).should.be.type('object') && (trs2).should.be.type('object');
			});

			it('should have id as string', function () {
				(trs1.id).should.be.type('string') && (trs2.id).should.be.type('string');
			});

			it('should have recipientId equal null', function () {
				(trs1).should.have.property('recipientId').and.type('object').and.be.empty && 
				(trs2).should.have.property('recipientId').and.type('object').and.be.empty;
			});

			it('should have amount number equal to 0', function () {
				(trs1).should.have.property('amount').and.be.type('number').and.equal(0) &&
				(trs2).should.have.property('amount').and.be.type('number').and.equal(0);
			});

			it('should have type number equal to 10, 11', function () {
				(trs1).should.have.property('type').and.be.type('number').and.equal(10) && 
				(trs2).should.have.property('type').and.be.type('number').and.equal(11);
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
				trs1.amount = 1;
				var result1 = lisk.crypto.verify(trs1);
				trs2.amount = 1;
				var result2 = lisk.crypto.verify(trs2);
				(result1).should.be.not.ok && (result2).should.be.not.ok;
			});

			it('should not be second signed correctly now', function () {
				trs1.amount = 1;
				var result1 = lisk.crypto.verifySecondSignature(trs1, lisk.crypto.getKeys('second secret').publicKey);
				trs2.amount = 1;
				var result2 = lisk.crypto.verifySecondSignature(trs2, lisk.crypto.getKeys('second secret').publicKey);
				(result1).should.be.not.ok && (result2).should.be.not.ok;
			});

			it('should have asset', function () {
				(trs1).should.have.property('asset').and.not.empty &&
				(trs2).should.have.property('asset').and.not.empty;
			});

			describe('pin asset', function () {

				it('should be ok', function () {
					(trs1.asset).should.have.property('pin').and.be.ok &&
					(trs2.asset).should.have.property('pin').and.be.ok;
				});

				it('should be object', function () {
					(trs1.asset.pin).should.be.type('object') &&
					(trs2.asset.pin).should.be.type('object');
				});

				it('should be not empty', function () {
					(trs1.asset.pin).should.be.not.empty &&
					(trs2.asset.pin).should.be.not.empty;
				});

				it('should be have property hash', function () {
					(trs1.asset.pin).should.have.property('hash').and.be.type('string').and.equal('QmQaJR8tiTQ7gRg4B9giebytLQcgVVMKb13fbe8qg5dMBQ') &&
					(trs2.asset.pin).should.have.property('hash').and.be.type('string').and.equal('QmQaJR8tiTQ7gRg4B9giebytLQcgVVMKb13fbe8qg5dMBQ');
				});

				it('should be have property bytes', function () {
					(trs1.asset.pin).should.have.property('bytes').and.be.type('number').and.equal(3462) &&
					(trs2.asset.pin).should.have.property('bytes').and.be.type('number').and.equal(3462);
				});

				it('should be have property parent', function () {
					(trs1.asset.pin).should.have.property('parent').and.be.type('number').and.equal(7554740114467168000);
				});	
			});
		});
	});
});
