import "./style.css";

const app = document.querySelector<HTMLDivElement>("#app");

const gameBody = document.createElement("div");
gameBody.classList.add("body-container");

const towers = document.createElement("div");
towers.classList.add("towers-container");
const k = 3;
let towerArray = new Array<HTMLDivElement>();
for (let i = 0; i < k; ++i) {
	towerArray.push(document.createElement("div"));
	towerArray[i].classList.add("tower");
}
towers.append(...towerArray);

const baseBlock = document.createElement("div");
baseBlock.classList.add("base-block");

const disks = document.createElement("div");
disks.classList.add("disks-container");
let diskArray: HTMLDivElement[] = [];
const n = 3;
let diskGroup: HTMLDivElement;
for (let i = 0; i < k; ++i, diskArray = []) {
	diskGroup = document.createElement("div");
	diskGroup.classList.add("disk-column-container");
	for (let i = 0; i < n; ++i) {
		diskArray.push(document.createElement("div"));
		diskArray[i].classList.add("disk");
	}
	diskGroup.append(...diskArray);
	disks.append(diskGroup);
}

gameBody.append(towers, disks, baseBlock);
app?.replaceChildren(gameBody);
