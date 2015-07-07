 
var $ = require("jquery");
var React = require("react");



var DropdownItem = React.createClass({

	render : function(){

		if(this.props.selected){
			return <li className="multiselect-item active" onClick={this.props.onSelected}>
						{this.props.item[this.props.display_field]}
					 	</li> ;
		}else{
			return  <li className="multiselect-item" onClick={this.props.onSelected}>
						{this.props.item[this.props.display_field]}
					</li>;
		}

	}
});

var MultiSelect = React.createClass({
	_onItemSelected : function(index){
		var selectedItemsIndex = this.state.selected.indexOf(index);
		(selectedItemsIndex > -1) ? this.state.selected.splice(selectedItemsIndex,1) : this.state.selected.push(index) ;
		this.setState({open:false});
		this.forceUpdate();
		this.props.onUpdate ? this.props.onUpdate(this.state.selected) :"";
	},
	_selectAll : function(){
		if(this.state.selected.length == this.props.items.length){
			this.setState({selected:[]});
		}else{
			var arr = this.props.items.map(function(i,index){
				return index;
			});
			this.setState({selected :arr });

		};


	},
	getInitialState:function(){
		return {open:false,
			selected : this.props.selected
		};
	},
	handleClick:function(e){
		this.setState({open:true});
		self = this;
		var documentClickHandler = function(event){
		if($(event.target).closest(".multiselect."+self.props.name).length===0){
			self.setState({open:false});
			$(document).unbind("click."+self.props.name,documentClickHandler);
			}
		}
		$(document).unbind("click."+self.props.name,documentClickHandler).bind("click."+self.props.name,documentClickHandler);

	},
	componentDidReceiveProps : function(){
		this.forceUpdate();
	},
	render : function(){
		var self = this;
		var dropdownItems = this.props.items.map(function(item,index){
				selected = (self.state.selected.indexOf(index)>-1);
				return <DropdownItem key={index} onSelected={self._onItemSelected.bind(self,index)} item={item} display_field={self.props.display_field} selected={selected} index={index} />
		});
		var selectedItems = this.props.items.filter(function(item,index){
				return (self.state.selected.indexOf(index)>-1);
		});
		 // var displayText = (selectedItems.length === self.props.items.length ? "All " + self.props.label : ((selectedItems.length > 0) ? (selectedItems.length > 1 ? selectedItems.length +" " +self.props.label : selectedItems[0][self.props.display_field]) : self.props.label));
		var displayText = (selectedItems.length === self.props.items.length ? "All " + self.props.label : ((selectedItems.length > 0) ? (selectedItems.length > 1 ? selectedItems.length +" " +self.props.label : selectedItems[0][self.props.display_field]) : self.props.label));
		return  <div className={"multiselect "+self.props.name} onClick={self.handleClick}>
					<p>
						<span>{this.props.children} </span>{displayText}
					</p>
				<ul className={self.state.open?"multiselect-menu open" :"multiselect-menu close"} >
				<li className="multiselect-item select-all" onClick={self._selectAll}>
						Select All
					</li>
				{dropdownItems}
				</ul>
				</div>;
	}
});


 module.exports = MultiSelect;
