QUnit.test("particle", function(assert) {
    var p1 = new jetpack.Particle();
    p1.setPosition(1,2,3);
    assert.strictEqual(1,p1.getPosition().x , "get and set position: x value");
    var p2 = new jetpack.Particle();
    p2.setPosition(5,6,7);
    
    var p1 = new jetpack.Particle();
    var v = new jetpack.Vector(2,3,4);
    p1.getVelocity().set(v);
    assert.strictEqual(p1.getVelocity().x,2 , "set velocity: x correct");
    assert.strictEqual(p1.getVelocity().y,3 , "set velocity: y correct");
    assert.strictEqual(p1.getVelocity().z,4 , "set velocity: z correct");
    
    var p1 = new jetpack.Particle();
    var v = new jetpack.Vector(2,3,4);
    p1.setVelocity(1,2,3).getVelocity().add(v);
    assert.strictEqual(p1.getVelocity().x,3 , "chain addition: x correct");
    assert.strictEqual(p1.getVelocity().y,5 , "chain addition: y correct");
    assert.strictEqual(p1.getVelocity().z,7 , "chain addition: z correct");
    
    var p1 = new jetpack.Particle();
    var v1 = new jetpack.Vector(2,3,4);
    var v2 = new jetpack.Vector(2,3,4);
    var v3 = new jetpack.Vector(1,1,1);
    p1.setVelocity(1,2,3).getVelocity().add(v1).add(v2).sub(v3);
    assert.strictEqual(p1.getVelocity().x,4 , "chain addition and substraction: x correct");
    assert.strictEqual(p1.getVelocity().y,7 , "hain addition and substraction: y correct");
    assert.strictEqual(p1.getVelocity().z,10 , "hain addition and substraction: z correct");
    
    var p1 = new jetpack.Particle();
    var v1 = new jetpack.Vector(2,3,4);
    var v2 = new jetpack.Vector(2,3,4);
    var s = 3;
    p1.setVelocity(1,2,3).getVelocity().add(v1).scale(s).sub(v2);
    assert.strictEqual(p1.getVelocity().x,7 , "chain addition,scale and substraction: x correct");
    assert.strictEqual(p1.getVelocity().y,12 , "hain addition,scale  and substraction: y correct");
    assert.strictEqual(p1.getVelocity().z,17 , "hain addition,scale  and substraction: z correct");

});