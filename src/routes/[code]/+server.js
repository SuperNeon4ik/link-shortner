import { error, redirect } from '@sveltejs/kit';
import { validateCode } from '$lib';
import { getTarget } from '$lib/server/db';

/** @type {import('./$types').RequestHandler} */
export async function GET({ params }) {
    if (!validateCode(params.code)) error(401);
    const target = await getTarget(params.code);
    if (target.error) {
        console.error(target.error);
        error(404, {
            message: 'Not found'
        });
    }

    redirect(301, target.result);

    return new Response();
};