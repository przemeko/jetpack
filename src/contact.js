var jetpack = jetpack || {};

jetpack.contact = function(particleA, particleB, restitution) {
    /**
     * particleA
     * All calculation we do in perspective of this particle
     * 
     * @type {Particle}
     */
    this.particleA = particleA || new jetpack.Particle();

    /**
     * particleB
     * 
     * @type {Particle}
     */
    this.particleB = particleB || new jetpack.Particle();

    /**
     * restitution
     * Holds the normal restitution coefficient at the contact.
     * 
     * 
     * @type {Number}
     */
    this.restitution = restitution || 1;

    /**
     * Holds the direction of the contact in world coordinates.
     * 
     * @type {Vector}
     */
    this.contactNormal = new jetpack.Vector();

    /**
     * Holds the depth of penetration at the contact.
     * A negative depth represents two objects that have no interpenetration.
     * A depth of zero represents two objects that are merely touching.
     * 
     * @type {Number}
     */
    this.penetration = -1;


    // helpers

    this.relativeVelocity = new jetpack.Vector();
    this.impulsePerInverseMass = new jetpack.Vector();
    this.movePerInverseMass = new jetpack.Vector();
    this.separatingVelocity = 0;
    this.newSeparatingVelocity = 0;
    this.deltaVelocity = 0;
    this.totalInverseMass = 0;
    this.impulse = 0;
};

jetpack.contact.prototype.resolve = function(duration) {
    this.resolveVelocity(duration);
    this.resolveInterpenetration(duration);
};

jetpack.contact.prototype.calculateSeparatingVelocity = function() {
    this.relativeVelocity.set(this.particleA.getVelocity());
    this.relativeVelocity.sub(this.particleB.getVelocity());

    return this.relativeVelocity.scalarProduct(this.contactNormal);
};

/**
 * Change velocity of particles
 * 
 * @param {Number} duration
 * @returns {void}
 */
jetpack.contact.prototype.resolveVelocity = function(duration) {

    // Find the velocity in the direction of the contact.
    this.separatingVelocity = this.calculateSeparatingVelocity();

    // Check whether it needs to be resolved.
    if (this.separatingVelocity > 0) {
        // The contact is either separating or stationary - there’s
        // no impulse required.
        return;
    }

    this.newSeparatingVelocity = -this.separatingVelocity * this.restitution;
    this.deltaVelocity = this.newSeparatingVelocity - this.separatingVelocity;

    // We apply the change in velocity to each object in proportion to
    // its inverse mass (i.e., those with lower inverse mass [higher
    // actual mass] get less change in velocity).
    this.totalInverseMass = this.particleA.getInverseMass() + this.particleB.getInverseMass();

    // If all particles have infinite mass, then impulses have no effect.
    if (this.totalInverseMass <= 0) {
        return;
    }

    // Calculate the impulse to apply.
    this.impulse = this.deltaVelocity / this.totalInverseMass;

    // Find the amount of impulse per unit of inverse mass.
    this.impulsePerInverseMass.set(this.contactNormal);
    this.impulsePerInverseMass.scale(this.impulse);

    // Apply impulses: they are applied in the direction of the contact,
    // and are proportional to the inverse mass.

    var imp = new jetpack.Vector();

    imp.set(impulsePerInverseMass).scale(this.particleA.getInverseMass());
    this.particleA.getVelocity().add(imp);

    imp.set(impulsePerInverseMass).scale(this.particleB.getInverseMass());
    this.particleB.getVelocity().add(imp);
};

/**
 * Change position of particles
 * 
 * @param {Number} duration
 * @returns {void}
 */
jetpack.contact.prototype.resolveInterpenetration = function(duration) {

    if (this.penetration <= 0) {
        return;
    }

    this.totalInverseMass = this.particleA.getInverseMass() + this.particleB.getInverseMass();

    if (this.totalInverseMass <= 0) {
        return;
    }

    this.movePerInverseMass
            .set(this.contactNormal)
            .scale(-this.penetration * this.particleA.getInverseMass() / this.totalInverseMass);
    this.particleA.getPosition()
            .add(this.movePerInverseMass);

    this.movePerInverseMass
            .set(this.contactNormal)
            .scale(-this.penetration * this.particleB.getInverseMass() / this.totalInverseMass);
    this.particleB.getPosition()
            .add(this.movePerInverseMass);

};