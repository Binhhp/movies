
export const axiosMethods = {
    GET: "GET",
    POST: "POST",
    PUT: "PUT",
    PATCH: "PATCH",
    DELETE: "DELETE"
}

export const errorResponse = (error) => {
    return {
        ...error.response
    }
}