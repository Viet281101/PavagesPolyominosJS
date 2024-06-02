export function showTutorialPopup(toolbar) {
	const popupContainer = toolbar.createPopupContainer('tutorialPopup', toolbar.buttons[3].name);
	const popup = popupContainer.querySelector('canvas');
	const ctx = popup.getContext('2d');

	ctx.fillStyle = '#a0a0a0';
	ctx.fillRect(0, 0, popup.width, popup.height);
};