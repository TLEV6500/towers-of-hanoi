export function moveDisk(
	disksRootContainer: HTMLDivElement,
	columnIndex: number
) {}

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
	draggedElement.classList.replace(
		`disk-${draggedElement.dataset.diskType}`,
		`disk-${draggedElement.dataset.diskType}-target`
	);
	if (ev.dataTransfer) {
		ev.dataTransfer.dropEffect = "move";
		ev.dataTransfer.effectAllowed = "move";
	}
}

export function dragZoneOnDrop(ev: DragEvent) {
	ev.preventDefault();
	const html = ev.currentTarget as HTMLDivElement;
	const disk = html.firstElementChild as HTMLDivElement;
	disk.classList.replace(
		`disk-${draggedElement.dataset.diskType}-target`,
		`disk-${draggedElement.dataset.diskType}`
	);
	draggedElement.draggable = false;
	disk.draggable = true;
	disk.dataset.diskType = draggedElement.dataset.diskType;
	draggedElement.dataset.diskType = "";
	disk.addEventListener("dragstart", diskOnDrag);
}

export function highlightDragTarget(ev: DragEvent) {
	ev.preventDefault();
	const html = ev.currentTarget as HTMLDivElement;
	if (!html.firstElementChild?.classList.contains("blank")) {
		return;
	}
	const type = draggedElement.dataset.diskType;
	if (type) {
		html.firstElementChild?.classList.replace(
			"blank",
			`disk-${type}-target`
		);
	}
}

export function removeHighlight(ev: DragEvent) {
	ev.preventDefault();
	const html = ev.currentTarget as HTMLDivElement;
	if (html.firstElementChild?.classList.contains("blank")) return;
	const type = draggedElement.dataset.diskType;
	if (type) {
		html.firstElementChild?.classList.replace(
			`disk-${type}-target`,
			"blank"
		);
	}
}
