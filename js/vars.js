/**
 * We have all our settings and vars here
 * Should be easier to maintain and also
 * it's nive to have all in one place for matching 
 * logic and data
 * @author Simon Cedric
 * @update 2015-06-06 
 */


// list of possible seeds
var seeds = {
	wheat: {waterQty: 1, growingTime: 10, actOn: "plowed"}
};

// possible props states
var propsStates = ['plowed', 'seeded', 'growing', 'grown'];

// properties of tools
var tools = {
	plow: { actOn: '', stateAfterUse: 'plowed' },
	// ok on any prop but will reset the prop state
	watercan: { actOn: 'seeded', stateAfterUse: 'growing' }
	// TODO add other tools
};

