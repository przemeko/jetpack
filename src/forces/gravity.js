var jetpack = jetpack || {};
jetpack.forces = jetpack.forces || {};

jetpack.forces.Gravity = function(x, y, z) {
    x = x || 0;
    y = y || 0;
    z = z || 0;
    this.acceleration = new jetpack.Vector(x, y, z);
    
};

jetpack.forces.Gravity.prototype.calculateForce = function(particle, duration) {
    
    return this.acceleration.scale(particle.getMass());
};