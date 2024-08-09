<script lang="ts">
    import {isMultipleChoice} from "$lib/types/guards";
    import DOMPurify from "isomorphic-dompurify";
    import QuestionManager, {QuestionType} from "$lib/QuestionManager";
    // import {onMount} from "svelte";
    // import type {Question} from "$lib/types/response";

    // let data: Question
    //
    // onMount(async () => {
    //     data = await QuestionManager.getInstance().getQuestion({
    //         type: QuestionType.ALGEBRA,
    //     })
    // })

    async function getQuestion() {
        return await QuestionManager.getInstance().getQuestion({
            // type: QuestionType.ALGEBRA,
            id: "2704399f"
        })
    }
    // const x = await res.json() as MultipleChoice | ShortAnswer
    // return {
    //     ...x
    // };

</script>

<div>
    {#await getQuestion()}
        <p>...Loading</p>
    {:then question}
        <!--    eslint-disable-next-line svelte/no-at-html-tags -->
        {@html DOMPurify.sanitize(question.question)}
        {#if isMultipleChoice(question)}
            {#each question.choices as choice, i}
                <div class="question choice-{i}">
                    <span>{String.fromCharCode('a'.charCodeAt(0) + i)}</span>
                    <!--    eslint-disable-next-line svelte/no-at-html-tags -->
                    <p>{@html DOMPurify.sanitize(choice)}</p>
                </div>
            {/each}
        {/if}
    {:catch error}
        <p>{error.message}</p>
    {/await}
</div>

<style lang="scss">
  .question {
    margin-top: 1rem;
    display: flex;
    gap: 2rem;
    align-items: center;
  }
</style>