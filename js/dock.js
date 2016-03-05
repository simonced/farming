
var dock = {
	elem : null,
	tools: [],
	seeds: []

	,activateSeed: function(seed_) {

		var seedName = $(seed_).data('seed-name');
		var seed = seeds[seedName];
		if(!seed) {
			console.log( "The seed "+seedName+" is missing from vars.js!" );
			return;
		}

		this._activateIcon(seed_);

		// we clear, so it works even if we change the seed
		farm.highlightPropsClear();
		if($(seed_).hasClass('active')) {
			farm.highlightProps(seed.actOn);
			// TODO register an action for the tiles available
			// so we can change their state
		}
	}

	/**
	 * We activate a tool
	 * @author Simon Cedric
	 * @param jQueryNode tool_
	 */
	,activateTool: function(tool_) {

		var toolName = $(tool_).data('tool-name');
		var tool = tools[toolName];
		if(!tool) {
			console.log( "The tool "+toolName+" is missing from vars.js!" );
			return;
		}

		this._activateIcon(tool_);
		// we clear, so it works even if we change the tool
		farm.highlightPropsClear();
		if($(tool_).hasClass('active')) {
			var props = farm.highlightProps(tool.actOn);
			//console.log( props );
			for(var p in props) {
				$(props[p].node).click(function() {
					console.log( 'click!', props[p] );
					props[p].state = tool.stateAfterUse;
					props[p].displayState();
				});
			}
		}
	}

	// some private-like function to works for tools and seeds
	,_activateIcon: function(icon_) {
		//console.log( "activating tool: ", icon_ );
		if($(icon_).hasClass('active'))	 {
			$(icon_).removeClass('active');
		}
		else {
			// desactivating any other active icon in the dock
			$(".active", this.elem).removeClass('active');
			$(icon_).addClass('active');
		}
	}
};

dock.elem = $('#dock')[0];

// handling the tool icons
$('.icon-tool', dock.elem).click(function() {
	dock.activateTool(this);
});

// handling the seeds icons
$('.icon-seed', dock.elem).click(function() {
	dock.activateSeed(this);
});

//console.log( dock );

