<!DOCTYPE html>
<html>
<head>
	<title></title>
	<script type="text/javascript" src="../jquery-2.1.4.js"></script>
	<script type="text/javascript" src="rashidGrid-0.1.0.js"></script>
	<style type="text/css">

		/* Head Row styles */
		#rGridTblHeaderContainer ul{
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
		.rGridHeadRow ul li{
			line-height: 30px;
			float: left;
			padding: 2px;
			display: block;
			width: 10%;
			min-height: 30x; 
			height: 35px;
		}

		/* Body Row styles */
		#rGridTblBodyContainer ul{
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
		.rGridBodyRows ul li{
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
	<div id="mainContainerDiv">

		<div id="rGridfltrContainer">
			
		</div>

		<div id="rGridTblContainer">

			<div id="rGridTblHeaderContainer">
				<ul>

					<li class="rGridHeadRow">
						<ul >
							<li>Sr.</li>
							<li>Name </li>
							<li>Type</li>
							<li>Status</li>
							<li>Action</li>
						</ul>
					</li>

				</ul>
				
			</div>

			<div id="rGridTblBodyContainer">
				<ul>
					<li class="rGridBodyRows" data-id="109" data-type="ABC" data-status="1">
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

		window.rashid = $('#mainContainerDiv').rashidGrid().data('rashidGrid');
		window.rashid.publicMethod();
		var data = [];
		data.push({rowIndex: 1, id: 109, type: 'ABC', status: '1'});
		data.push({rowIndex: 4, id: 256, type: 'DFE', status: '1'});
		window.rashid.setSelectedRowsData(data);
		window.rashid.getSelectedRowsData();
	})
	</script>
</body>
</html>