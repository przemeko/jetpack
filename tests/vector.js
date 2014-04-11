QUnit.test("vector", function(assert) {
    var v1 = new phy.Vector(1, 2, 3);
    var v2 = new phy.Vector(1, 2, 3);
    v2.add(v1);
    assert.strictEqual(2, v2.x, "add: x value");
    assert.strictEqual(4, v2.y, "add: y value");
    assert.strictEqual(6, v2.z, "add: z value");

    var v1 = new phy.Vector(1, 2, 3);
    assert.equal(3.742, parseFloat(v1.magnitude()).toFixed(3), "magnitude of [1,2,3]");
    assert.equal(14, v1.squareMagnitude(), "square magnitude of [1,2,3]");

    var v1 = new phy.Vector(1, 2, 3);
    v1.normalize();
    var nx = parseFloat(v1.x).toFixed(3);
    var ny = parseFloat(v1.y).toFixed(3);
    var nz = parseFloat(v1.z).toFixed(3);
    assert.equal(0.267, nx, "normalize: x value");
    assert.equal(0.535, ny, "normalize: y value");
    assert.equal(0.802, nz, "normalize: z value");

    var v1 = new phy.Vector(1, 2, 3);
    v1.scale(5);
    assert.strictEqual(5, v1.x, "scale: x value");
    assert.strictEqual(10, v1.y, "scale: y value");
    assert.strictEqual(15, v1.z, "scale: z value");

    var v1 = new phy.Vector(1, 2, 3);
    var v2 = new phy.Vector(1, 2, 3);
    v1.addScaledVector(v2, 3);
    assert.strictEqual(4, v1.x, "addScaledVector x value");
    assert.strictEqual(8, v1.y, "addScaledVector y value");
    assert.strictEqual(12, v1.z, "addScaledVector z value");

});


