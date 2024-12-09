import { addDisks } from "./game";
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
baseBlock.classList.add("base-block", "container");

const disks = document.createElement("div");
disks.classList.add("disks-container");
let diskGroups: HTMLDivElement[] = [];
let group: HTMLDivElement;
let diskCount = 3;
for (let i = 0; i < k; ++i) {
	group = document.createElement("div");
	group.classList.add("disk-column-container");
	diskGroups.push(group);
	addDisks(group, diskCount, i == 0);
}

disks.append(...diskGroups);
body.append(towers, disks);
game.append(body, baseBlock);
app?.replaceChildren(game);
