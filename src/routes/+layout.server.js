import { env } from '$env/dynamic/private';

/** @type {import('./$types').LayoutServerLoad} */
export async function load() {
    return {
        git_url: env.GIT_URL,
        branch: env.GIT_BRANCH,
        commit_sha: env.VERCEL_GIT_COMMIT_SHA,
        branding: {
            title: env.BRANDING_TITLE,
            author: env.BRANDING_AUTHOR,
            author_website: env.BRANDING_AUTHOR_WEBSITE,
            report_abuse_email: env.BRANDING_REPORT_ABUSE_EMAIL
        }
    };
}