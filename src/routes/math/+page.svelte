<script lang="ts">
    import type { PageData } from './$types';
    import {isMultipleChoice} from "$lib/types/guards";
    import DOMPurify from "isomorphic-dompurify";

    export let data: PageData;
</script>

<div>
    <!--    eslint-disable-next-line svelte/no-at-html-tags -->
    {@html DOMPurify.sanitize(data.question)}

    {#if isMultipleChoice(data)}
        {#each data.choices as choice, i}
            <div class="question choice-{i}">
                <span>{String.fromCharCode('a'.charCodeAt(0) + i)}</span>
                <!--    eslint-disable-next-line svelte/no-at-html-tags -->
                <p>{@html DOMPurify.sanitize(choice)}</p>
            </div>
        {/each}
    {/if}
</div>

<style lang="scss">
  .question {
    margin-top: 1rem;
    display: flex;
    gap: 2rem;
    align-items: center;
  }
</style>