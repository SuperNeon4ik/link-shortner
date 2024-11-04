// - needs to have a real tld
// - cannot just be a tld
// - needs to be http: or https:
// - can't be the "l.superneon4ik.me" domain
export function validateUrl(url) {
    const pattern = /^(https?:\/\/)(?!l\.superneon4ik\.me)([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/;
    return pattern.test(url);
}

export function validateCode(code) {
    const pattern = /^[A-Z0-9]{6}$/;
    return pattern.test(code);
}

// Test cases
function test() {
    console.log(validateUrl("https://example.com")); // true
    console.log(validateUrl("http://test.org")); // true
    console.log(validateUrl("http://l.superneon4ik.me")); // false
    console.log(validateUrl("https://.com")); // false
    console.log(validateUrl("ftp://example.com")); // false
    console.log(validateUrl("https://google")); // false
    console.log(validateUrl("https://google.fakeTLD")); // prefferably false
}