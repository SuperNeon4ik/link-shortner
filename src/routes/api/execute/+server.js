import { validateUrl } from '$lib';
import { generateTarget } from '$lib/server/db';
import { error } from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
    const target = await request.text();
    
    if (!target || !validateUrl(target)) {
        error(422, {
            message: "Unprocessable Content"
        });
    }

    var codeResponse = await generateTarget(target);
    if (codeResponse.error) {
        error(500, {
            message: codeResponse.error,
            code: "INTERNAL_SERVER_ERROR"
        });
    }

    return new Response(codeResponse.result);
};