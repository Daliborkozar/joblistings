const fetchListing = () => {
    axios.get('data.json')
        .then(response => {
            const jobLists = response.data;
            console.log(`GET job listing`, jobLists);
        })
        .catch(error => console.error(error));
};

fetchListing() 