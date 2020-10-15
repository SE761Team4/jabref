const MAX_LENGTH = 20;

// function for limiting text length in table and nodes
export function renderText(text) {
    if(text){
        if(text.length > MAX_LENGTH) {
            return `${text.substring(0, MAX_LENGTH - 3)}...` 
        } else {
            return text;
        }
    }

}