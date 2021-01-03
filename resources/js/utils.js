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


export const colorMap500 = {
    teal: 'bg-teal-500',
    orange: 'bg-orange-500',
    gray: 'bg-gray-500',
    yellow: 'bg-yellow-500',
    purple: 'bg-purple-500',
    red: 'bg-red-500',
    green: 'bg-green-500',
    blue: 'bg-blue-500',
    indigo: 'bg-indigo-500',
}


