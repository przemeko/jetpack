var jetpack = jetpack || {};

/**
 * Basic block
 * 
 * @param {Number} x
 * @param {Number} y
 * @param {Number} z
 * @return {Particle} this
 */
jetpack.Particle = function(x, y, z) {

    x = x || 0;
    y = y || 0;
    z = z || 0;
    /**
     * @param position
     * @type Vector
     */
    this.position = new jetpack.Vector(x, y, z);

    /**
     * @param velocity
     * @type Vector
     */
    this.velocity = new jetpack.Vector();

    /**
     * @param acceleration
     * @type Vector
     */
    this.acceleration = new jetpack.Vector();

    /**
     * @param forces
     * @type Array
     */
    this.forces = [];

    /**
     * Number of forces
     * 
     * @param forcesNum
     * @type Number
     */
    this.forcesNum = 0;
    /**
     * Holds the accumulated force to be applied at the next
     * simulation iteration only. This value is zeroed at each
     * integration step.
     * 
     * @param forceAccum
     * @type Vector
     */
    this.forceAccum = new jetpack.Vector();

    /**
     * Amount of damping applied to linear motion.
     * Use for "drag" forces.
     * 
     * @param dumping
     * @type Number
     */
    this.damping = 1;

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
};

/**
 * @method integrate
 * @param {Number} duration
 * @return {undefined}
 */
jetpack.Particle.prototype.integrate = function(duration) {

    if (duration === 0) {
        return false;
    }
    // update linear position
    // x = x0 + vx * dt (for x axis)
    this.position.addScaledVector(this.velocity, duration);

    // D'Alembert's principle -  if we have a set of forces acting 
    // on an object, we can replace all those forces with a single force
    // Work out the acceleration from all forces
    // ax = a0 + Fx/m (for x axis, Fx - sum of all x axis forces)
    for (var i = 0; i < this.forcesNum; i++) {
        this.forceAccum.add(this.forces[i].calculateForce(this, duration));
    }
    this.acceleration.addScaledVector(this.forceAccum, this.inverseMass);

    // Update linear velocity from the acceleration
    // vx = v0 + ax*dt (for x axis)
    this.velocity.addScaledVector(this.acceleration, duration);

    // Impose drag
    // Used to remove a bit of velocity at each frame
    //@TODO remove to external forces
    this.velocity.scale(Math.pow(this.damping, duration));

    //clear the forces
    this.forceAccum.clear();
    this.acceleration.clear();
};

/**
 * @method addForce
 * @param {Vector} force
 * @return {Particle} this
 */
jetpack.Particle.prototype.addForce = function(force) {
    this.forces.push(force);
    this.forcesNum = this.forces.length;
    return this;
};

/**
 * 
 * @method setMass
 * @param {number} scalar
 * @return {Particle} this
 */
jetpack.Particle.prototype.setMass = function(scalar) {

    this.mass = scalar;
    this.inverseMass = 1 / scalar;
    return this;
};

/**
 * 
 * @method getMass
 * @return {Number} mass
 */
jetpack.Particle.prototype.getMass = function() {

    return this.mass;
};

/**
 * 
 * @method getInverseMass
 * @return {Number} mass
 */
jetpack.Particle.prototype.getInverseMass = function() {

    return this.inverseMass;
};

/**
 * 
 * @method setPosition
 * @param {Number} x
 * @param {Number} y
 * @param {Number} z
 * @return {Particle} this
 */
jetpack.Particle.prototype.setPosition = function(x, y, z) {

    this.position = new jetpack.Vector(x, y, z);

    return this;
};

/**
 * 
 * @method getPosition
 * @return {Vector} position
 */
jetpack.Particle.prototype.getPosition = function() {

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
jetpack.Particle.prototype.setVelocity = function(x, y, z) {

    this.velocity = new jetpack.Vector(x, y, z);

    return this;
};

/**
 * 
 * @method getVelocity
 * @return {Vector} velocity
 */
jetpack.Particle.prototype.getVelocity = function() {

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
jetpack.Particle.prototype.setAcceleration = function(x, y, z) {

    this.acceleration = new jetpack.Vector(x, y, z);

    return this;
};

/**
 * 
 * @method getAcceleration
 * @return {Vector} velocity
 */
jetpack.Particle.prototype.getAcceleration = function() {

    return this.acceleration;
};

/**
 * 
 * @method setMass
 * @param {number} scalar
 * @return {Particle} this
 */
jetpack.Particle.prototype.setDamping = function(scalar) {

    this.damping = scalar;
    return this;
};