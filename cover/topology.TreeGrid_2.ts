import {XY, Context, Point, Style, Order} from './sacred.types';
import { Forces } from './sacred.forces';
import { TreeOfLife } from './sacred.elements';

export function TreeGrid_2(ctx: Context, order: Order) {
	let gridW = ctx.canvas.width;
	let gridH = ctx.canvas.height;
	let gridStepV = 100;
	let gridStepH =  gridStepV - gridStepV / 7;
	
	//	An Iterator function - called by an Order function to generate Topology points.
	function* I() {
		let yI = 0;
		for (let y = 0; y < gridH; y += gridStepV) {
			let xI = 0;
			for (let x = 0; x < gridW; x += gridStepH) {

				//	Offsetting even columns vertically
				let yOff = 0;
				if (xI % 2 === 0) {
					yOff = gridStepH/1.8;
				}
				
				yield {x, y: y+yOff};
			xI++;}

		yI++;}
	};

	let treeXY: XY = {x: 700, y: 300, r: 170};
	let treeR = 100;

	//	Forces - a function that takes a point and returns a list of strength values
	//	of various forces that influence it.
	function ForceFields(p: Point) {

		let fFocal = Forces.radial(p, {x: gridW / 2, y: gridH / 2}, gridW / 2);
		let fTree = Forces.treeOfLifeKernel(p, treeXY, treeR);

		return {
			major: [fTree],
			minor: [fFocal],
		};
	}

	order(ctx, I, ForceFields);
}
