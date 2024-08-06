<script lang="ts">
    import type { PageData } from './$types';

    export let data: PageData;
    // const url = "http://127.0.0.1:5000"

    // onMount(async () => {
    //     const data = await getData()
    //     if (isShortAnswer(data)) {
    //         console.log(data.answer)
    //     }
    //     if (isMultipleChoice(data)) {
    //         console.log(data.choices)
    //     }
    // })

    // async function getData(): Promise<MultipleChoice | ShortAnswer> {
    //     const res = await fetch(url + "/math")
    //     return res.json()
    // }
</script>

<div>
<!--    eslint-disable-next-line svelte/no-at-html-tags -->
    {@html data.question}
</div>