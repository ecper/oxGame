import { Component } from "@angular/core";

@Component({
	selector: "app-home",
	templateUrl: "home.page.html",
	styleUrls: ["home.page.scss"],
})
export class HomePage {
	oxArray: string[][] = [];

	cantClick: boolean = false;

	userSetting: string = "";

	constructor() {
		this.clearOxArray();
	}

	setUserOX(isMaru: boolean) {
		isMaru ? (this.userSetting = "〇") : (this.userSetting = "☓");
	}

	clearOxArray() {
		this.oxArray = [
			["", "", ""],
			["", "", ""],
			["", "", ""],
		];
		this.cantClick = false;
		this.userSetting = "";
	}

	async addString(rowIndex: number, colIndex: number, type: string) {
		if (!this.oxArray[rowIndex][colIndex]) {
			this.cantClick = true;
			this.oxArray[rowIndex][colIndex] = type;
			this.winnerJudge(type);
			if (this.oxArray[rowIndex][colIndex]) {
				setTimeout(() => {
					while (true) {
						const rowRandom = Math.floor(Math.random() * 3);
						const colRandom = Math.floor(Math.random() * 3);
						if (this.oxArray[rowRandom][colRandom] !== "") {
							this.cantClick = false;
							continue;
						} else {
							this.oxArray[rowRandom][colRandom] =
								this.userSetting !== "☓" ? "☓" : "〇";
							this.winnerJudge(this.userSetting !== "☓" ? "☓" : "〇");
							this.cantClick = false;
							break;
						}
					}
				}, 1000);
			}
		} else {
			return;
		}
	}

	winnerJudge(type: string) {
		if (
			this.oxArray[0][0] === this.oxArray[1][1] &&
			this.oxArray[1][1] === this.oxArray[2][2] &&
			this.oxArray[0][0] !== ""
		) {
			alert(`${type}の勝ちです`);
			this.clearOxArray();
			return;
		}
		if (
			this.oxArray[0][2] === this.oxArray[1][1] &&
			this.oxArray[1][1] === this.oxArray[2][0] &&
			this.oxArray[0][2] !== ""
		) {
			alert(`${type}の勝ちです`);
			this.clearOxArray();
			return;
		}
		for (let i = 0; i < 3; i++) {
			if (
				this.oxArray[0][i] === this.oxArray[1][i] &&
				this.oxArray[1][i] === this.oxArray[2][i] &&
				this.oxArray[0][i] !== ""
			) {
				alert(`${type}の勝ちです`);
				this.clearOxArray();
				return;
			}
		}
		for (let row of this.oxArray) {
			if (
				row[0] === row[1] &&
				row[1] === row[2] &&
				row[0] === row[2] &&
				row[0] !== ""
			) {
				alert(`${type}の勝ちです`);
				this.clearOxArray();
				return;
			}
		}
	}
}
