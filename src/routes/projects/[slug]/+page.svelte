<script>
	let { data } = $props();
</script>
<div class="flex flex-wrap flex-col">
<div class="rounded-xl bg-[var()] bg-cover bg-no-repeat w-72 h-72 p-1 bg-gradient-to-r from-[var(--accent-dark)] to-[var(--accent-light)] box-glow image" style="--title: '{data.project.title}'">
	<div class="rounded-xl bg-[var(--grey)] bg-cover bg-no-repeat w-full h-full" style="background-image: url('/projects/{data.project.imageUrl}')"></div>
</div>
<h2 class="text-3xl hover:scale-105 transform ease-in-out duration-200 font-title title" style="--title: '{data.project.title}';">{data.project.title}</h2>
</div>
<style>
  .image{
    view-transition-name: var(--image);
  }
  .title{
    view-transition-name: var(--title);
  }
</style>