export const checkHasToken = () => {
    return localStorage.getItem("token");
}

export const redirectToLugares = () => {
    if(localStorage.getItem('user_id') === '9'){
        window.location.href = '/lugares';
    }
}
