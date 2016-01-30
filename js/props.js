// global variable:
// - farm contains the props and many other things for the current game
var farm = farm || {};

/**
 * We hightligh props of some type
 * @author Azet
 * @param string prop_
 * if empty, matches everyting
 * @return matched props
 */
farm.highlightProps = function(prop_) {
	var activatedProps = [];
	this.props.map(function(p_) {
		if( prop_==="" || p_.state===prop_) {
			$(p_.node).addClass('prop-activable');
			activatedProps.push(p_);
		}
	});
	return activatedProps;
};

/**
 * Clears the activable state of all props on screen
 * @author Cedric Simon
 */
farm.highlightPropsClear = function() {
	this.props.map(function(p_) {
		$(p_.node).removeClass('prop-activable');
		// we also clear all events added but the tools/seeds activated previously
		$(p_.node).off();
	});
	
};

// list of props : init
farm.props = [];

/**
 * This is the fundation of all the props
 * possible states:
 *  null: nothing has been done yet on that prop
 *  plowed: soil prepared to be seeded TODO find a better word
 *  seeded: seed added to the soil, ready to be watered
 *  growing: seeds are growing, nothing can be done during that state
 *  grown: seeds have grown and product can be taken
 * @param DOMElement node_
 */
function Prop(node_) {
	this.node = node_;

	// basic settings
	this.wateringQty = 1;	// water quatity, 1 unit as default
	this.growingTime = 10;	// time in seconds

	// state of the prop, depending on that, user can do certain things
	this.state = null;

	// depending on the seed type, the growing time will change
	// so as the watering quantity
	this.seedType = null;

	// inner functions
	//======================================================================

	// we set the crop state but we check if the state is in
	// the list of available states
	this.setState = function(state_) {
		var found = false;
		for(s in propsStates) {
			if(propsStates[s]===state_) {
				found = true;
				this.state = state_;
				break;
			}
		}
		return found;
	};

	// set state of the crop
	this.getState = function() {
		var state = "unknown";
		if(this.isPlowable()) state = "ready to plow";
		if(this.isSeedable()) state = "ready to seed";
		if(this.isWaterable()) state = "ready to water";
		if(this.isGrowing()) state = "growing";
		if(this.isGrown()) state = "ready to harvest";
		return state;
	};

	// sets the state of the crop by displaying it
	this.displayState = function() {
		// very crude way of handling the display of the state for now
		$(this.node).empty().append( this.getState() );
	};
	this.isPlowable = function() {
		return this.state === null;
	};
	this.isSeedable = function() {
		return this.state === "plowed";
	};
	this.isWaterable = function() {
		return this.state === "seeded";
	};

	this.isGrowing = function() {
		return this.state==="growing";
	};
	this.isGrown = function() {
		return this.state === "grown";
	};
};

// ======================================================================
//								  bootstrap
// depending on the nature of the prop, we have different settings to take care of
// like the "preparing time", "watering quantity" etc...
$('.prop').each(function() {
	var prop = new Prop($(this)[0]);
	// TODO add change of state from the node class status
	var nodeState = $(this).attr('data-state');
	if(nodeState) {
		prop.setState(nodeState);
	}
	prop.displayState();
	farm.props.push( prop );
});
//console.log( farm.props );

