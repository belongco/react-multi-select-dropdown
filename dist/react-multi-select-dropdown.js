(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var DropdownItem = React.createClass({displayName: "DropdownItem",
	render : function(){
		if(this.props.selected){
			return React.createElement("li", {className: "multiselect-item active", onClick: this.props.onSelected}, 
						this.props.item[this.props.display_field]
					 	) ;
		}else{
			return  React.createElement("li", {className: "multiselect-item", onClick: this.props.onSelected}, 
						this.props.item[this.props.display_field]
					);
		}
	}
});

var MultiSelect = React.createClass({displayName: "MultiSelect",
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
				return React.createElement(DropdownItem, {key: index, onSelected: self._onItemSelected.bind(self,index), item: item, display_field: self.props.display_field, selected: selected, index: index})
		});
		var selectedItems = this.props.items.filter(function(item,index){
				return (self.state.selected.indexOf(index)>-1);
		});
		 // var displayText = (selectedItems.length === self.props.items.length ? "All " + self.props.label : ((selectedItems.length > 0) ? (selectedItems.length > 1 ? selectedItems.length +" " +self.props.label : selectedItems[0][self.props.display_field]) : self.props.label));
		var displayText = (selectedItems.length === self.props.items.length ? "All " + self.props.label : ((selectedItems.length > 0) ? (selectedItems.length > 1 ? selectedItems.length +" " +self.props.label : selectedItems[0][self.props.display_field]) : self.props.label));
		return  React.createElement("div", {className: "multiselect "+self.props.name, onClick: self.handleClick}, 
					React.createElement("p", null, 
						React.createElement("span", null, this.props.children, " "), displayText
					), 
				React.createElement("ul", {className: self.state.open?"multiselect-menu open" :"multiselect-menu close"}, 
				React.createElement("li", {className: "multiselect-item select-all", onClick: self._selectAll}, 
						"Select All"
					), 
				dropdownItems
				)
				);
	}
});


 module.exports = MultiSelect;

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvaG9tZS9iaGFyZ2F2L0Rlc2t0b3AvcmVhY3QtbXVsdGktc2VsZWN0LWRyb3Bkb3duL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBLElBQUksa0NBQWtDLDRCQUFBO0NBQ3JDLE1BQU0sR0FBRyxVQUFVO0VBQ2xCLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUM7R0FDdEIsT0FBTyxvQkFBQSxJQUFHLEVBQUEsQ0FBQSxDQUFDLFNBQUEsRUFBUyxDQUFDLHlCQUFBLEVBQXlCLENBQUMsT0FBQSxFQUFPLENBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFZLENBQUEsRUFBQTtNQUMzRSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBRTtPQUNyQyxDQUFBLEVBQUU7R0FDWCxJQUFJO0dBQ0osUUFBUSxvQkFBQSxJQUFHLEVBQUEsQ0FBQSxDQUFDLFNBQUEsRUFBUyxDQUFDLGtCQUFBLEVBQWtCLENBQUMsT0FBQSxFQUFPLENBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFZLENBQUEsRUFBQTtNQUNyRSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBRTtLQUN2QyxDQUFBLENBQUM7R0FDUjtFQUNEO0FBQ0YsQ0FBQyxDQUFDLENBQUM7O0FBRUgsSUFBSSxpQ0FBaUMsMkJBQUE7Q0FDcEMsZUFBZSxHQUFHLFNBQVMsS0FBSyxDQUFDO0VBQ2hDLElBQUksa0JBQWtCLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO0VBQzVELENBQUMsa0JBQWtCLEdBQUcsQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxR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RSxFQUFBLElBQUMsRUFBQTtNQUNGLG9CQUFBLE1BQUssRUFBQSxJQUFDLEVBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUMsR0FBUSxDQUFBLEVBQUMsV0FBWTtLQUM3QyxDQUFBLEVBQUE7SUFDTCxvQkFBQSxJQUFHLEVBQUEsQ0FBQSxDQUFDLFNBQUEsRUFBUyxDQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLHVCQUF1QixFQUFFLHdCQUF5QixDQUFFLENBQUEsRUFBQTtJQUNuRixvQkFBQSxJQUFHLEVBQUEsQ0FBQSxDQUFDLFNBQUEsRUFBUyxDQUFDLDZCQUFBLEVBQTZCLENBQUMsT0FBQSxFQUFPLENBQUUsSUFBSSxDQUFDLFVBQVksQ0FBQSxFQUFBO0FBQUEsTUFBQSxZQUFBO0FBQUEsS0FFaEUsQ0FBQSxFQUFBO0lBQ0wsYUFBYztJQUNWLENBQUE7SUFDQyxDQUFBLENBQUM7RUFDVDtBQUNGLENBQUMsQ0FBQyxDQUFDO0FBQ0g7O0NBRUMsTUFBTSxDQUFDLE9BQU8sR0FBRyxXQUFXLENBQUMiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwidmFyIERyb3Bkb3duSXRlbSA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcblx0cmVuZGVyIDogZnVuY3Rpb24oKXtcblx0XHRpZih0aGlzLnByb3BzLnNlbGVjdGVkKXtcblx0XHRcdHJldHVybiA8bGkgY2xhc3NOYW1lPVwibXVsdGlzZWxlY3QtaXRlbSBhY3RpdmVcIiBvbkNsaWNrPXt0aGlzLnByb3BzLm9uU2VsZWN0ZWR9PlxuXHRcdFx0XHRcdFx0e3RoaXMucHJvcHMuaXRlbVt0aGlzLnByb3BzLmRpc3BsYXlfZmllbGRdfVxuXHRcdFx0XHRcdCBcdDwvbGk+IDtcblx0XHR9ZWxzZXtcblx0XHRcdHJldHVybiAgPGxpIGNsYXNzTmFtZT1cIm11bHRpc2VsZWN0LWl0ZW1cIiBvbkNsaWNrPXt0aGlzLnByb3BzLm9uU2VsZWN0ZWR9PlxuXHRcdFx0XHRcdFx0e3RoaXMucHJvcHMuaXRlbVt0aGlzLnByb3BzLmRpc3BsYXlfZmllbGRdfVxuXHRcdFx0XHRcdDwvbGk+O1xuXHRcdH1cblx0fVxufSk7XG5cbnZhciBNdWx0aVNlbGVjdCA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcblx0X29uSXRlbVNlbGVjdGVkIDogZnVuY3Rpb24oaW5kZXgpe1xuXHRcdHZhciBzZWxlY3RlZEl0ZW1zSW5kZXggPSB0aGlzLnN0YXRlLnNlbGVjdGVkLmluZGV4T2YoaW5kZXgpO1xuXHRcdChzZWxlY3RlZEl0ZW1zSW5kZXggPiAtMSkgPyB0aGlzLnN0YXRlLnNlbGVjdGVkLnNwbGljZShzZWxlY3RlZEl0ZW1zSW5kZXgsMSkgOiB0aGlzLnN0YXRlLnNlbGVjdGVkLnB1c2goaW5kZXgpIDtcblx0XHR0aGlzLnNldFN0YXRlKHtvcGVuOmZhbHNlfSk7XG5cdFx0dGhpcy5mb3JjZVVwZGF0ZSgpO1xuXHRcdHRoaXMucHJvcHMub25VcGRhdGUgPyB0aGlzLnByb3BzLm9uVXBkYXRlKHRoaXMuc3RhdGUuc2VsZWN0ZWQpIDpcIlwiO1xuXHR9LFxuXHRfc2VsZWN0QWxsIDogZnVuY3Rpb24oKXtcblx0XHRpZih0aGlzLnN0YXRlLnNlbGVjdGVkLmxlbmd0aCA9PSB0aGlzLnByb3BzLml0ZW1zLmxlbmd0aCl7XG5cdFx0XHR0aGlzLnNldFN0YXRlKHtzZWxlY3RlZDpbXX0pO1xuXHRcdH1lbHNle1xuXHRcdFx0dmFyIGFyciA9IHRoaXMucHJvcHMuaXRlbXMubWFwKGZ1bmN0aW9uKGksaW5kZXgpe1xuXHRcdFx0XHRyZXR1cm4gaW5kZXg7XG5cdFx0XHR9KTtcblx0XHRcdHRoaXMuc2V0U3RhdGUoe3NlbGVjdGVkIDphcnIgfSk7XG5cblx0XHR9O1xuXHR9LFxuXHRnZXRJbml0aWFsU3RhdGU6ZnVuY3Rpb24oKXtcblx0XHRyZXR1cm4ge29wZW46ZmFsc2UsXG5cdFx0XHRzZWxlY3RlZCA6IHRoaXMucHJvcHMuc2VsZWN0ZWRcblx0XHR9O1xuXHR9LFxuXHRoYW5kbGVDbGljazpmdW5jdGlvbihlKXtcblx0XHR0aGlzLnNldFN0YXRlKHtvcGVuOnRydWV9KTtcblx0XHRzZWxmID0gdGhpcztcblx0XHR2YXIgZG9jdW1lbnRDbGlja0hhbmRsZXIgPSBmdW5jdGlvbihldmVudCl7XG5cdFx0aWYoJChldmVudC50YXJnZXQpLmNsb3Nlc3QoXCIubXVsdGlzZWxlY3QuXCIrc2VsZi5wcm9wcy5uYW1lKS5sZW5ndGg9PT0wKXtcblx0XHRcdHNlbGYuc2V0U3RhdGUoe29wZW46ZmFsc2V9KTtcblx0XHRcdCQoZG9jdW1lbnQpLnVuYmluZChcImNsaWNrLlwiK3NlbGYucHJvcHMubmFtZSxkb2N1bWVudENsaWNrSGFuZGxlcik7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdCQoZG9jdW1lbnQpLnVuYmluZChcImNsaWNrLlwiK3NlbGYucHJvcHMubmFtZSxkb2N1bWVudENsaWNrSGFuZGxlcikuYmluZChcImNsaWNrLlwiK3NlbGYucHJvcHMubmFtZSxkb2N1bWVudENsaWNrSGFuZGxlcik7XG5cblx0fSxcblx0Y29tcG9uZW50RGlkUmVjZWl2ZVByb3BzIDogZnVuY3Rpb24oKXtcblx0XHR0aGlzLmZvcmNlVXBkYXRlKCk7XG5cdH0sXG5cdHJlbmRlciA6IGZ1bmN0aW9uKCl7XG5cdFx0dmFyIHNlbGYgPSB0aGlzO1xuXHRcdHZhciBkcm9wZG93bkl0ZW1zID0gdGhpcy5wcm9wcy5pdGVtcy5tYXAoZnVuY3Rpb24oaXRlbSxpbmRleCl7XG5cdFx0XHRcdHNlbGVjdGVkID0gKHNlbGYuc3RhdGUuc2VsZWN0ZWQuaW5kZXhPZihpbmRleCk+LTEpO1xuXHRcdFx0XHRyZXR1cm4gPERyb3Bkb3duSXRlbSBrZXk9e2luZGV4fSBvblNlbGVjdGVkPXtzZWxmLl9vbkl0ZW1TZWxlY3RlZC5iaW5kKHNlbGYsaW5kZXgpfSBpdGVtPXtpdGVtfSBkaXNwbGF5X2ZpZWxkPXtzZWxmLnByb3BzLmRpc3BsYXlfZmllbGR9IHNlbGVjdGVkPXtzZWxlY3RlZH0gaW5kZXg9e2luZGV4fSAvPlxuXHRcdH0pO1xuXHRcdHZhciBzZWxlY3RlZEl0ZW1zID0gdGhpcy5wcm9wcy5pdGVtcy5maWx0ZXIoZnVuY3Rpb24oaXRlbSxpbmRleCl7XG5cdFx0XHRcdHJldHVybiAoc2VsZi5zdGF0ZS5zZWxlY3RlZC5pbmRleE9mKGluZGV4KT4tMSk7XG5cdFx0fSk7XG5cdFx0IC8vIHZhciBkaXNwbGF5VGV4dCA9IChzZWxlY3RlZEl0ZW1zLmxlbmd0aCA9PT0gc2VsZi5wcm9wcy5pdGVtcy5sZW5ndGggPyBcIkFsbCBcIiArIHNlbGYucHJvcHMubGFiZWwgOiAoKHNlbGVjdGVkSXRlbXMubGVuZ3RoID4gMCkgPyAoc2VsZWN0ZWRJdGVtcy5sZW5ndGggPiAxID8gc2VsZWN0ZWRJdGVtcy5sZW5ndGggK1wiIFwiICtzZWxmLnByb3BzLmxhYmVsIDogc2VsZWN0ZWRJdGVtc1swXVtzZWxmLnByb3BzLmRpc3BsYXlfZmllbGRdKSA6IHNlbGYucHJvcHMubGFiZWwpKTtcblx0XHR2YXIgZGlzcGxheVRleHQgPSAoc2VsZWN0ZWRJdGVtcy5sZW5ndGggPT09IHNlbGYucHJvcHMuaXRlbXMubGVuZ3RoID8gXCJBbGwgXCIgKyBzZWxmLnByb3BzLmxhYmVsIDogKChzZWxlY3RlZEl0ZW1zLmxlbmd0aCA+IDApID8gKHNlbGVjdGVkSXRlbXMubGVuZ3RoID4gMSA/IHNlbGVjdGVkSXRlbXMubGVuZ3RoICtcIiBcIiArc2VsZi5wcm9wcy5sYWJlbCA6IHNlbGVjdGVkSXRlbXNbMF1bc2VsZi5wcm9wcy5kaXNwbGF5X2ZpZWxkXSkgOiBzZWxmLnByb3BzLmxhYmVsKSk7XG5cdFx0cmV0dXJuICA8ZGl2IGNsYXNzTmFtZT17XCJtdWx0aXNlbGVjdCBcIitzZWxmLnByb3BzLm5hbWV9IG9uQ2xpY2s9e3NlbGYuaGFuZGxlQ2xpY2t9PlxuXHRcdFx0XHRcdDxwPlxuXHRcdFx0XHRcdFx0PHNwYW4+e3RoaXMucHJvcHMuY2hpbGRyZW59IDwvc3Bhbj57ZGlzcGxheVRleHR9XG5cdFx0XHRcdFx0PC9wPlxuXHRcdFx0XHQ8dWwgY2xhc3NOYW1lPXtzZWxmLnN0YXRlLm9wZW4/XCJtdWx0aXNlbGVjdC1tZW51IG9wZW5cIiA6XCJtdWx0aXNlbGVjdC1tZW51IGNsb3NlXCJ9ID5cblx0XHRcdFx0PGxpIGNsYXNzTmFtZT1cIm11bHRpc2VsZWN0LWl0ZW0gc2VsZWN0LWFsbFwiIG9uQ2xpY2s9e3NlbGYuX3NlbGVjdEFsbH0+XG5cdFx0XHRcdFx0XHRTZWxlY3QgQWxsXG5cdFx0XHRcdFx0PC9saT5cblx0XHRcdFx0e2Ryb3Bkb3duSXRlbXN9XG5cdFx0XHRcdDwvdWw+XG5cdFx0XHRcdDwvZGl2Pjtcblx0fVxufSk7XG5cblxuIG1vZHVsZS5leHBvcnRzID0gTXVsdGlTZWxlY3Q7XG4iXX0=