<script>
    import { validateUrl } from '$lib';

    export let data;

    let urlInput;
    let urlOutput;

    function onInput() {
        if (urlInput.value.length == 1) {
            urlInput.value = "https://" + urlInput.value;
        }
    }

    function onSubmit() {
        if (!validateUrl(urlInput.value)) {
            return;
        }

        fetch('/api/execute', {
            method: "POST",
            body: urlInput.value
        })
        .then(async (response) => {
            if (response.error) {
                console.error(response.error);
                return;
            }

            const code = await response.text();
            urlOutput.innerText = code;

            try {
                await navigator.clipboard.writeText('https://' + data.domain + "/" + code);
            } catch (err) {
                console.error('Failed to copy: ', err);
            }
        })
        .catch(error => {
            console.error(error);
        })
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
            on:click={() => onSubmit()}>
            <span>{data.domain}/</span>
            <span bind:this={urlOutput}>######</span>
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
        max-width: 35rem;
        width: 90%;
        text-wrap: wrap;
        
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

        text-wrap: wrap;
    }

    .output {
        font-size: x-large;
    }
</style>