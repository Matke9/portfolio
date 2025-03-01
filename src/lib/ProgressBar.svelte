<script>
	export let percentage = 50;
</script>

<div class="progress-container">
	<div class="progress-bar" style="width: {percentage}%"></div>
</div>

<style>
	.progress-container {
		width: 50vw;
		max-width: 400px;
		height: 12px;
		background: white;
		border-radius: 6px;
		overflow: hidden;
		display: flex;
		align-items: center;
		padding: 2px;
		box-shadow: 0 0 5px rgba(255, 255, 255, 0.5);
	}

	.progress-bar {
		height: 100%;
		background: #7ee1d5;
		border-radius: 6px;
		transition: width 0.3s ease-in-out;
	}
</style>
