var phy = phy || {};

phy.Vector = function(x,y,z) {
    this.x = x || 0;
    this.y = y || 0;
    this.z = z || 0;
    
    /**
     *
     */
    this.add = function(vect) {
        this.x += vect.x;
        this.y += vect.y;
        this.z += vect.z;
        
        return this;
    };
    
    /**
     *
     */
    this.invert = function() {
        this.x = -this.x;
        this.y = -this.y;
        this.z = -this.z;
        
        return this;
    };
    
    /**
     * 
     */
    this.magnitude = function() {
        
        return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z);
    };
    
    /**
     * 
     */
    this.squareMagnitude = function() {
        
        return this.x*this.x+this.y*this.y+this.z*this.z;
    };
    
    /**
     * 
     */
    this.normalize = function() {
        var l = 1/this.magnitude();
        
        this.x = vect.x*l;
        this.y = vect.y*l;
        this.z = vect.z*l;
        
        return this;
    };
    
    this.test = function() {
        return 'x:'+_x+' y:'+_y+' z:'+_z;
    };
}
