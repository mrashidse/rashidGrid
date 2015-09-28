/**
 * rashidGrid | It is used to apply, row selection, deletion, pagination, sorting, filtering on Table-List
 * @author: Muhammad Rashid Hussain
 *
 * @version: 0.1.0
 * @prerqusites: jQuery lib
 */




 /****************************************************** [ Start sortElements ] ***********************************************************/
  /**
 * jQuery.fn.sortElements
 * --------------
 * @author James Padolsey (http://james.padolsey.com)
 * @version 0.11
 * @updated 18-MAR-2010
 * --------------
 * @param Function comparator:
 *   Exactly the same behaviour as [1,2,3].sort(comparator)
 *   
 * @param Function getSortable
 *   A function that should return the element that is
 *   to be sorted. The comparator will run on the
 *   current collection, but you may want the actual
 *   resulting sort to occur on a parent or another
 *   associated element.
 *   
 *   E.g. $('td').sortElements(comparator, function(){
 *      return this.parentNode; 
 *   })
 *   
 *   The <td>'s parent (<tr>) will be sorted instead
 *   of the <td> itself.
 */
jQuery.fn.sortElements = (function(){
    
    var sort = [].sort;
    
    return function(comparator, getSortable) {
        
        getSortable = getSortable || function(){return this;};
        
        var placements = this.map(function(){
            
            var sortElement = getSortable.call(this),
                parentNode = sortElement.parentNode,
                
                // Since the element itself will change position, we have
                // to have some way of storing it's original position in
                // the DOM. The easiest way is to have a 'flag' node:
                nextSibling = parentNode.insertBefore(
                    document.createTextNode(''),
                    sortElement.nextSibling
                );
            
            return function() {
                
                if (parentNode === this) {
                    throw new Error(
                        "You can't sort elements if any one is a descendant of another."
                    );
                }
                
                // Insert before flag:
                parentNode.insertBefore(this, nextSibling);
                // Remove flag:
                parentNode.removeChild(nextSibling);
                
            };
            
        });
       
        return sort.call(this, comparator).each(function(i){
            placements[i].call(getSortable.call(this));
        });
        
    };
    
})();
/****************************************************** [ End sortElements ] ***********************************************************/



/******************************************************* [ Start RashidGrid ] **********************************************************/

(function($) {
    var RashidGrid = function(win, doc, element, options) {

        /**
         * Constant Variable
         */
        var SORT_UP = 'ASC';
        var SORT_DOWN = 'DESC';


        var W = win;
        var D = doc;
        var rgElement = $(element);
        var rgObj = this;
        var _selectedRowCss = '.rGirdSelectedRow';
        var _selectedRowsElmt = $(_selectedRowCss);
        var _bodyRowData = new Array();
        var _colCssName = '.rGridHeadCols';
        var _rColTag = 'ul li';
        var _sortType = SORT_UP;

        W._rowBeforSelectionStyle = [];



        //***Default Options.
        var defaultOptions = {
            fltrContainer: '.rGridfltrContainer',
            tblContainer: '.rGridTblContainer',
            tblHeadContainer: '.rGridTblHeaderContainer',
            tblHeadRow: '.rGridHeadRow',
            tblHeadRowClr: '#999',
            tblBodyContainer: '.rGridTblBodyContainer',
            tblBodyRowClassName: '.rGridBodyRows',
            // tblBodyRowColContainer: 'ul li',
            tblBodyRowColContainer: 'td',
            tblBodyRowOdd: '#fff',
            tblBodyRowEven: '#98B8D7',
            isApplyOddEvenColor: true,
            tblBodySelectedRowColor: '#325E89',
            isRowSelectionRequired: true,
            isFilterOn: true,
            isSortingOn: true,
            isScrollingOn: true,
            filterFieldsClassName: '.rGridFilterFields',
            hColCssName: _colCssName,
            rowColContainingTag: _rColTag,
            isAjaxSorting: false,
            bodyRowData: null,
            beforeInitialize: function() {

            },
            getSelectedRowsData: function() {
                return rgObj.getSelectedRowsData()
            },
            setValue: function(val) {
                this._value = val;
            }
        };


        //overwirte default options with user provided opions
        var settings = $.extend(defaultOptions, options || {});


        //local Variables deleration 
        var s = settings;
        // var _tblHeadRowElement = $(s.tblHeadRow);
        // var _tblBodyRowElements = $(s.tblBodyContainer+' '+s.tblBodyRowClassName);
        // var _tblHeadRowColsElement = $(s.tblHeadRow + ' ' + s.hColCssName);
        var _tblHeadRowElement = rgElement.find(s.tblHeadContainer + ' ' + s.tblHeadRow);
        var _tblBodyElement = rgElement.find(s.tblBodyContainer);
        var _tblBodyRowElements = rgElement.find(s.tblBodyContainer + ' ' + s.tblBodyRowClassName);
        var _tblHeadRowColsElement = rgElement.find(s.tblHeadContainer + ' ' + s.tblHeadRow + ' ' + s.hColCssName);
        _colCssName = s.hColCssName;

        s.tblBodyRowOdd = s.tblBodyRowOdd.toLowerCase();
        s.tblBodyRowEven = s.tblBodyRowEven.toLowerCase();
        s.tblBodySelectedRowColor = s.tblBodySelectedRowColor.toLowerCase();
        _rColTag = s.rowColContainingTag;

        /**
         * applyOddEvenStyle | This function will apply odd/even row styling
         *
         */
        var applyOddEvenStyle = function() {
            _tblBodyRowElements.each(function(i, e) {
                $(e).css('cursor', 'pointer');
                if (i % 2) {
                    $(e).css('background-color', s.tblBodyRowEven);
                } else {
                    $(e).css('background-color', s.tblBodyRowOdd);
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
            if (typeof eStyle != 'undefined' && eStyle.indexOf('background-color') !== -1) {
                var rowCurrentStyle = e.css('background-color');
                if (rowCurrentStyle != '') {
                    rowCurrentStyle = rowCurrentStyle.toLowerCase();
                }

                if (rowCurrentStyle.indexOf('#') === -1) {
                    rowCurrentStyle = hexColor(rowCurrentStyle).toLowerCase();
                }

                if (s.isApplyOddEvenColor) {
                    if (rowCurrentStyle.indexOf(s.tblBodyRowOdd) !== -1) {
                        e.css('background-color', rSlctdClr);
                        e.addClass(_selectedRowCss);
                        pushSelectedRowsData(e, eInx);

                        W._rowBeforSelectionStyle[eInx] = s.tblBodyRowOdd;
                    } else if (rowCurrentStyle.indexOf(s.tblBodyRowEven) !== -1) {
                        e.css('background-color', rSlctdClr);
                        e.addClass(_selectedRowCss);
                        pushSelectedRowsData(e, eInx);

                        W._rowBeforSelectionStyle[eInx] = s.tblBodyRowEven;
                    } else {
                        e.css('background-color', W._rowBeforSelectionStyle[eInx]);
                        e.removeClass(_selectedRowCss);
                        popSelectedRowsData(eInx);
                    }
                } else {
                    e.css('background-color', "");
                    e.removeClass(_selectedRowCss);
                    popSelectedRowsData(eInx);
                }

            } else {
                e.css('background-color', rSlctdClr);
                e.addClass(_selectedRowCss);
                pushSelectedRowsData(e, eInx);
            }
        };


        /**
         * popSelectedRowsData |  It is used to pop the data from unselected-Row
         * @param rI | rI is an current row-Index which is going to unselected
         *
         */
        var popSelectedRowsData = function(rI) {
            var rowLength = _bodyRowData.length;
            var rowDataObjArr = _bodyRowData;
            for (var i = 0; i < rowLength; i++) {
                if (rowDataObjArr[i].rowIndex === rI) {
                    _bodyRowData.splice(i, 1);
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
        var pushSelectedRowsData = function(e, rI) {
            var data = e.data();
            var obj = {};
            data.rowIndex = rI;
            obj = data;
            _bodyRowData.push(obj);
        }

        // Public method - can be called from client code
        this.publicMethod = function() {
            console.log('public method called!');
        };

        // Private method - can only be called from within this object
        var privateMethod = function() {
            console.log('private method called!');
        };

        /**
         * getSelectedRowsData |  It is a method which is used to get data of the selected rows
         *
         */
        var _getSelectedRowsData = function() {
            return _bodyRowData;
        };


        /**
         * setSelectedRowsData |  It is Public method which is used to set data of the rows and make selection of the rows
         * @param data | data: [{rowIdex: 1, id: 109, type: 'ABC', status: '1', etc....}]
         *
         */
        var _setSelectedRowsData = function(data) {
            _tblBodyRowElements.each(function(i, e) {
                for (var k in data) {
                    if (data[k].rowIndex === i) {
                        executeOnClickOfGridBodyRow($(e), i);
                    }
                };
            });
        };


        /**
         * _unselectAllRows |  It is a method which is used to unselect all selected rows
         *
         */
        var _unselectAllRows = function() {
            _tblBodyRowElements.each(function(i, e) {
                var el = $(e);
                if (el.hasClass(_selectedRowCss)) {
                    executeOnClickOfGridBodyRow(el, i);
                }
            });
        };

        /**
         * getSelectedRowsData |  It is Public method which is used to get data of the selected rows
         *
         */
        this.getSelectedRowsData = function() {
            console.log('getSelectedRowsData method called!');
            _getSelectedRowsData();
        };


        /**
         * setSelectedRowsData |  It is Public method which is used to set data of the rows and make selection of the rows
         * @param data | data: [{rowIdex: 1, id: 109, type: 'ABC', status: '1', etc....}]
         *
         */
        this.setSelectedRowsData = function(data) {
            console.log('setSelectedRowsData method called!');
            _setSelectedRowsData(data);
        };


        /**
         * unselectAllRows |  It is Public method which is used to unselect all selected rows
         *
         */
        this.unselectAllRows = function() {
            _unselectAllRows()
            console.log('unselectAllRows method called!');
        };



        /**
         * unselectedAllRows |  It is Public method which is used to unselect all selected rows
         *
         */
        this.selectAllRows = function() {
            _unselectAllRows();

            _tblBodyRowElements.each(function(i, e) {
                executeOnClickOfGridBodyRow($(e), i);
            });

            console.log('selectAllRows method called!');
        };

        /**
         * _manageSortingCols |
         *
         */
        var _manageSortingCols = function(elment, i) {
            var colSortName = elment.data('col-name');
            var colSortType = elment.data('sort-type');
            var sortableCol = elment.data('sortable');
            console.log(elment.data('sort-type'));
            if (typeof sortableCol !== 'undefined' && Boolean(sortableCol) === true) {
	            //SortType Settings
	            if (typeof colSortType === 'undefined') {
	            	colSortType = SORT_UP;
	            	elment.data('sort-type', SORT_DOWN);
	            }else{
	                colSortType = colSortType.toUpperCase();
	                switch (colSortType) {
	                    case SORT_UP:
	                        elment.data('sort-type', SORT_DOWN);
	                        break;
	                    case SORT_DOWN:
	                        elment.data('sort-type', SORT_UP);
	                        break;
	                    default:
	                        elment.data('sort-type', _sortType);
	                        break
	                }
	            }

	            //Start Sorting

	            // _unselectAllRows();
	            //apply odd/even style
	            if (s.isApplyOddEvenColor) {
	                // applyOddEvenStyle();
	            }

	            if (s.isAjaxSorting) {
	            	if (typeof colSortName !== 'undefined' && colSortName !== '') {

	            	}
                }else{
                	sortOnClientSide(elment, i,colSortType);
                }
                console.log(_bodyRowData);
            }
        };

        /**
         * sortOnClientSide |
         *
         */
        var sortOnClientSide = function(elm, i, colSortType) {
            var tableBody = _tblBodyElement;
            var rowCol = tableBody.find(s.tblBodyRowColContainer);

            var col = elm;
            var colIndex = col.index();
            var inverse;
            if (colSortType === SORT_DOWN) {
				inverse = true;
            }else if (colSortType === SORT_UP) {
            	inverse = false;
            }
            rowCol.filter(function() {
                return $(this).index() === colIndex;
            }).sortElements(function(a, b) {
                return $.text([a]) > $.text([b]) ? (inverse ? -1 : 1) : (inverse ? 1 : -1);
            }, function() {
                // parentNode is the element we want to move
                return this.parentNode;
            });
        };


        /**
         * _eventsBindings |  This method will manage events bindings
         *
         */
        var _eventsBindings = function() {
            /**
             * Table-Head-Row-Col Click Event Perform here (This is hanlde sorting functionality)
             */
            $(rgElement).on('click', s.hColCssName, function() {
                var e = $(this);
                var eInx = e.index();
                _manageSortingCols(e, eInx);
            });


            /**
             * Table-Body-Row Click Event Perform here
             */
            $(rgElement).on('click', s.tblBodyRowClassName, function() {
                var e = $(this);
                var eInx = e.index();
                executeOnClickOfGridBodyRow(e, eInx);
            });
        };
        /*
		

		/**
		 * _beforeInitialize |  This method will manage events bindings
		 *
		 */
        var _beforeInitialize = function() {
            s.beforeInitialize();
        };


        /**
         * _initialize |  This method will create the pluging core functions
         *
         */
        var _initialize = function() {
            _beforeInitialize();

            //apply odd/even style
            if (s.isApplyOddEvenColor) {
                applyOddEvenStyle();
            }

            //event bindings
            _eventsBindings();

            //Set Selected-Rows Data
            if (s.bodyRowData !== null) {
                _setSelectedRowsData(s.bodyRowData);
            }
        };



        /**
         * Execute Functions Here
         */
        _initialize();

    };

    $.fn.rashidGrid = function(options) {
        return this.each(function() {
            var element = $(this);

            // Return early if this element already has a plugin instance
            if (element.data('rashidGrid')) return;

            // pass options to plugin constructor
            var rashidGrid = new RashidGrid(window, document, this, options);


            // Store plugin object in this element's data
            element.data('rashidGrid', rashidGrid);
        });
    };
})(jQuery);