/**
 * rashidGrid | It is used to apply, row selection, deletion, pagination, sorting, filtering on Table-List
 * @author: Muhammad Rashid Hussain
 * 
 * @version: 0.1.0
 * @prerqusites: jQuery lib 
 */

(function($) {
	var RashidGrid = function(element, options){

		var rgElement = $(element);
		var rgObj = this;
		var _rowBeforSelectionStyle = [];
		var _selectedRowCss = '.rGirdSelectedRow';
		var _selectedRowsElmt = $(_selectedRowCss);
		var _bodyRowData = new Array();
		

		//***Default Options.
		var defaultOptions = {
		    fltrContainer: '#rGridfltrContainer',
		    tblContainer: '#rGridTblContainer',
		    tblHeadContainer: '#rGridTblHeaderContainer',
		    tblHeadRow: '.rGridHeadRow',
		    tblHeadRowClr: '#999',
		    tblBodyContainer: '#rGridTblBodyContainer',
		    tblBodyRowClassName: '.rGridBodyRows',
		    tblBodyRowOdd: '#fff',
		    tblBodyRowEven: '#98B8D7',
		    isApplyOddEvenColor: true,
		    tblBodySelectedRowColor: '#325E89',
		    isRowSelectionRequired: true,
		    isFilterOn: true,
		    isSortingOn: true,
		    isScrollingOn: true,
			filterFieldsClassName: '.rGridFilterFields',
			columsClassName: '.rGridCols',
			setBodyRowData: function(data){
				// this._bodyRowData = data;
				this.setSelectedRowsData(data);
			},
			beforeCreate: function(){

			},
			_create: function(s) {

				if(s.isApplyOddEvenColor){
					applyOddEvenStyle();
				}
			},
			getSelectedRowsData: function(){
		        return rgObj.getSelectedRowsData()
		    },
		    setValue: function(val){
		        this._value = val;
		    }
		};


		//overwirte default options with user provided opions
        var settings = $.extend(defaultOptions, options || {} );
	   

	   //local Variables deleration 
		var s = settings;
		var _tblBodyRowElements = $(s.tblBodyRowClassName);


		s.tblBodyRowOdd = s.tblBodyRowOdd.toLowerCase();
		s.tblBodyRowEven = s.tblBodyRowEven.toLowerCase();
		s.tblBodySelectedRowColor = s.tblBodySelectedRowColor.toLowerCase();


		/**
		 * applyOddEvenStyle | This function will apply odd/even row styling
		 * 
		 */
		var applyOddEvenStyle = function() {
			_tblBodyRowElements.each(function(i,e){
				$(e).css('cursor','pointer');
				if(i % 2){
					$(e).css('background-color',s.tblBodyRowEven);
				}else{
					$(e).css('background-color',s.tblBodyRowOdd);
				}
			});
		};



		/**
		 * hexColor | get hax color for rbg-color
		 * @param colorval 
		 * 
		 */
		var hexColor = function(colorval) {
		    var parts = colorval.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
		    delete(parts[0]);
		    for (var i = 1; i <= 3; ++i) {
		        parts[i] = parseInt(parts[i]).toString(16);
		        if (parts[i].length == 1) parts[i] = '0' + parts[i];
		    }
		    color = '#' + parts.join('');
		    return color;
		};



		/**
		 * executeOnClickOfGridBodyRow | This function will execute during row-click
		 * @param e | clicked element 
		 * @param eInx | index of clicked element 
		 */
		var executeOnClickOfGridBodyRow = function(e, eInx) {
			var rSlctdClr = s.tblBodySelectedRowColor;
        	var eStyle = e.attr('style');
        	if(typeof eStyle != 'undefined' && eStyle.indexOf('background-color') !== -1 ){
        		var rowCurrentStyle = e.css('background-color');
        		if(rowCurrentStyle != ''){
        			rowCurrentStyle = rowCurrentStyle.toLowerCase();
        		}
        		
        		if(rowCurrentStyle.indexOf('#') === -1){
        			rowCurrentStyle = hexColor(rowCurrentStyle).toLowerCase();
        		}

        		if(s.isApplyOddEvenColor ){
        			if(rowCurrentStyle.indexOf(s.tblBodyRowOdd) !== -1 ){
						e.css('background-color', rSlctdClr);
						e.addClass(_selectedRowCss);
						pushSelectedRowsData(e,eInx);

						_rowBeforSelectionStyle[eInx] = s.tblBodyRowOdd;
        			}else if (rowCurrentStyle.indexOf(s.tblBodyRowEven) !== -1 ){
        				e.css('background-color', rSlctdClr);
        				e.addClass(_selectedRowCss);
						pushSelectedRowsData(e,eInx);

						_rowBeforSelectionStyle[eInx] = s.tblBodyRowEven;
        			}else{
        				e.css('background-color', _rowBeforSelectionStyle[eInx]);
        				e.removeClass(_selectedRowCss);
        				popSelectedRowsData(eInx);
        			}
        		}else{
        			e.css('background-color', "");
        			e.removeClass(_selectedRowCss);
        			popSelectedRowsData(eInx);
        		}
				
        	}else{
	        	e.css('background-color',rSlctdClr);
	        	e.addClass(_selectedRowCss);
	        	pushSelectedRowsData(e,eInx);
        	}
		};


		/**
		 * popSelectedRowsData |  It is used to pop the data from unselected-Row
		 * @param rI | rI is an current row-Index which is going to unselected
		 *
		 */
		var popSelectedRowsData = function(rI){
			var rowLength = _bodyRowData.length;
			var rowDataObjArr = _bodyRowData;
			for (var i = 0; i < rowLength; i++) {
				if(rowDataObjArr[i].rowIndex === rI){
					_bodyRowData.splice(i,1);
					break;
				}
			};
		}

		/**
		 * pushSelectedRowsData |  It is used to push data into selected-Row
		 * @param e | e is an current row element which is going to select
		 * @param rI | rI is an current row-Index which is going to select
		 *
		 */
		var pushSelectedRowsData = function(e,rI){
			var data = e.data();
			var obj = {};
			data.rowIndex = rI;
			obj = data;
			_bodyRowData.push(obj);
		}

		// Public method - can be called from client code
		this.publicMethod = function(){
		   console.log('public method called!');
		};

		// Private method - can only be called from within this object
		var privateMethod = function(){
		   console.log('private method called!');
		};

		/**
		 * getSelectedRowsData |  It is Public method which is used to get data of the selected rows
		 * 
		 */
		this.getSelectedRowsData = function(){
			console.log('getSelectedRowsData method called!');
			return _bodyRowData;
		};



		/**
		 * setSelectedRowsData |  It is Public method which is used to set data of the rows and make selection of the rows
		 * @param data | data: [{rowIdex: 1, id: 109, type: 'ABC', status: '1', etc....}]
		 *
		 */
		this.setSelectedRowsData = function(data){
			_tblBodyRowElements.each(function(i,e){
				for (var k  in data) {
					if(data[k].rowIndex === i){
						executeOnClickOfGridBodyRow($(e), i);
					}
				};
			});
			console.log('setSelectedRowsData method called!');
		};



		/**
		 * unselectAllRows |  It is Public method which is used to unselect all selected rows
		 *
		 */
		this.unselectAllRows = function(){
			_tblBodyRowElements.each(function(i,e){
				var el = $(e);
				if(el.hasClass(_selectedRowCss)){
					executeOnClickOfGridBodyRow(el, i);
				}
			});
			console.log('unselectAllRows method called!');
		};



		/**
		 * unselectedAllRows |  It is Public method which is used to unselect all selected rows
		 *
		 */
		this.selectAllRows = function(){
			rgObj.unselectAllRows();

			_tblBodyRowElements.each(function(i,e){
				executeOnClickOfGridBodyRow($(e), i);
			});

			console.log('selectAllRows method called!');
		};


		/**
		 * Table-Body-Row Click Event Perform here
		 */
        $(s.tblContainer).on('click', s.tblBodyRowClassName, function(){
        	var e = $(this);
        	var eInx = e.index();
        	executeOnClickOfGridBodyRow(e, eInx);
        });



		/**
		 * Execute Functions Here
		 */
		s.beforeCreate();
		s._create(s);


	};

	$.fn.rashidGrid = function(options){
		return this.each(function(){
		   var element = $(this);
		  
		   // Return early if this element already has a plugin instance
		   if (element.data('rashidGrid')) return;

		   // pass options to plugin constructor
		   var rashidGrid = new RashidGrid(this, options);


		   // Store plugin object in this element's data
		   element.data('rashidGrid', rashidGrid);
		});
	};
})(jQuery);