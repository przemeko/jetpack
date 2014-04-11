var phy = phy || {};

phy.Particle = function() {

    /**
     * @param position
     * @type Vector
     */
    this.position = new phy.Vector();

    /**
     * @param velocity
     * @type Vector
     */
    this.velocity = new phy.Vector();

    /**
     * @param position
     * @type Vector
     */
    this.acceleration = new phy.Vector();

    /**
     * Holds the accumulated force to be applied at the next
     * simulation iteration only. This value is zeroed at each
     * integration step.
     * 
     * @param forceAccum
     * @type Vector
     */
    this.forceAccum = new phy.Vector();

    /**
     * Amount of damping applied to linear motion.
     * Use for "drag" forces.
     * 
     * @param dumping
     * @type Number
     */
    this.damping;

    /**
     * @param mass
     * @type Number
     */
    this.mass = 1;

    /**
     * Equal to 1/mass
     * 
     * @param inverseMass
     * @type Number
     */
    this.inverseMass = 1;

    // tmp
    this.resultingAcc;
};

phy.Particle.prototype.integrate = function(duration) {

    if (duration === 0) {
        return false;
    }
    // update linear position
    // x = vx * dt (for x axis)
    this.position.addScaledVector(this.velocity, duration);

    // Work out the acceleration from the force
    // ax = Fx/m (for x axis)
    this.resultingAcc = this.acceleration;
    this.resultingAcc.addScaledVector(this.forceAccum, this.inverseMass);

    // Update linear velocity from the acceleration
    // vx = ax*dt (for x axis)
    this.velocity.addScaledVector(this.resultingAcc, duration);

    // Impose drag
    // Used to remove a bit of velocity at each frame
    this.velocity.scale(Math.pow(this.damping, duration));
};

/**
 * 
 * @method setMass
 * @param {number} scalar
 * @return {Particle} this
 */
phy.Particle.prototype.setMass = function(scalar) {

    this.mass = scalar;
    this.inverseMass = 1 / scalar;
    return this;
};

/**
 * 
 * @method getMass
 * @return {Number} mass
 */
phy.Particle.prototype.getMass = function() {

    return this.mass;
};

/**
 * 
 * @method setPosition
 * @param {Number} x
 * @param {Number} y
 * @param {Number} z
 * @return {Particle} this
 */
phy.Particle.prototype.setPosition = function(x, y, z) {

    this.position = new phy.Vector(x, y, z);

    return this;
};

/**
 * 
 * @method getPosition
 * @return {Vector} position
 */
phy.Particle.prototype.getPosition = function() {

    return this.position;
};

/**
 * 
 * @method setVelocity
 * @param {Number} x
 * @param {Number} y
 * @param {Number} z
 * @return {Particle} this
 */
phy.Particle.prototype.setVelocity = function(x, y, z) {

    this.velocity = new phy.Vector(x, y, z);

    return this;
};

/**
 * 
 * @method getVelocity
 * @return {Vector} velocity
 */
phy.Particle.prototype.getVelocity = function() {

    return this.velocity;
};

/**
 * 
 * @method setAcceleration
 * @param {Number} x
 * @param {Number} y
 * @param {Number} z
 * @return {Particle} this
 */
phy.Particle.prototype.setAcceleration = function(x, y, z) {

    this.acceleration = new phy.Vector(x, y, z);

    return this;
};

/**
 * 
 * @method getAcceleration
 * @return {Vector} velocity
 */
phy.Particle.prototype.getAcceleration = function() {

    return this.acceleration;
};

/**
 * 
 * @method setMass
 * @param {number} scalar
 * @return {Particle} this
 */
phy.Particle.prototype.setDamping = function(scalar) {

    this.damping = scalar;
    return this;
};