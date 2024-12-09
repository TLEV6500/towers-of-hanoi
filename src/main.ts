import {
	addDisks,
	diskOnDrag,
	dragZoneOnDrop,
	highlightDragTarget,
	removeHighlight,
} from "./game";
import "./style.css";

const app = document.querySelector<HTMLDivElement>("#app");

const game = document.createElement("div");
game.classList.add("game");

const body = document.createElement("div");
body.classList.add("game-body");

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
let diskGroups: HTMLDivElement[] = [];
let group: HTMLDivElement;
let diskCount = 3;
for (let i = 0; i < k; ++i) {
	group = document.createElement("div");
	group.classList.add("disk-column-container");
	group.addEventListener("dragover", highlightDragTarget);
	group.addEventListener("drop", dragZoneOnDrop);
	group.addEventListener("dragleave", removeHighlight);
	addDisks(group, i == 0 ? diskCount : 1, i == 0);
	diskGroups.push(group);
}

group = diskGroups[0];
group.dataset.active = "true";
(group.firstElementChild as HTMLDivElement).draggable = true;

disks.append(...diskGroups);
body.append(towers, disks);
game.append(body, baseBlock);
app?.replaceChildren(game);

const topElement = document.querySelector<HTMLDivElement>("[draggable=true]");
topElement?.addEventListener("dragstart", diskOnDrag);
