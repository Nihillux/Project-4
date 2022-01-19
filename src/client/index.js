import { checkForName } from './js/nameChecker'
import { handleSubmit } from './js/formHandler'

import './styles/base.scss'
import './styles/footer.scss'
import './styles/form.scss'
import './styles/header.scss'
import './styles/resets.scss'

const agreement = document.getElementById("agreement");
const subjectivity = document.getElementById("subjectivity");
const confidence = document.getElementById("confidence");
const error = document.getElementById("error");
let text = document.getElementById("text");
const form = document.getElementById("form");

form.addEventListener("submit", (evt) => {
    return handleSubmit(evt, agreement, subjectivity, confidence, error, text);
  });

export {
    checkForName,
    handleSubmit
}