import { GIT_URL, CF_PAGES_BRANCH, CF_PAGES_COMMIT_SHA } from '$env/static/private';

/** @type {import('./$types').LayoutServerLoad} */
export async function load() {
    return {
        git_url: GIT_URL,
        cf_branch: CF_PAGES_BRANCH,
        cf_commit_sha: CF_PAGES_COMMIT_SHA
    };
}