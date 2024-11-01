<script lang="ts">

type NavItem = {
    href: string;
    label: string;
};

    export let navItems: NavItem[] = [];
</script>

<nav class="h-screen w-64 bg-[var(--dark-grey)] text-white flex flex-col p-4 space-y-4 justify-center">
    <img src="/LogoMMatovic.png" alt="mm" class="h-40 w-40 fixed top-3 left-3 bg-no-repeat bg-cover" />
    <ul class="space-y-2">
        {#each navItems as item}
            <li class = "">
                <a href="{item.href}" class="block p-2 rounded hover:bg-[var(--grey)] transition duration-200 ease-in-out">
                    {item.label}
                </a>
            </li>
        {/each}
    </ul>
</nav>