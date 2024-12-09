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
		if (isActive) disk.classList.add(`disk-${group.childElementCount + 1}`);
		disk.classList.add("disk");
		group.append(disk);
	}
}
