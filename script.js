/*
 *	Display grid of Van Gogh thumbnails
 *	When mouse moves over thumbnail
 *	show larger image and caption
 *
 */

document.querySelector('.container').addEventListener
	('mouseover', function(e) {

	if (e.target.tagName === 'IMG') {

		// div with class 'preview' for larger image
		var figElement = document.createElement('figure');
		figElement.className = 'preview';
		// add preview div to dom
		e.target.parentNode.appendChild(figElement);

		// create img element
		var myImg = document.createElement('img');
		// get filename of thumb image
		var imgLoc = e.target.src;  

		// larger image filename is same as thumb without '100x100_tn'
		myImg.src = imgLoc.substring(0, imgLoc.length - 14) + '.jpg';

		// create figure caption
		var captionElement = document.createElement('figcaption');

		// get number of picture we're hovering over
		var pictureNum = e.target.parentNode.dataset.pict;

		// get text for caption for picture
		titleElement = document.querySelector(`p[data-pict="${pictureNum}"]`);
		// add text to figcaption
		captionElement.innerHTML = titleElement.innerHTML;

		figElement.appendChild(captionElement);

		// attach larger image to figure element
		figElement.appendChild(myImg);

		var rowNum = e.target.parentNode.parentNode.dataset.row;
		var yNudgeFactor = rowNum * 100;
		// nudge preview image to the right and up from pointer
		figElement.style.left = e.offsetX + 35 + 'px';
    figElement.style.top = e.offsetY - yNudgeFactor + 'px';

    // remove figure element holding larger image
    // remove listener for mouseout
		e.target.addEventListener('mouseout', function handler(d) {
			var figNode = d.target.parentNode.querySelector('figure.preview');
			figNode.parentNode.removeChild(figNode);
			e.target.removeEventListener('mouseout', handler, false);
		});

		// move larger image with mouse pointer
		e.target.addEventListener('mousemove', function(f) {
			var figNode = f.target.parentNode.querySelector('figure.preview');
			var rowNum = f.target.parentNode.parentNode.dataset.row;
			var yNudgeFactor = rowNum * 100;
			figNode.style.left = f.offsetX + 35 + 'px';
			figNode.style.top = f.offsetY - yNudgeFactor + 'px';
		});

	} // if event target IMG  
}); // mouseover event


