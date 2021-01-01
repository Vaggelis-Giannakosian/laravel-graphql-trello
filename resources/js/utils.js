export function normalizeGQLErrors(err) {

    console.log(err.graphQLErrors)
    const hasInternal = errors => errors.some(e => e.internal);
    const replaceInternal = (errors, err) => hasInternal(errors) ? errors.filter(e => !e.internal).concat(err) : errors;

    return replaceInternal((err?.graphQLErrors || []).map(error => ({
        message: error.message,
        internal: Boolean(!error?.path?.length)
    })), {
        message: 'You must provide your email and password'
    })
}
