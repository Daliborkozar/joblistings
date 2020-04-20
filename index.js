

const contentContainer = document.getElementById('container');

 async function getData(){
    try {
        const res = await axios('./data.json')
        const joblist = res.data
        console.log(joblist)
        return joblist
    }catch(error) {
        alert(error)
    }
};


const addJobsToDOM = data => {
  
    if (Array.isArray(data) && data.length > 0) {
      data.map(todo => {
        renderJobs(todo);
      });
    } else if (data) {
      renderJobs(data);
    }
  };

const renderJobs = item => {
    const infoNew = item.new ? `<div class="tag bg-light">New!</div>` : '';
    const infoFeatured = item.featured ? `<div class="tag bg-dark">Featured</div>` : '';
    const markup =`<div class="card">
         <img src="${item.logo}" alt="logo-${item.company}"/>
         <div class="grid-item">
           <div class="info">
             <div class="info-heading">
               <h6>${item.company}</h6>
               ${infoNew}
               ${infoFeatured}
             </div>
             <h4>${item.position}</h4>
             <div class="info-status">
               <div class="status">${item.postedAt} &centerdot;
               </div>
               <div class="status">${item.contract} &centerdot;
               </div>
               <div class="status">${item.location}</div>
             </div>
           </div>
           <hr class="divider">
           <div class="filters">
             filterContent
           </div>
         </div>
       </div>`
    contentContainer.insertAdjacentHTML('beforeend', markup)
}

const main = async () => {
    addJobsToDOM(await getData());
  };
  
  main()