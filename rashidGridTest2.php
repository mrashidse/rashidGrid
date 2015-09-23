<!-- In This file we wil create list-table with regular <table> -->
<!DOCTYPE html>
<html>
	<head>
		<title></title>
		<script type="text/javascript" src="../jquery-2.1.4.js"></script>
		<script type="text/javascript" src="rashidGrid-0.1.0.js"></script>
		<style type="text/css">
			/* Head Row styles */
			table{
				width: 100%;
			}
			.rGridTblHeaderContainer thead, ul{
				list-style: none;
				margin: 0;
				padding: 0;
			}
			.rGridHeadRow{
				/*display: block;*/
				padding:0;
				margin:0;
				float: left;
				height: 35px;
				width: 100%;
				background-color: #929292
			}
			.rGridHeadRow th, ul li{
				line-height: 30px;
				float: left;
				padding: 2px;
				display: block;
				width: 10%;
				min-height: 30x;
				height: 35px;
			}
			/* Body Row styles */
			.rGridTblBodyContainer ul{
				list-style: none;
				margin: 0;
				padding: 0;
			}
			.rGridBodyRows{
				/*display: block;*/
				padding:0;
				margin:0;
				float: left;
				height: 35px;
				width: 100%;
			}
			.rGridBodyRows td, ul li{
				line-height: 30px;
				float: left;
				padding: 2px;
				display: block;
				width: 10%;
				min-height: 30x;
				height: 35px;
			}
			.clr{
				clear: both;
			}
		</style>
	</head>
	<body>
		<h1>Table 1 Demo With Table(&lt;table&gt;) Structure</h1>
		<div class="mainContainerDiv" style="margin-bottom: 100px;">
			<div class="rGridfltrContainer">
				
			</div>
			<div>
				<div class="rGridTblContainer">
					<table>
						<thead class="rGridTblHeaderContainer">
							<tr class="rGridHeadRow">
								<th class="rGridCols" data-col-name="" col-type="sr.">Sr.</th>
								<th class="rGridCols" data-col-name="Name" data-sort-type="ASC" col-type="listData">Name</th>
								<th class="rGridCols" data-col-name="Type" data-sort-type="ASC" col-type="listData">Type</th>
								<th class="rGridCols" data-col-name="Status" data-sort-type="ASC" col-type="listData">Status</th>
								<th class="rGridCols" data-col-name="" col-type="action">Action</th>
							</tr>
						</thead>
						<tbody class="rGridTblBodyContainer">
							<tr class="rGridBodyRows" data-id="109" data-type="ABC" data-status="1">
								<td>1</td>
								<td>Ali</td>
								<td>Teacher</td>
								<td>Active</td>
								<td>View | Edit | Delete</td>
							</tr>
							<tr class="rGridBodyRows" data-id="109" data-type="ABC" data-status="1">
								<td>2</td>
								<td>Baali Khan</td>
								<td>Teacher</td>
								<td>Active</td>
								<td>View | Edit | Delete</td>
							</tr>
							<tr class="rGridBodyRows" data-id="109" data-type="ABC" data-status="1">
								<td>3</td>
								<td>Rizvi</td>
								<td>Student</td>
								<td>Active</td>
								<td>View | Edit | Delete</td>
							</tr>
							<tr class="rGridBodyRows" data-id="109" data-type="ABC" data-status="1">
								<td>4</td>
								<td>Akhter</td>
								<td>Student</td>
								<td>Active</td>
								<td>View | Edit | Delete</td>
							</tr>
							<tr class="rGridBodyRows" data-id="109" data-type="ABC" data-status="1">
								<td>5</td>
								<td>Atif</td>
								<td>Student</td>
								<td>Active</td>
								<td>View | Edit | Delete</td>
							</tr>
							<tr class="rGridBodyRows" data-id="109" data-type="ABC" data-status="1">
								<td>7</td>
								<td>Suffy</td>
								<td>Teacher</td>
								<td>Active</td>
								<td>View | Edit | Delete</td>
							</tr>
						</tbody>
						<tfoot>
						<tr>
							<td colspan="4"></td>
						</tr>
						</tfoot>
					</table>
				</div>
			</div>
		</div>
		<h1>Table 2 Demo With List(&lt;li&gt;) Structure </h1>
		<div class="mainContainerDiv">
			<div class="rGridfltrContainer">
				
			</div>
			<div class="rGridTblContainer">
				
				<div class="rGridTblBodyContainer">
					<ul>
						<li class="rGridHeadRow">
							<ul>
								<li>1</li>
								<li>Atif Ali</li>
								<li>Student</li>
								<li>Active</li>
								<li>View | Edit | Delete</li>
							</ul>
						</li>
						<li class="rGridBodyRows clr" data-id="256" data-type="DFE" data-status="1">
							<ul>
								<li>2</li>
								<li>Rameez Khan</li>
								<li>Student</li>
								<li>Active</li>
								<li>View | Edit | Delete</li>
							</ul>
						</li>
						<li class="rGridBodyRows clr" data-id="343" data-type="DFE" data-status="1">
							<ul>
								<li>3</li>
								<li>Kaleem Bajwa</li>
								<li>Student</li>
								<li>Inactive</li>
								<li>View | Edit | Delete</li>
							</ul>
						</li>
						<li class="rGridBodyRows clr" data-id="344" data-type="DFE" data-status="1">
							<ul>
								<li>4</li>
								<li>Yakoob Bajwa</li>
								<li>Student</li>
								<li>Inactive</li>
								<li>View | Edit | Delete</li>
							</ul>
						</li>
						
						<li class="rGridBodyRows clr" data-id="347" data-type="DFE" data-status="1">
							<ul>
								<li>5</li>
								<li>Kaleem Bajwa</li>
								<li>Student</li>
								<li>Active</li>
								<li>View | Edit | Delete</li>
							</ul>
						</li>
						
						
						<li class="rGridBodyRows clr" data-id="543" data-type="DFE" data-status="0">
							<ul>
								<li>6</li>
								<li>Rana Kaiser</li>
								<li>Student</li>
								<li>Active</li>
								<li>View | Edit | Delete</li>
							</ul>
						</li>
						
						<li class="rGridBodyRows clr" data-id="564" data-type="DFE" data-status="0">
							<ul>
								<li>7</li>
								<li>Rizan Aftaab</li>
								<li>Student</li>
								<li>Inactive</li>
								<li>View | Edit | Delete</li>
							</ul>
						</li>
					</ul>
					
				</div>
			</div>
		</div>
		<script type="text/javascript">
		$(document).ready(function(){
			var data = [];

			
			data.push({rowIndex: 1, id: 109, type: 'ABC', status: '1'});
			data.push({rowIndex: 4, id: 256, type: 'DFE', status: '1'});
			// window.rashid = $('.mainContainerDiv').rashidGrid({bodyRowData: data}).data('rashidGrid');
			// window.rashid.publicMethod();
			
			// window.rashid.setSelectedRowsData(data);
			// window.rashid.getSelectedRowsData();

			$('.mainContainerDiv').rashidGrid({bodyRowData: data});
		})
		//**************************
		$(document).on('click', 'th.static-tbl-sort', function () {
		
		});
		function comparer(index) {
		return function (a, b) {
		var valA = getCellValue(a, index), valB = getCellValue(b, index)
		return $.isNumeric(valA) && $.isNumeric(valB) ? valA - valB : valA.localeCompare(valB)
		}
		}
		function getCellValue(row, index) {
		return $(row).children('td').eq(index).html()
		}
		</script>
	</body>
</html>