<script>
    let {data} = $props();
</script>
<div class="flex flex-wrap">
    {#each data.summaries as { slug, title }}
        <a class="h-12 w-80 rounded bg-[var(--grey)] m-10 z-20" href={`/projects/${slug}`}>{title}</a>
    {/each}
</div>
