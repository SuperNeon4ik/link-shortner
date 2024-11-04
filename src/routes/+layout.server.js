import { env } from '$env/dynamic/private';

/** @type {import('./$types').LayoutServerLoad} */
export async function load() {
    return {
        git_url: env.GIT_URL,
        branch: env.GIT_BRANCH,
        commit_sha: env.VERCEL_GIT_COMMIT_SHA
    };
}