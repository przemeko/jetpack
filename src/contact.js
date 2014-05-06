var jetpack = jetpack || {};

jetpack.contact = function(particleA, particleB, restitution) {
    this.particleA = particleA || new jetpack.Particle();
    this.particleB = particleB || new jetpack.Particle();
    this.restitution = restitution || 1;
    this.contactNormal = new jetpack.Vector();

    this.relativeVelocity = new jetpack.Vector();
    this.impulsePerInverseMass = new jetpack.Vector();
    this.separatingVelocity = 0;
    this.newSeparatingVelocity = 0;
    this.deltaVelocity = 0;
    this.totalInverseMass = 0;
    this.impulse = 0;
};

jetpack.contact.prototype.resolve = function(duration) {

};

jetpack.contact.prototype.calculateSeparatingVelocity = function() {
    this.relativeVelocity.set(this.particleA.getVelocity());
    this.relativeVelocity.sub(this.particleB.getVelocity());

    return this.relativeVelocity.scalarProduct(this.contactNormal);
};

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
    var vel = new jetpack.Vector();
    
    imp.set(impulsePerInverseMass).scale(this.particleA.getInverseMass());
    vel.set(this.particleA.getVelocity()).add(imp);
    this.particleA.getVelocity().set(vel);
    
    imp.set(impulsePerInverseMass).scale(this.particleB.getInverseMass());
    vel.set(this.particleB.getVelocity()).add(imp);
    this.particleB.getVelocity().set(vel);

};