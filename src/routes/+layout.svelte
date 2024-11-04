<script>
    export let data;
</script>

<svelte:head>
    <title>Neon's link shortner</title>
</svelte:head>

<main>
    <h3 id="title">Neon's Link Shortner</h3>

    <slot />

    <footer>
        <span>By <a href='https://superneon4ik.me' target="_blank">SuperNeon4ik</a></span>
        <br>
        {#if data.git_url && data.branch && data.commit_sha}
            <span>{data.branch}@<a href='{data.git_url}/commit/{data.commit_sha}'>{data.commit_sha.substring(0, 7)}</a></span>
            <br>
        {/if}
        <span><a href='mailto:personal@superneon4ik.me' target="_blank">Report abuse</a></span>
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