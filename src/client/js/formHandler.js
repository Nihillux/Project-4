async function handleSubmit(event, agreement, subjectivity, confidence, error, text) {
    event.preventDefault();
  
    if (text.value.length < 1) {
      alert("Please input some text first.");
    } else {
      const response = await fetch("http://localhost:8081/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: text.value,
        }),
        credentials: "same-origin",
      });
      try {
        const data = await response.json();
        console.log(response);
        if( data.agreement === undefined) {
            agreement.innerHTML = "";
            subjectivity.innerHTML = "";
            confidence.innerHTML = "";
            error.innerHTML = "Please try again with a longer text.";
        }
        else{
            agreement.innerHTML = data.agreement;
            subjectivity.innerHTML = data.subjectivity
            confidence.innerHTML = data.confidence;
            error.innerHTML = "";
        }
      } catch (error) {
        console.log(error);
        error.innerHTML = "Something went wrong!";
      }
    }
  }

export { handleSubmit }