var Salsa20Stream = require('./');
var Salsa20 = Salsa20Stream.Salsa20;
var test = require('tape');
// ---------- Test -------------
var key = new Buffer(32);
key[0] = 0x80;
for (i = 1; i < 32; i++) key[i] = 0;
var nonce = new Buffer(8);   for (i = 0; i < 8; i++) nonce[i] = 0;

var good = [
    // 0..63
    "e3be8fdd8beca2e3ea8ef9475b29a6e7" +
    "003951e1097a5c38d23b7a5fad9f6844" +
    "b22c97559e2723c7cbbd3fe4fc8d9a07" +
    "44652a83e72a9c461876af4d7ef1a117", 
    // 192..255
    "57be81f47b17d9ae7c4ff15429a73e10" +
    "acf250ed3a90a93c711308a74c6216a9" +
    "ed84cd126da7f28e8abf8bb63517e1ca" +
    "98e712f4fb2e1a6aed9fdc73291faa17",
    // 256..319
    "958211c4ba2ebd5838c635edb81f513a" +
    "91a294e194f1c039aeec657dce40aa7e" +
    "7c0af57cacefa40c9f14b71a4b3456a6" +
    "3e162ec7d8d10b8ffb1810d71001b618",
    // 448..511
    "696afcfd0cddcc83c7e77f11a649d79a" +
    "cdc3354e9635ff137e929933a0bd6f53" +
    "77efa105a3a4266b7c0d089d08f1e855" +
    "cc32b15b93784a36e56a76cc64bc8477"
];

test('build in ones', function (t) {
	t.plan(4);
	var state = new Salsa20(key, nonce);

	// compare 0..63
	t.equals(state.getBytes(64).toString('hex'), good[0]);
	// discard 64..191
	state.getBytes(128);
	// compare 192..255
	t.equals(state.getBytes(64).toString('hex'),good[1]);
	// compare 256..319
	t.equals(state.getBytes(64).toString('hex'), good[2]);
	// discard 320..447
	state.getBytes(128);
	// compare 448..511
	t.equals(state.getBytes(64).toString('hex'), good[3]);
	 
});

test('stream', function (t) {
	t.plan(4);
	var stream = new Salsa20Stream(key, nonce);
	var out = new Buffer('');
	stream.on('data', function (d) {
		out = Buffer.concat([out, d]);
	});
	var buf = new Buffer(64);
	buf.fill(0);
	var buf2 = new Buffer(128);
	buf.fill(0);
	stream.write(buf);
	t.equals(out.toString('hex'), good[0]);
	// discard 64..191
	stream.write(buf2);
	out = new Buffer('');
	stream.write(buf);
	// compare 192..255
	t.equals(out.toString('hex'), good[1]);
	out = new Buffer('');
	stream.write(buf);
	// compare 256..319
	t.equals(out.toString('hex'), good[2]);
	out = new Buffer('');
	// discard 320..447
	stream.write(buf2);
	out = new Buffer('');
	stream.write(buf);
	// compare 448..511
	t.equals(out.toString('hex'), good[3]);
	 
});