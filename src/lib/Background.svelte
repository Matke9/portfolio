<script lang="ts">
	import { onMount } from 'svelte';

	let canvas: HTMLCanvasElement;
	let ctx: CanvasRenderingContext2D | null = null;
	let dots: { x: number; y: number; vx: number; vy: number }[] = [];
	let mouse: {
		x: number;
		y: number;
	} = { x: -100, y: -100 };
	let parent: HTMLElement;
	let parentWidth = 0;
	let parentHeight = 0;

	const numDots = 100;
	const maxDistance = 180;

	function createDots() {
		for (let i = 0; i < numDots; i++) {
			dots.push({
				x: Math.random() * parentWidth,
				y: Math.random() * parentHeight,
				vx: (Math.random() - 0.5) * 0.5,
				vy: (Math.random() - 0.5) * 0.5
			});
		}
	}

	function updateDots() {
		ctx?.clearRect(0, 0, parentWidth, parentHeight);
		dots.forEach((dot) => {
			dot.x += dot.vx;
			dot.y += dot.vy;

			if (dot.x < 0 || dot.x > parentWidth) dot.vx *= -1;
			if (dot.y < 0 || dot.y > parentHeight) dot.vy *= -1;

			ctx?.beginPath();
			ctx?.arc(dot.x, dot.y, 2, 3, Math.PI * 2);
			if (ctx) ctx.fillStyle = '#ffffff';
			ctx?.fill();

			dots.forEach((otherDot) => {
				const dist = Math.hypot(dot.x - otherDot.x, dot.y - otherDot.y);
				if (dist < maxDistance) {
					ctx?.beginPath();
					ctx?.moveTo(dot.x, dot.y);
					ctx?.lineTo(otherDot.x, otherDot.y);
					if (ctx) {
						ctx.strokeStyle = `rgba(255, 255, 255, ${1 - dist / maxDistance})`;
						ctx.lineWidth = 0.5;
					}
					ctx?.stroke();
				}
			});

			const mouseDist = Math.hypot(dot.x - mouse.x, dot.y - mouse.y);
			if (mouseDist < 100) {
				const sgnx = (dot.x - mouse.x) / Math.abs(dot.x - mouse.x);
				const sgny = (dot.y - mouse.y) / Math.abs(dot.y - mouse.y);
				const hyp = Math.hypot(dot.x - mouse.x, dot.y - mouse.y);
				dot.vx = sgnx * (105 / hyp - 1) * Math.abs(dot.x - mouse.x) * 0.05;
				dot.vy = sgny * (105 / hyp - 1) * Math.abs(dot.y - mouse.y) * 0.05;
				if (dot.x < 0 || dot.x > canvas.width) dot.vx *= -1;
				if (dot.y < 0 || dot.y > canvas.height) dot.vy *= -1;
			} else {
				const hyp = Math.hypot(dot.vx, dot.vy);
				const maxSpeed = 0.25 * Math.sqrt(2);
				if (hyp > maxSpeed) {
					dot.vx *= maxSpeed / hyp;
					dot.vy *= maxSpeed / hyp;
				}
			}
		});

		requestAnimationFrame(updateDots);
	}

	function handleMouseMove(event: MouseEvent) {
		const rect = canvas.getBoundingClientRect();
		mouse.x = event.clientX - rect.left;
		mouse.y = event.clientY - rect.top;
	}

	function resizeCanvas() {
		parentWidth = parent.clientWidth;
		parentHeight = parent.clientHeight;
		canvas.width = parentWidth;
		canvas.height = parentHeight;
	}

	onMount(() => {
		ctx = canvas.getContext('2d');
		if (ctx) {
			resizeCanvas();
			createDots();
			updateDots();

			window.addEventListener('mousemove', handleMouseMove);
			const resizeObserver = new ResizeObserver(resizeCanvas);
			resizeObserver.observe(parent);

			return () => {
				window.removeEventListener('mousemove', handleMouseMove);
				resizeObserver.disconnect();
			};
		}
	});
</script>

<div
	bind:this={parent}
	class="fixed left-[14.5rem] top-0 z-[-1] h-full"
	style="width: calc(100% - 14.5rem); overflow-hidden;"
>
	<canvas bind:this={canvas} class="absolute left-0 top-0 h-full w-full"></canvas>
</div>

<style>
	canvas,
	div {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
	}
</style>
