var jetpack = jetpack || {};
jetpack.forces = jetpack.forces || {};

/**
 * Spring force
 * 
 * @param {Particle} otherParticle
 * @param {Number} springConstant
 * @param {Number} restLength
 * @returns {Spring} this
 */
jetpack.forces.Spring = function(otherParticle, springConstant, restLength) {
    this.otherParticle = otherParticle || new jetpack.Particle();
    this.springConstant = springConstant || 0; // k
    this.restLength = restLength || 0; // r0
    
    this.vector = new jetpack.Vector(); // d
    this.magnitude = 0;
};

/**
 * Hook's law
 * F = -k(r - r0)  // r0 - rest length
 * in 3d:
 * F =  -k(|d| - r0)dn // dn - normalized d
 * 
 * @param {Particle} particle
 * @param {Number} duration
 * @returns {Vector} force
 */
jetpack.forces.Spring.prototype.calculateForce = function(particle, duration) {

    // Calculate the vector of the spring - d
    this.vector.clear();
    this.vector.add(particle.getPosition());
    this.vector.sub(this.otherParticle.getPosition());

    // Calculate the magnitude of the force 
    this.magnitude = Math.abs(this.vector.magnitude() - this.restLength); // |d| - r0

    // // Calculate the final force and return it
    this.vector.normalize(); // dn
    return this.vector.scale(-this.springConstant*this.magnitude);
};


