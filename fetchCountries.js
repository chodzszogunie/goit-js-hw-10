async function countries (name) {
    try{
        const response = await fetch('https://restcountries.com/v3.1/name/{name}');
        const data = await response.json();
        return data;

    } catch (error){
        throw new error ("Oops, coś poszło nie tak. Spróbuj ponownie później.");
    }
}
export {countries};