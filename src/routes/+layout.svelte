<svelte:head>
    <title>Neon's link shortner</title>
</svelte:head>

<main>
    <h3 id="title">Neon's Link Shortner</h3>

    <slot />

    <footer>
        © 2024 <a href='https://superneon4ik.me' target="_blank">SuperNeon4ik</a>
        <br>
        <a href='mailto:personal@superneon4ik.me' target="_blank">Report abuse</a>
    </footer>
</main>

<style>
    main {
        display: flex;
        flex-direction: column;
        height: 100vh;
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