const roll_num = document.querySelector(".roll_num");
const btn = document.querySelector(".btn");
const pdfLink = document.querySelector("#pdf_link");

btn.addEventListener("click", async () => {
  try {
    const data = await fetch(`/generate-pdf/${roll_num.value}`, {
      method: "GET",
    });
    const jsonData = await data.json();

    if (data.status == 400) {
      return alert(jsonData.error);
    }
    pdfLink.classList.remove("d-none");
    pdfLink.setAttribute("href", jsonData.pdfUrl);
  } catch (error) {
    alert(error.message);
  }
});
