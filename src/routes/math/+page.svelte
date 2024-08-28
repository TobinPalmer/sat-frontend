<script lang="ts">
    import {isMultipleChoice} from "$lib/types/guards";
    import 'mathlive'
    import DOMPurify from "isomorphic-dompurify";
    import QuestionManager from "$lib/QuestionManager";
    import type {Question,} from "$lib/types/response";
    import Modal from "$lib/components/Modal.svelte";

    let question: Question | undefined = undefined

    async function getQuestion() {
        question = await QuestionManager.getInstance().getQuestion({
            // type: QuestionType.ALGEBRA,
            // id: "2704399f"
        })
        return question
    }

    function handleClick(event: MouseEvent) {
        const target = event.target as HTMLElement;
        const choice = target.closest('.question') as HTMLButtonElement;
        if (choice) {
            for (const sibling of choice.parentElement!.children) {
                sibling.classList.remove('selected');
            }
            selected = choice
            selectedIdx = Array.from(choice.parentElement!.children).indexOf(choice)
            choice.classList.add('selected');
        }
    }

    function handleSubmit() {
        // const selected = document.querySelector('.selected');
        selected = document.querySelector('.selected')
        const correctAnswer = question?.correctAnswer;
        showModal = true
        if (selected) {
            console.log(selected.textContent, correctAnswer);
        }
    }

    let selected: HTMLButtonElement | null = null
    let selectedIdx: number | null = null
    $: showModal = false
</script>

<div>
    <Modal bind:showModal>
        {#if isMultipleChoice(question)}
            {#if selectedIdx === question.correctChoiceIndex}
<!--                Correct Answer {selected?.textContent}-->
                {question.correctAnswer[0]} is Correct!
            {:else}
                {String.fromCharCode('a'.charCodeAt(0) + (selectedIdx ?? 0))} is Incorrect!
                <br>
                The correct answer is {question.correctAnswer[0]}
                <br>
                {question.answer}
            {/if}
            {/if}
    </Modal>
    {#await getQuestion()}
        <p>...Loading</p>
    {:then question}
        <!--    eslint-disable-next-line svelte/no-at-html-tags -->
        {@html DOMPurify.sanitize(question.question)}
        {#if isMultipleChoice(question)}
            <div class="questions-wrapper">
                {#each question.choices as choice, i}
                    <button class="question choice-{i}" on:click={handleClick}>
                        <span>{String.fromCharCode('a'.charCodeAt(0) + i)}</span>
                        <!--    eslint-disable-next-line svelte/no-at-html-tags -->
                        {@html DOMPurify.sanitize(choice)}
                    </button>
                {/each}
            </div>
        {:else}
                <math-field style="width: 100%;"></math-field>
        {/if}
        <button class="submit" on:click={handleSubmit}>Submit</button>
    {:catch error}
        <p>{error.message}</p>
    {/await}

    <button on:click={() => location && location.reload()}>
    Next Question
    </button>
</div>

<style lang="scss">
  .question {
    margin-top: 1rem;
    display: flex;
    gap: 2rem;
    align-items: center;
    border: 1px solid red;
  }

  .question:first-child {
    margin-top: 0;
  }

  .question:hover {
    background-color: lightgray;
  }

  .questions-wrapper {
    border: 1px solid blue;
  }

  .question.selected {
    background-color: green;
  }
</style>