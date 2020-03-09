function createMixins() {
    function computerQualityMixin(classToExtend) {
        if (classToExtend.name === 'Desktop' || classToExtend.name === 'Laptop') {
            classToExtend.prototype.getQuality = function () {
                return (this.processorSpeed + this.ram + this.hardDiskSpace) / 3;
            }
    
            classToExtend.prototype.isFast = function () {
                if (this.processorSpeed > (this.ram / 4)) {
                    return true;
                }
    
                return false;
            }
    
            classToExtend.prototype.isRoomy = function () {
                if (this.hardDiskSpace > Math.floor(this.ram * this.processorSpeed)) {
                    return true;
                }
    
                return false;
            }           
        } 
        else {
            throw new TypeError('the given attribute is not acomputer!');
        }
    }

    function styleMixin(classToExtend) {
        if (classToExtend.name === 'Desktop' || classToExtend.name === 'Laptop') {
            classToExtend.prototype.isFullSet = function () {
                if(this.manufacturer === this.monitor.manufacturer && this.manufacturer === this.keyboard.manufacturer) {
                    return true
                }

                return false;
            }
        
            classToExtend.prototype.isClassy = function () {
                if(this.battery.expectedLife >= 3 && (this.color === 'Silver' || this.color === 'Black') && this.weight < 3) {
                    return true;
                }

                return false;
            }
        }
        else {
            throw new TypeError('the given attribute is not a computer!');
        }
    }

    return {
        computerQualityMixin,
        styleMixin
    }
}