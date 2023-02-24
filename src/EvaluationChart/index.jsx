import React from 'react';
import { scaleLinear, schemeCategory10 } from 'd3';

export function EvaluationChart({evaluationData}) {

	const barCount = linearBars.length;
	const width = 1200;
	const height = 600;
	const margin = 60;
	const marginTop = 24;
	const barSpaceH = width - margin * 2;
	const barSpaceBetween = 16;
	const barWidth = (barSpaceH / barCount) - barSpaceBetween;
	const barVSpace = height - marginTop * 2;
	const lineWidth = width - margin * 2;

	const fontStyle = "italic";
	const fontSize =  ~~(width / 60);

	var color = scaleLinear()
		.domain([0, 0.5, 1])
		.range([schemeCategory10[3], schemeCategory10[0], schemeCategory10[2]]);

	return <div>
		<h2 style={{fontStyle:"italic", textTransform:"lowercase"}}>
			Accuracy Evaluation
		</h2>
		<svg width={width} height={height + marginTop * 2}>
		<g Horizontal Lines>
			{Array.from(Array(101).keys(), n => n).map((a,i) =>{

				const lineSpacing = barVSpace / 100;
				const y = marginTop + (lineSpacing * i);

				return <g >
					<rect height={1} width={lineWidth} fill={"darkgray"} fillOpacity={"12%"} x={margin} y={y}>{a}</rect>	
				</g>

			})}
			{Array.from(Array(11).keys(), n => n * 10).map((a,i) =>{

				const lineSpacing = barVSpace / 10;
				const y = marginTop + (lineSpacing * i);

				return <g >
					<rect height={1} width={lineWidth} fill={"darkgray"} fillOpacity={"24%"} x={margin} y={y}>{a}</rect>	
				</g>
				
			})}
		</g>
		<g Bars>
			{linearBars.map(({i,correctRate})=>{

				const x = margin + (i * barSpaceH / barCount) + 8;
				const barHeight = (barVSpace * correctRate);
				const y= marginTop + barVSpace - barHeight;

				return <rect fill={color(correctRate)} x={x} y={y} height={barHeight} width={barWidth}/>

			})}
		</g>
		<g Bar Legend>
			{linearBars.map(({dx, i, correctRate}) =>{

				const y = marginTop + barVSpace - (barVSpace * correctRate) - 10;

				return <g >
					<text style={{fontStyle:"italic",fontSize : fontSize * (9 / 11)}}  text-anchor="middle" x={margin + i * (barWidth + barSpaceBetween) + barWidth / 2} y={y} fill="lightgray">{(correctRate * 100).toFixed(0)}</text>	
				</g>
				
			})}
		</g>
		<g Left Side Legend>
			{[0, 10,20,30,40,50,60,70,80,90,100].sort((a,b)=>b-a).map((a,i) =>{

				const spaceAvailable = barVSpace;
				const spacing = spaceAvailable / 10;

				return <g >
					<text style={{fontStyle:"italic",fontSize : fontSize * (9 / 11)}} textAnchor="end" letterSpacing="1" x={margin - 6} y={6 + marginTop + spacing * i} fill="darkgray">{a}</text>	
				</g>
				
			})}
		</g>
		<g Bottom Legend DX>
			{linearBars.map(({dx, i}) =>{

				const x = margin + (i * barSpaceH / barCount) + 8 + barWidth / 2;

				return <g >
					<text style={{fontStyle:"italic",fontSize}} text-anchor="middle" x={x} y={height - 2} fill="darkgray">n{+dx + 1}</text>	
				</g>
				
			})}
		</g>
		<g Bottom Text>
			<text style={{fontStyle,fontSize}} text-anchor="middle" letterSpacing="2" x={(width / 2)} y={height + 24} fill="darkgray">Prediction Certainty ( + / - team fortitude )</text>	
		</g>
		<g Left Text>
			<text text-anchor="middle" dominant-baseline="central" style={{fontStyle,fontSize}} transform={`rotate(270, 12, ${height / 2})`} letterSpacing="2" x={12} y={(height / 2)} fill="darkgray">Prediction Accuracy ( Percent Correct )</text>	
		</g>
		<g N Legend>

			<text style={{fontStyle,fontSize: fontSize * 12/11}} letterSpacing="2" x={margin + 16} y={marginTop + 24} fill="darkgray">{(n2.correctRate * 100).toFixed(2)}%</text>	
			<text style={{fontStyle,fontSize: fontSize * 9 / 11}} letterSpacing="2" x={margin + 16} y={marginTop + 44} fill="darkgray">×{n2.total}</text>	

		</g>
		</svg>

	</div>
}