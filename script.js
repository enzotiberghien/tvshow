const form = document.querySelector("#searchForm")
const container = document.querySelector("#container")
form.addEventListener("submit", async function(e) {
    e.preventDefault();
    deleteImgs();
    const searchTerm = form.elements.query.value;
    const res = await axios.get(`http://api.tvmaze.com/search/shows?q=${searchTerm}`);
    makeImages(res.data);
    form.elements.query.value = ""
})

const makeImages = (shows) => {
    for(let result of shows) {
        if (result.show.image) {
            const link = document.createElement("a");
            const searchTerm = form.elements.query.value;
            link.href = `https://www.google.com/search?q=${result.show.name}`;
            link.target = "_blank";
            container.append(link);
            const img = document.createElement("img");
            img.src = result.show.image.medium
            link.append(img)
        }  
    }
}

const deleteImgs = () => {
    const anchors = document.querySelectorAll('a');
     for(let anchor of anchors){
        anchor.remove();
     }
    }