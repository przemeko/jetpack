QUnit.test("particle", function(assert) {
    var p1 = new jetpack.Particle();
    p1.setPosition(1,2,3);
    assert.strictEqual(1,p1.getPosition().x , "get and set position: x value");
    var p2 = new jetpack.Particle();
    p2.setPosition(5,6,7);
    console.log(p1.getPosition(), p2.getPosition());
});