export function showSolvePopup(toolbar) {
	const popupContainer = toolbar.createPopupContainer('solvePopup', toolbar.buttons[2].name);
	const popup = popupContainer.querySelector('canvas');
	const ctx = popup.getContext('2d');

	ctx.fillStyle = '#a0a0a0';
	ctx.fillRect(0, 0, popup.width, popup.height);

	const rows = [
		{ label: 'Auto tiling the Polyominoes blocks', title: true },
		{ label: '1) Backtracking method :', icon: '../assets/ic_solution.png' },
		{ label: '2) Brute force method :', icon: '../assets/ic_solution.png' },
		{ label: '3) Random method :', icon: '../assets/ic_solution.png' },
		{ label: '4) Random backtracking :', icon: '../assets/ic_solution.png' }
	];

	const startY = 60;
	const rowHeight = 60;
	const colX = 30;

	rows.forEach((row, index) => {
		const y = startY + index * rowHeight;
		ctx.font = '20px Pixellari';
		ctx.fillStyle = '#15159f';
		ctx.fillText(row.label, colX, y + 20);

		if (row.icon) {
			const icon = new Image();
			icon.src = row.icon;
			icon.onload = () => {
				ctx.drawImage(icon, popup.width - 94, y - 14, 50, 50);
			};
			attachSolveClickEvent(toolbar, popup, row, y);
		}
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
};

function attachSolveClickEvent(toolbar, popup, row, y) {
	popup.addEventListener('click', (e) => {
		const rect = popup.getBoundingClientRect();
		const mouseX = e.clientX - rect.left;
		const mouseY = e.clientY - rect.top;

		if (toolbar.isInside(mouseX, mouseY, { x: popup.width - 94, y: y - 14, width: 50, height: 50 })) {
			switch (row.label) {
				case '1) Backtracking method :':
					toolbar.mainApp.backtrackingAutoTiling();
					if (toolbar.isMobile) {toolbar.closePopup('solve');}
					break;

				case '2) Brute force method :':
					if (toolbar.isMobile) {toolbar.closePopup('solve');}
					break;

				case '3) Random method :':
					if (toolbar.isMobile) {toolbar.closePopup('solve');}
					break;

				case '4) Random backtracking :':
					if (toolbar.isMobile) {toolbar.closePopup('solve');}
					break;
			}
		}
	});
};
