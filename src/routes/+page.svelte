<script>
    import { validateUrl } from '$lib';

    let urlInput;
    let urlOutput;

    function onInput() {
        if (urlInput.value.length == 1) {
            urlInput.value = "https://" + urlInput.value;
        }
    }

    function onSubmit() {
        console.log(urlInput.value, validateUrl(urlInput.value))
    }
</script>

<main>
    <section>
        <div class='inp-wrapper'>
            <input 
                type='url' 
                placeholder='https://' 
                bind:this={urlInput} 
                on:input={() => onInput()} 
            />
        </div>

        <button 
            class='output lexend-bold' 
            bind:this={urlOutput} 
            on:click={() => onSubmit()}>
            l.superneon4ik.me/######
        </button>
    </section>
</main>

<style>
    main {
        display: flex;
        justify-content: center;
        align-items: center;

        height: 100%;
    }

    section {
        width: 100%;
        max-width: 35rem;
        margin: 0 3rem;
        
        border: #dadaee69 2px solid;
        border-radius: 0.5rem;
        padding: 1rem 1.5rem;
    }

    section > * {
        width: 100%;
    }

    .inp-wrapper {
        position: relative;
        margin-bottom: 0.75rem;
    }

    .inp-wrapper input {
        background: none;
        border: none;
        outline: none;

        color: #dadaee;
        font-family: 'Lexend', 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
        font-optical-sizing: auto;
        font-weight: 400;
        font-style: normal;
        font-size: large;
        width: 100%;
        height: 2.5rem;
    }

    .inp-wrapper::after {
        content: "";
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;

        height: 2px;
        background-color: #dadaee69;
        border-radius: 4px;
        transition: background-color 0.3s ease;
    }

    .inp-wrapper:has(input:not(:placeholder-shown))::after {
        background-color: #dadaee;
    }

    button.output {
        all: none;
        background: none;
        border: none;
        outline: none;
        color: #dadaee;
    }

    .output {
        font-size: x-large;
    }
</style>