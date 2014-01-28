
Q.Sprite.extend("Rope", {
    init: function(p) {
        this._super(p, {
            _maxLength: 100,
            _lengthPerSegment: 10,
            _numSegments: 0,
            w: 1,
            h: 1,
            _rise: 0,
            _run: 0
        });
    },

    
    
    step: function(dt) {
        if(this.p._numSegments * this.p._lengthPerSegment < this.p._maxLength) {
           this.p._numSegments++; 
        }
    },

    _slope: function(slope) {
        return this.p._lengthPerSegment * slope;
    },

    draw: function(ctx) {
        ctx.beginPath();
        ctx.moveTo(0, 0);
        var x = this._slope(this.p._run) * this.p._numSegments;
        var y = this._slope(this.p._rise) * this.p._numSegments;
        ctx.lineTo(x, y);
        ctx.closePath();
        ctx.stroke();
    }
});
