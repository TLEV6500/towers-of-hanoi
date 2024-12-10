export function addDisks(
	group: HTMLDivElement,
	qty: number,
	isActive: boolean
) {
	let disk: HTMLDivElement;
	for (let i = 0; i < qty; ++i) {
		disk = document.createElement("div");
		group.append(disk);
		disk.classList.add("disk");
		if (isActive) {
			disk.classList.add(`disk-${i + 1}`);
			disk.dataset.diskType = String(i + 1);
		} else {
			disk.classList.add("blank");
		}
	}
}

// TODO: when disk is dropped onto non-dropzone areas, it should return to its place prior to dragging
let draggedElement: HTMLDivElement;
export function diskOnDrag(ev: DragEvent) {
	draggedElement = ev.currentTarget as HTMLDivElement;
	if (ev.dataTransfer) {
		ev.dataTransfer.dropEffect = "move";
		ev.dataTransfer.effectAllowed = "move";
	}
}

export function dragZoneOnDrop(ev: DragEvent) {
	ev.preventDefault();
	const dropZone = ev.currentTarget as HTMLDivElement;
	removeHighlight(dropZone);
	if (draggedElement.nextElementSibling) {
		const sib = draggedElement.nextElementSibling as HTMLDivElement;
		sib.draggable = true;
		sib.addEventListener("dragstart", diskOnDrag);
	}
	dropZone.insertBefore(
		draggedElement,
		dropZone.firstElementChild!.nextElementSibling
	);
	if (draggedElement.nextElementSibling)
		(draggedElement.nextElementSibling as HTMLDivElement).draggable = false;
}

export function highlightDragTarget(ev: DragEvent) {
	ev.preventDefault();
	const dragZone = ev.currentTarget as HTMLDivElement;
	if (!dragZone.firstElementChild?.classList.contains("blank")) {
		return;
	}
	const type = draggedElement.dataset.diskType;
	if (type && !draggedElement.parentElement?.isEqualNode(dragZone)) {
		dragZone.firstElementChild?.classList.replace(
			"blank",
			`disk-${type}-target`
		);
	}
}

export function onDragLeave(ev: DragEvent) {
	ev.preventDefault();
	const dropZone = ev.currentTarget as HTMLDivElement;
	removeHighlight(dropZone);
}

// NOTE: the highlight element should always be the first child of the disk column
export function removeHighlight(dropZone: HTMLDivElement) {
	if (dropZone.firstElementChild?.classList.contains("blank")) return;
	const type = draggedElement.dataset.diskType;
	if (type) {
		dropZone.firstElementChild?.classList.replace(
			`disk-${type}-target`,
			"blank"
		);
	}
}
