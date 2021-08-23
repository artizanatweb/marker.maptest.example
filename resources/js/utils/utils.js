export const createFormErrorsObject = (responseData) => {
    const errorsObject = {};

    if (responseData && responseData.hasOwnProperty('errors')) {
        Object.keys(responseData.errors).forEach((field) => {
            errorsObject[field] = responseData.errors[field][0];
        });
    }

    return errorsObject;
}
