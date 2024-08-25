<script lang="ts">
    import {isMultipleChoice} from "$lib/types/guards";
    import 'mathlive'
    import DOMPurify from "isomorphic-dompurify";
    import QuestionManager from "$lib/QuestionManager";

    async function getQuestion() {
        return await QuestionManager.getInstance().getQuestion({
            // type: QuestionType.ALGEBRA,
            // id: "2704399f"
        })
    }
    // const x = await res.json() as MultipleChoice | ShortAnswer
    // return {
    //     ...x
    // };
    function handleClick(event: MouseEvent) {
        const target = event.target as HTMLElement;
        const choice = target.closest('.question') as HTMLButtonElement;
        if (choice) {
            for (const sibling of choice.parentElement!.children) {
                sibling.classList.remove('selected');
            }
            choice.classList.add('selected');
        }
    }

    function handleSubmit() {
        const selected = document.querySelector('.selected');
        if (selected) {
            console.log(selected.textContent);
        }
    }

</script>

<div>
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
<!--            <input type="text" placeholder="Enter your answer here" />-->
            <math-field>f(x)=</math-field>
        {/if}
        <button class="submit" on:click={handleSubmit}>Check</button>
        <p>ANSWER: ||{question.correctAnswer}||</p>
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