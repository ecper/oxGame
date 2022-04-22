import { Component } from "@angular/core";
import Swal from "sweetalert2";
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
			console.log(this.cantClick);
			if (this.oxArray[rowIndex][colIndex]) {
				setTimeout(() => {
					while (true) {
						if (this.oxArray.every((row) => row.every((col) => col))) {
							alert("引き分け");
							this.clearOxArray();
							break;
						}
						const rowRandom = Math.floor(Math.random() * 3);
						const colRandom = Math.floor(Math.random() * 3);
						console.log(this.cantClick);
						if (this.oxArray[rowRandom][colRandom] !== "") {
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

	winnerAlert(type: string) {
		let src: string;
		let title: string;
		if (this.userSetting !== type) {
			src = "/assets/images/lose.gif";
			title = "you lose";
		} else {
			src = "/assets/images/giphy.gif";
			title = "you win";
		}
		Swal.fire({
			heightAuto: false,
			title: `${title}`,
			width: 600,
			padding: "3em",
			color: "#716add",
			backdrop: `
			rgba(0,0,123,0.4)
			url(${src})
			left top
			no-repeat
			`,
		});
	}

	winnerJudge(type: string) {
		if (
			this.oxArray[0][0] === this.oxArray[1][1] &&
			this.oxArray[1][1] === this.oxArray[2][2] &&
			this.oxArray[0][0] !== ""
		) {
			// alert(`${type}の勝ちです`);
			this.winnerAlert(type);
			this.clearOxArray();
			return;
		}
		if (
			this.oxArray[0][2] === this.oxArray[1][1] &&
			this.oxArray[1][1] === this.oxArray[2][0] &&
			this.oxArray[0][2] !== ""
		) {
			this.winnerAlert(type);
			this.clearOxArray();
			return;
		}
		for (let i = 0; i < 3; i++) {
			if (
				this.oxArray[0][i] === this.oxArray[1][i] &&
				this.oxArray[1][i] === this.oxArray[2][i] &&
				this.oxArray[0][i] !== ""
			) {
				this.winnerAlert(type);
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
				this.winnerAlert(type);
				this.clearOxArray();
				return;
			}
		}
	}
}
