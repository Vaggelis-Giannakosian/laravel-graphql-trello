export function normalizeGQLErrors(err) {

    const hasInternal = errors => errors.some(e => e.internal);
    const replaceInternal = (errors, err) => hasInternal(errors) ? errors.filter(e => !e.internal).concat(err) : errors;

    if(err?.networkError && err?.networkError.statusCode === 419){
        throw new AuthenticationError('Unauthenticated')
    }

    return replaceInternal((err?.graphQLErrors || []).map(error => {

        if("validation" === error.extensions?.category)
        {
            const validationErrors = error.extensions.validation || {}
            return Object.keys( validationErrors )
                .flatMap(key=> validationErrors[key])
                .map(e=>({
                    message: e.replace('input.',''),
                    internal: false
                }));
        }

        return {
            message: error.message,
            internal: Boolean(!error?.path?.length)
        }

    }), {
        message: 'You must provide your email and password'
    }).flat()
}


export class AuthenticationError extends Error{}
