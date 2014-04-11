QUnit.test("implementation", function(assert) {
    var v1 = new phy.Vector(1,2,3);
    var v2 = new phy.Vector(4,5,6);
    assert.strictEqual(v1.x, 1, "init Vector: x");
    assert.strictEqual(v1.y ,2, "init Vector: y");
    assert.strictEqual(v1.z, 3 , "init Vector: z");
    v1.scale(10); // change v1
    // and check is there any impact of v2 values
    assert.strictEqual(v2.x,4 , "Vector 2 value: x");
    assert.strictEqual(v2.y,5 , "Vector 2 value: y");
    assert.strictEqual(v2.z,6 , "Vector 2 value: z");
    
    
});


