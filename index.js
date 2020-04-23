

const contentContainer = document.getElementById('container');
const filters = document.getElementById('filters');
const filterBar = document.getElementById('filterbar');
let filterList = []

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


// const addJobsToDOM = data => {
  
//     if (Array.isArray(data) && data.length > 0) {
//       data.map(data => {
//         renderJobs(data);
//       });
//     } else if (data) {
//       renderJobs(data);
//     }
//   };

function checkFilter(compareList) {
  return filterList.every((el) => compareList.indexOf(el) >= 0);
}
 

async function renderJobs() {
    contentContainer.innerHTML = ""
    const data = await getData();
    data.map(item => { 
      const infoNew = item.new ? `<div class="tag bg-light">New!</div>` : '';
      const infoFeatured = item.featured ? `<div class="tag bg-dark">Featured</div>` : '';
      const itemFilters = [item.role, item.level, ...(item.languages || []), ...(item.tools || [])];
      if (filterList.length === 0 || checkFilter(itemFilters)) {
      let filterContent = ''
      itemFilters.map((filter) => {
        filterContent += `<div class="filter" onclick="filter(this)" data-value="${filter}">${filter}</div>`;
        })
      
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
              ${filterContent}
            </div>
          </div>
        </div>`
      contentContainer.insertAdjacentHTML('beforeend', markup)
      }
  })
}

function renderFilterBar() {
  if (filterList.length === 0) {
    filterBar.classList.remove('show');
    filterBar.classList.add('hide');
  } else {
    filterBar.classList.remove('hide');
    filterBar.classList.add('show');
  }
  const filterBarContent = filterList.map(
    (filter) =>
      `<div class="filter-btn" data-value="${filter}" onclick="filter(this)"><p>${filter}</p><div><i class="fas fa-times"></i></div></div>`
  );
  filters.innerHTML = '';
  filterBarContent.map((item) => {
    filters.innerHTML += item;
  });
  renderJobs();
  
}

function filter(element) {
  const filterValue = element.getAttribute('data-value');

  if (filterList.includes(filterValue)) {
    filterList = filterList.filter((filter) => filter !== filterValue);
    renderFilterBar();
  } else {
    filterList.push(filterValue);
    renderFilterBar();
  }
}

document.getElementById('clear').addEventListener('click', () => {
  filterList = [];
  renderFilterBar();
});

(function () {
 renderJobs();
})();