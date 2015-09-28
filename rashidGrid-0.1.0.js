/**
 * rashidGrid | It is used to apply, row selection, deletion, pagination, sorting, filtering on Table-List
 * @author: Muhammad Rashid Hussain
 *
 * @version: 0.1.0
 * @prerqusites: jQuery lib
 */

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
        var _colCssName = '.rGridCols';
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
        var _tblHeadRowElement = rgElement.find(s.tblHeadContainer+' '+s.tblHeadRow);
        var _tblBodyRowElements = rgElement.find(s.tblBodyContainer+' '+s.tblBodyRowClassName);
        var _tblHeadRowColsElement = rgElement.find(s.tblHeadContainer+' '+ s.tblHeadRow + ' ' + s.hColCssName);


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
         * getSelectedRowsData |  It is Public method which is used to get data of the selected rows
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
            _tblBodyRowElements.each(function(i, e) {
                var el = $(e);
                if (el.hasClass(_selectedRowCss)) {
                    executeOnClickOfGridBodyRow(el, i);
                }
            });
            console.log('unselectAllRows method called!');
        };



        /**
         * unselectedAllRows |  It is Public method which is used to unselect all selected rows
         *
         */
        this.selectAllRows = function() {
            rgObj.unselectAllRows();

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
            // _tblHeadRowColsElement.each(function(){
            var colSortName = elment.data('col-name');
            var colSortType = elment.data('sort-type');
            console.log(elment.data('sort-type'));
            if (typeof colSortType !== 'undefined') {
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
            console.log(elment.data('sort-type'));
            if (typeof colSortName !== 'undefined' && colSortName !== '') {
                if (s.isAjaxSorting) {

                } else {
                    sortOnClientSide(elment, i);
                }
            }
            // });
        };

        var sorting = function(tipTarget, className) {
            // remove defualt asc and desc class from all others;
            className.not(tipTarget).removeClass('asc');
            className.not(tipTarget).removeClass('desc');
            $('.up_arrow').show();
            $('.dwn_arrow').show();
            $('.up_arrow').not($(this)).removeClass('dwn_arrow_only');
            $('.dwn_arrow').not($(this)).removeClass('up_arrow_only');
            //****
            // $(this).find('i.up_arrow').removeClass('up_arrow');
            // $(this).find('i.dwn_arrow').removeClass('dwn_arrow');

            if (tipTarget.hasClass('asc')) {
                tipTarget.removeClass('asc');
                tipTarget.addClass('desc');
                tipTarget.find('i.up_arrow').show().addClass('dwn_arrow_only');
                tipTarget.find('i.dwn_arrow').hide();
                // $(this).find('i').removeClass('up_arrow_only').addClass('dwn_arrow_only');
            } else if ($(this).hasClass('desc')) {
                tipTarget.removeClass('desc');
                tipTarget.addClass('asc');
                tipTarget.find('i.up_arrow').hide();
                tipTarget.find('i.dwn_arrow').show().addClass('up_arrow_only');
                // $(this).find('i').removeClass('dwn_arrow_only').addClass('up_arrow_only');
            } else {
                tipTarget.addClass('asc');
                tipTarget.find('i.up_arrow').show();
                tipTarget.find('i.dwn_arrow').hide();
                // $(this).find('i').addClass('up_arrow_only').removeClass('dwn_arrow_only');
            }
        }

        /**
         * sortOnClientSide |
         *
         */
        var sortOnClientSide = function(elm, i) {
            var colSortName = elm.data('col-name');
            var colSortType = elm.data('sort-type');
            _tblBodyRowElements.each(function(j, e) {

                var el = $(e);
                el.find(_rColTag).each(function(k, eCols) {
                    // if(k === i){
                    console.log(eCols);
                    $(eCols).each(function(n, col) {
                        console.log(col.text);
                    });
                    // }
                });
            });


            //**********************
            // sorting($(this), $('.static-tbl-sort'));

            // var table = $(this).parents('table').eq(0)
            // var rows = table.find('tr:gt(0)').toArray().sort(comparer($(this).index()))

            var tableBody = $(tblBodyContainer);
            var bodyRows = table.find('tr:gt(0)').toArray().sort(comparer($(this).index()))
            this.asc = !this.asc
            if (!this.asc) {
                bodyRows = bodyRows.reverse()
            }
            for (var i = 0; i < bodyRows.length; i++) {
                if (i % 2 == 0) {
                    $(bodyRows[i]).addClass('bg');
                } else {
                    $(bodyRows[i]).removeClass('bg');
                }
                tableBody.append(bodyRows[i]);
            }
            //**********************
        };


        var comparer = function(index) {
            return function(a, b) {
                var valA = getCellValue(a, index),
                    valB = getCellValue(b, index)
                return $.isNumeric(valA) && $.isNumeric(valB) ? valA - valB : valA.localeCompare(valB)
            }
        };

        var getCellValue = function(row, index) {
            return $(row).children('td').eq(index).html()
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