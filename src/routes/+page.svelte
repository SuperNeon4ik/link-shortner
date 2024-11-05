<script>
    import { validateUrl } from '$lib';

    export let data;

    let urlInput;
    let urlOutput;
    
    let state = null;

    let isProcessing = false;

    function onInput() {
        if (urlInput.value.length == 1) {
            urlInput.value = 'https://' + urlInput.value;
        }

        urlOutput.innerText = '######';
        state = null;
    }

    function onSubmit() {
        if (!validateUrl(urlInput.value)) {
            state = 'failure';
            return;
        }

        isProcessing = true;
        urlOutput.innerText = '######';
        state = null;

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

            const url = 'https://' + data.domain + "/" + code;
            await copyToClipboard(url);

            state = "success";
        })
        .catch(error => {
            console.error(error);
            state = 'failure';
        })
        .finally(() => {
            isProcessing = false;
        })
    }

    async function copyToClipboard(value) {
        try {
            await navigator.clipboard.writeText(value);
        } catch (err) {
            const temp = document.createElement('input');
            document.body.appendChild(temp);
            temp.value = value;
            temp.select();
            document.execCommand('copy');
            document.body.removeChild(temp);
        }
    }
</script>

<main>
    <form 
        on:submit|preventDefault={() => onSubmit()} 
        class:success={state == 'success'}
        class:failure={state == 'failure'}>
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
            <div class="processing-box" class:active={isProcessing}>######</div>
            <span bind:this={urlOutput} class='output-code' class:active={!isProcessing}>######</span>
        </button>
    </form>
</main>

<style>
    main {
        display: flex;
        justify-content: center;
        align-items: center;

        height: 100%;
    }

    form {
        position: relative;

        max-width: 35rem;
        width: 90%;
        text-wrap: wrap;
        
        border: #dadaee69 2px solid;
        border-radius: 0.5rem;
        padding: 1rem 1.5rem;

        box-shadow: 0 0 0px 0px #64ec6463;

        transition: border 1s cubic-bezier(0, 0.55, 0.45, 1);
    }

    form::before {
        content: '';
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;

        border-radius: 0.5rem;
        z-index: -1;

        transition: box-shadow 1s cubic-bezier(0, 0.55, 0.45, 1);
    }

    form.success {
        border: #64ec64e8 2px solid;
    }

    form.success::before {
        box-shadow: 0 0 20px 10px #64ec6463;
    }

    form.failure {
        border: #ec6464e8 2px solid;
    }

    form.failure::before {
        box-shadow: 0 0 20px 10px #ec646463;
    }

    form > * {
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
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        font-size: x-large;
        justify-content: center;
    }

    .output-code {
        display: none;
        margin-left: 5px;
    }

    .output-code.active {
        display: block;
    }

    .processing-box {
        display: none;
        position: relative;

        margin-left: 5px;
        color: transparent;

        background: #dadaee69;
        border-radius: 5px;
    }

    .processing-box.active {
        display: block;
    }

    .processing-box::after {
        content: '';
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(to right, transparent 0%, transparent 30%, #dadaeeba 50%, transparent 70%, transparent 100%);
        background-size: 400% 400%;
        border-radius: 5px;
        animation: 1.25s processing-anim infinite running ease-in-out;
    }

    @keyframes processing-anim {
        0% {
		    background-position: 100% 50%;
        }
        100% {
            background-position: 0% 50%;
        }
    }
</style>