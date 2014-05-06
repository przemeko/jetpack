var jetpack = jetpack || {};
jetpack.forces = jetpack.forces || {};

/**
 * Gravity force
 * 
 * @param {Number} x
 * @param {Number} y
 * @param {Number} z
 * @return {Gravity} this
 */
jetpack.forces.Gravity = function(x, y, z) {
    // this is our "g"
    this.acceleration = new jetpack.Vector(x || 0, y || 0, z || 0);
};

/**
 * F = mg
 * 
 * @param {Particle} particle
 * @param {number} duration
 * @returns {Vector} force
 */
jetpack.forces.Gravity.prototype.calculateForce = function(particle, duration) {
    
    return this.acceleration.scale(particle.getMass());
};