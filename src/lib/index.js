// - needs to have a real tld
// - cannot just be a tld
// - needs to be http: or https:
// - can't be the "l.superneon4ik.me" domain
export function validateUrl(target) {
    try {
        let url = new URL(target);
        return (url.protocol === "http:" || url.protocol === "https:") && url.hostname != 'l.superneon4ik.me';
    } catch {
        return false;  
    }
}

export function validateCode(code) {
    const pattern = /^[A-Z0-9]{6}$/;
    return pattern.test(code);
}