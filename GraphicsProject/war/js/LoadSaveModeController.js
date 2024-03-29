function LoadSaveController ()
{
	var lsc = this;

	function dragEnter(evt)
	{
		evt.preventDefault();
//		$(".dndZone").addClass("dragEvent");
//		console.debug("drag enter");  
	}
	
	function imagefile(e, f){
		var image = new Image();
		image.src = f.result;
		$('.dialog_images').append(image);
		console.debug(image);
	}
	function dragDrop(evt)
	{
		evt.preventDefault();
		
		var files = evt.target.files || evt.dataTransfer.files;
		// process all File objects
		
		for (var i = 0, f; f = files[i]; i++) {
			var reader = new FileReader();
			reader.onload = function (e) {
				var image = new Image();
				image.src = e.target.result;
				$('.dialog_images').append(image);
				$(image).click(function(){
					var img = this; // Get my img elem
					var pic_real_width, pic_real_height;
					$("<img/>") // Make in memory copy of image to avoid css issues
					    .attr("src", $(img).attr("src"))
					    .load(function() {
					    	appController.webGL2D.onChangeImageLoad(image, this.width, this.height);
					    });
					$('.selectImageDialog').dialog("close");
				});
			};
			reader.readAsDataURL(f);
		}
		//appController.newImg(evt.srcElement);
	}
	function dragExit(evt)
	{
		evt.preventDefault();
//		$(".dndZone").removeClass("dragEvent");
		console.debug("drag exit");
		//alert("drag exit");
	}
	function dragOver(evt)
	{
		evt.preventDefault();
		//alert("drag over");
	}

	this.dragAndDrop = function()
	{
		var cell = $('.cell')[0];
		var html = $('html')[0];
		cell.addEventListener("dragenter",dragEnter, false);
		cell.addEventListener("dragleave",dragExit, false);
		cell.addEventListener("dragover",dragOver, false);
		cell.addEventListener("drop",dragDrop, false);
	}

	this.loadImageDialog = function()
	{ 
		$('.selectImageDialog').dialog({
			autoOpen: true,
			width: 750,
			modal: true,
			title: "Load Image"
		});
	}
	this.init = function(){
		this.addImagesToDialogBox();
		$('button').button();
		$('button.load').click(function(){
			lsc.loadImageDialog();
		});
		$('button.save').click(function(){
			var url = appController.webGL2D.getDownloadURL();
			window.location = url;
		});
		$('.selectImageDialog img').click(function(){
			var img = $(this).attr('src').replace('sampleLD/','sampleHD/');
			appController.webGL2D.changePhoto(img);
			$('.selectImageDialog').dialog("close");
		});
		$('button.3dview').click(function(){
			//If we are in the 2D mode
			if(appController.mode == 0)
				$('button.3dview span').text('2D Mode')
				else
					$('button.3dview span').text('3D Mode');
			appController.togleMode();
			appController.mode
		});
		this.dragAndDrop();
	}

	this.addImagesToDialogBox = function(){
		for(var i=1;i<23;++i)
		{
			var img = new Image();
			if(i < 10)
				img.src = "images/sampleLD/sample_pic_0"+i+".jpg";
			else
				img.src = "images/sampleLD/sample_pic_"+i+".jpg";
			$('.dialog_images').append(img)
		}
	}
	this.init();
}

function readURL(input) {
	if (input.files && input.files[0]) {
		var reader = new FileReader();
		reader.onload = function (e) {
			var image = new Image();
			image.src = e.target.result;
			$('.dialog_images').append(image);
			$(image).click(function(){
				var img = this; // Get my img elem
				var pic_real_width, pic_real_height;
				$("<img/>") // Make in memory copy of image to avoid css issues
				    .attr("src", $(img).attr("src"))
				    .load(function() {
				    	appController.webGL2D.onChangeImageLoad(image, this.width, this.height);
				    });
				$('.selectImageDialog').dialog("close");
			});
		};

		reader.readAsDataURL(input.files[0]);
	}
}