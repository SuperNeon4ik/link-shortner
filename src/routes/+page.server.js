import { WEBSITE_DOMAIN } from '$env/static/private';

/** @type {import('./$types').PageServerLoad} */
export async function load() {
    return {
        domain: WEBSITE_DOMAIN
    };
};