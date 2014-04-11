var phy = phy || {};

phy.Vector = function(x, y, z) {

    this.x = x || 0;
    this.y = y || 0;
    this.z = z || 0;
};
/**
 * 
 * @method add
 * @param {Vector} vect
 * @return {Vector} this
 */
phy.Vector.prototype.add = function(vect) {

    this.x += vect.x;
    this.y += vect.y;
    this.z += vect.z;

    return this;
};

/**
 * Shortcut for vect1 = vect1 + scalar*vect2
 * 
 * @method addScaledVector
 * @param {Vector} vect
 * @param {Number} scalar
 * @return {Vector} this
 */
phy.Vector.prototype.addScaledVector = function(vect, scalar) {

    this.x += vect.x * scalar;
    this.y += vect.y * scalar;
    this.z += vect.z * scalar;

    return this;
};

/**
 * Multiply vector by scalar
 * 
 * @method scale
 * @param {number} scalar
 * @return {Vector} this
 */
phy.Vector.prototype.scale = function(scalar) {

    this.x *= scalar;
    this.y *= scalar;
    this.z *= scalar;

    return this;
};

/**
 * 
 * @method scalarProduct
 * @param {Vector} vect
 * @return {number}
 */
phy.Vector.prototype.scalarProduct = function(vect) {

    return this.x * vect.x * this.y * vect.y * this.z * vect.z;
};

/**
 * 
 * @method vectorProduct
 * @param {Vector} vect
 * @return {Vector} new vector
 */
phy.Vector.prototype.vectorProduct = function(vect) {

    var prod = new phy.Vector();
    prod.x = this.y * vect.z - this.z * vect.y;
    prod.y = this.z * vect.x - this.x * vect.z;
    prod.z = this.x * vect.y - this.y * vect.x;

    return prod;
};

/**
 * Rarely used vector, with no simply geometric interpretation
 * 
 * @method componentProduct
 * @param {Vector} vect
 * @return {Vector} new vector
 */
phy.Vector.prototype.componentProduct = function(vect) {

    var prod = new phy.Vector();
    prod.x = this.x * vect.x;
    prod.y = this.y * vect.y;
    prod.z = this.z * vect.z;

    return prod;
};

/**
 * @method invert
 * @return {Vector} this
 */
phy.Vector.prototype.invert = function() {

    this.x = -this.x;
    this.y = -this.y;
    this.z = -this.z;

    return this;
};

/**
 * 
 * @method magnitude
 * @return {number}
 */
phy.Vector.prototype.magnitude = function() {

    return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
};

/**
 * Sometimes we don't need sqrt value.
 * 
 * @method magnitude magnitude without sqrt
 * @return {number}
 */
phy.Vector.prototype.squareMagnitude = function() {

    return this.x * this.x + this.y * this.y + this.z * this.z;
};

/**
 * 
 * @method normalize
 * @return {Vector} this
 */
phy.Vector.prototype.normalize = function() {

    var l = 1 / this.magnitude();

    this.x = this.x * l;
    this.y = this.y * l;
    this.z = this.z * l;

    return this;
};