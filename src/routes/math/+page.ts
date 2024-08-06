import type { PageLoad } from './$types';
import {url} from "$lib";
import type {MultipleChoice, ShortAnswer} from "$lib/types/response";

export const load: PageLoad = async ({fetch}) => {
    const res = await fetch(url + "/math")
    const x = await res.json() as MultipleChoice | ShortAnswer
    return {
        ...x
    };
};