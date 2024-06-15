export function showGridPopup(toolbar) {
	const popupContainer = toolbar.createPopupContainer('gridPopup', toolbar.buttons[1].name);
	const popup = popupContainer.querySelector('canvas');
	const ctx = popup.getContext('2d');

	ctx.fillStyle = '#a0a0a0';
	ctx.fillRect(0, 0, popup.width, popup.height);

	const rows = [
		{ label: 'Create new grid board here', box: true, title: true },
		{ label: 'Enter n° x size', type: 'input' },
		{ label: 'Enter n° y size', type: 'input' },
		{ label: 'Enter n° z size', type: 'input' },
		{ label: 'Draw grid by click to =>', icon: '../assets/ic_draw.png' },
		{ label: 'Delete current grid :', icon: '../assets/ic_trash.png' },
	];

	const startY = 76;
	const rowHeight = 76;
	const colX = 30;

	rows.forEach((row, index) => {
		const y = startY + index * rowHeight;
		if (row.box) {
			ctx.strokeStyle = '#fff';
			ctx.strokeRect(10, (y - 30), (popup.width - 20), (rowHeight * (row.title ? 5 : 1)));
		}
		ctx.font = '22px Pixellari';
		ctx.fillStyle = '#000';
		ctx.fillText(row.label, colX, y + 20);

		if (row.icon) {
			const icon = new Image();
			icon.src = row.icon;
			icon.onload = () => {
				ctx.drawImage(icon, popup.width - 94, y - 14, 50, 50);
			};
		} else if (row.type === 'input') {
			createInputField(popupContainer, y, 3);
		}
	});

	let x_size = 3;
	let y_size = 3;
	let z_size = 3;
	popupContainer.querySelectorAll('input[type="number"]').forEach((input, index) => {
		input.addEventListener('change', (e) => {
			if (index === 0) x_size = parseInt(e.target.value);
			if (index === 1) y_size = parseInt(e.target.value);
			if (index === 2) z_size = parseInt(e.target.value);
		});
	});

	popup.addEventListener('mousemove', (e) => {
		const rect = popup.getBoundingClientRect();
		const mouseX = e.clientX - rect.left;
		const mouseY = e.clientY - rect.top;
		let cursor = 'default';

		rows.forEach((row, index) => {
			const y = startY + index * rowHeight;
			if (row.icon && toolbar.isInside(mouseX, mouseY, { x: popup.width - 94, y: y - 14, width: 50, height: 50 })) {
				cursor = 'pointer';
			}
		});
		popup.style.cursor = cursor;
	});

	popup.addEventListener('click', (e) => {
		const rect = popup.getBoundingClientRect();
		const mouseX = e.clientX - rect.left;
		const mouseY = e.clientY - rect.top;

		rows.forEach((row, index) => {
			const y = startY + index * rowHeight;
			if (row.icon && toolbar.isInside(mouseX, mouseY, { x: popup.width - 94, y: y - 14, width: 50, height: 50 })) {
				switch (index) {
					case 4: toolbar.mainApp.createNewBoard(x_size, y_size, z_size); break;
					case 5: toolbar.mainApp.clearBoard(); break;
				}
				if (toolbar.isMobile) {toolbar.closePopup('grid');}
			}
		});
	});
};

function createInputField(popupContainer, y, defaultValue) {
	const input = document.createElement('input');
	input.type = 'number';
	input.value = defaultValue;
	input.style.position = 'absolute';
	input.style.left = 'calc(100% - 120px)';
	input.style.top = `${y}px`;
	input.style.width = '80px';
	input.style.height = '24px';
	input.style.border = '1px solid #000';
	input.style.backgroundColor = '#fff';
	input.style.fontSize = '22px';
	input.style.fontFamily = 'Pixellari';
	input.style.color = '#000';
	input.style.zIndex = '1001';
	input.classList.add('popup-input');
	popupContainer.appendChild(input);
};
