import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

// const DIR4 = [[1, 0], [-1, 0], [0, 1], [0, -1]];
const DIR8 = [[1, 1], [1, 0], [1, -1], [-1, -1], [-1, 0], [-1, 1], [0, 1], [0, -1]];

function Square(props) {
    return (
        <button className={props.className} onClick={() => props.onClick()}>
            {props.value}
        </button>
    );

}

class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mines: new Array(800).fill(" "),
            graph: new Array(800).fill(" "),
            clicked: new Array(800).fill(false),
            openedCount: 0
        };
    }
    mineBuilt = false;
    buildMines() {
        let mines = this.state.mines.slice();
        for (let i = 0; i < 100; i++) {
            let m = Math.floor(Math.random() * 10000) % 800;
            if (mines[m] === "X") { i--; continue; }
            mines[m] = "X";
            for (let j = 0; j < 8; j++) {
                let element = DIR8[j];
                let [x, y] = [Math.floor(m / 20) + element[0], m % 20 + element[1]];
                if (x >= 0 && x < 40 && y >= 0 && y < 20) {
                    let nextM = x * 20 + y;
                    if (mines[nextM] !== "X")
                        if (mines[nextM] === " ")
                            mines[nextM] = 1;
                        else
                            mines[nextM]++;
                }
            }
        }
        this.setState(
            { graph: this.state.graph, clicked: this.state.clicked, mines: mines }
        )
    }
    handleClick(num) {
        if (!this.state.clicked[num]) {
            let graph = this.state.graph.slice();
            let openedCount = this.state.openedCount;
            let clicked = this.state.clicked.slice();
            console.log(this.state.mines[num]);
            let q = [];
            q.push(num);
            graph[num] = this.state.mines[num];
            clicked[num] = true;
            while (q.length > 0) {
                let a = q.shift();
                if (typeof (graph[a] === "number") && graph[a] !== " ")
                    continue;
                openedCount++;
                for (let i = 1; i < 8; i++) {
                    let element = DIR8[i];
                    let [x, y] = [Math.floor(a / 20) + element[0], a % 20 + element[1]];
                    let nextM = x * 20 + y;
                    console.log(`(Open ${nextM} => ${x},${y})`);
                    if (x >= 0 && x < 40 && y >= 0 && y < 20 && !clicked[nextM] && this.state.mines[nextM] !== "X") {
                        graph[nextM] = this.state.mines[nextM];
                        clicked[nextM] = true;
                        q.push(nextM);
                    }
                }
            }
            this.setState({ mines: this.state.mines, graph: graph, clicked: clicked, openedCount: openedCount });
            if (openedCount === 200 - 20) this.setState({ status: "Win", clicked: this.state.clicked.fill(true), graph: this.state.mines, openedCount: openedCount })
            if (this.state.mines[num] === "X") {
                this.setState({ status: "Fail", clicked: this.state.clicked.fill(true), graph: this.state.mines, openedCount: openedCount })
            }
        }
    }
    renderSquare(i) {
        return <Square className={this.state.clicked[i] ? "square" : "square-black"} value={this.state.graph[i]} onClick={() => (this.handleClick(i))} />;
    }
    renderRow(i) {
        return (< div className="board-row" >
            {this.renderSquare(20 * i + 0)}
            {this.renderSquare(20 * i + 1)}
            {this.renderSquare(20 * i + 2)}
            {this.renderSquare(20 * i + 3)}
            {this.renderSquare(20 * i + 4)}
            {this.renderSquare(20 * i + 5)}
            {this.renderSquare(20 * i + 6)}
            {this.renderSquare(20 * i + 7)}
            {this.renderSquare(20 * i + 8)}
            {this.renderSquare(20 * i + 9)}
            {this.renderSquare(20 * i + 10)}
            {this.renderSquare(20 * i + 11)}
            {this.renderSquare(20 * i + 12)}
            {this.renderSquare(20 * i + 13)}
            {this.renderSquare(20 * i + 14)}
            {this.renderSquare(20 * i + 15)}
            {this.renderSquare(20 * i + 16)}
            {this.renderSquare(20 * i + 17)}
            {this.renderSquare(20 * i + 18)}
            {this.renderSquare(20 * i + 19)}
        </div >);
    }
    render() {
        if (!this.mineBuilt) {
            this.buildMines();
            this.mineBuilt = true;
        }
        return (
            <div>
                <div className="status">{this.state.status}{this.state.openedCount}</div>
                {this.renderRow(0)}
                {this.renderRow(1)}
                {this.renderRow(2)}
                {this.renderRow(3)}
                {this.renderRow(4)}
                {this.renderRow(5)}
                {this.renderRow(6)}
                {this.renderRow(7)}
                {this.renderRow(8)}
                {this.renderRow(9)}
                {this.renderRow(10)}
                {this.renderRow(11)}
                {this.renderRow(12)}
                {this.renderRow(13)}
                {this.renderRow(14)}
                {this.renderRow(15)}
                {this.renderRow(16)}
                {this.renderRow(17)}
                {this.renderRow(18)}
                {this.renderRow(19)}
                {this.renderRow(20)}
                {this.renderRow(21)}
                {this.renderRow(22)}
                {this.renderRow(23)}
                {this.renderRow(24)}
                {this.renderRow(25)}
                {this.renderRow(26)}
                {this.renderRow(27)}
                {this.renderRow(28)}
                {this.renderRow(29)}
                {this.renderRow(30)}
                {this.renderRow(31)}
                {this.renderRow(32)}
                {this.renderRow(33)}
                {this.renderRow(34)}
                {this.renderRow(35)}
                {this.renderRow(36)}
                {this.renderRow(37)}
                {this.renderRow(38)}
                {this.renderRow(39)}
            </div>
        );
    }
}

class Game extends React.Component {
    render() {
        return (
            <div className="game">
                <div className="game-board">
                    <Board />
                </div>
                <div className="game-info">
                    <div>{/* status */}</div>
                    <ol>{/* TODO */}</ol>
                </div>
            </div>
        );
    }
}

// ========================================

ReactDOM.render(
    <Game />,
    document.getElementById("root")
);
