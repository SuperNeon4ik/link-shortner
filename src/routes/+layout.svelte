<script>
    export let data;
</script>

<svelte:head>
    {#if data.branding.title}
        <title>{data.branding.title}</title>
    {/if}
</svelte:head>

<main>
    {#if data.branding.title}
        <h3 id="title">{data.branding.title}</h3>
    {/if}

    <slot />

    <footer>
        {#if data.branding.author}
            {#if data.branding.author_website}
                <span>Hosted by <a href='{data.branding.author_website}' target="_blank">{data.branding.author}</a></span>
            {:else}
                <span>Hosted by {data.branding.author}</span>
            {/if}
            <br>
        {/if}
        {#if data.git_url && data.branch && data.commit_sha}
            <span>{data.branch}@<a href='{data.git_url}/commit/{data.commit_sha}'>{data.commit_sha.substring(0, 7)}</a></span>
            <br>
        {/if}
        {#if data.branding.report_abuse_email}
            <span><a href='mailto:{data.branding.report_abuse_email}' target="_blank">Report abuse</a></span>
        {/if}
    </footer>
</main>

<style>
    main {
        display: flex;
        flex-direction: column;
        height: 100vh;
    }

    @supports (height: 100dvh) {
        main {
            height: 100dvh;
        }
    }

    #title {
        text-transform: uppercase;
        text-align: center;
        opacity: 75%;
        margin: 1rem;
    }

    footer {
        text-transform: uppercase;
        text-align: center;
        opacity: 25%;
        margin: 1rem;
        margin-top: auto;
        color: #dadaee;
    }

    a {
        transition: color ease-in-out 150ms;
        color: #dadaee;
    }

    a:hover {
        color: #c3c3ff;
    }
</style>