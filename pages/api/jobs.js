import jobs from '../../data/jobs'

export default async (req, res) => {
  let _jobs = [];
  res.statusCode = 200;
  // @todo: implement filters and search
  if(req.query.search) {
    const searchVal = req.query.search.toLowerCase();
    _jobs = searchJobs(searchVal, jobs);
  } else {
    _jobs = jobs.slice();
  }

  if(req.query.sort) {
    var sorts = JSON.parse(req.query.sort);
    _jobs = sortJobs(sorts, _jobs);
  }

  if(req.query.filters) {
    var filters = JSON.parse(req.query.filters);
    _jobs = filterJobs(filters, _jobs);
  }


  // this timeout emulates unstable network connection, do not remove this one
  // you need to figure out how to guarantee that client side will render
  // correct results even if server-side can't finish replies in the right order
  await new Promise((resolve) => setTimeout(resolve, 1000 * Math.random()))
  var count = getJobsCount(_jobs);
  res.json({jobs: _jobs, count: count})
}

function getJobsCount(jobs) {
  var count = 0;
  for(let i=0; i< jobs.length; i++) {
    count = count + jobs[i].items.length;
  }
  return count;
}

function sortJobs(options, jobs) {
  let _jobs = jobs.slice();

  for(let j=0; j<options.length; j++) {
    var sort = options[j];
    if(j == 0) {
      for(let i=0; i< _jobs.length; i++) {
        let job = _jobs[i];
        let sorted_items = [];
        if(sort['order'] == "asc") {
          sorted_items = job.items.sort((a, b) => (a[sort['field']] > b[sort['field']]) ? 1: -1);
        } else if(sort['order']=="dsc"){
          sorted_items = job.items.sort((a, b) => (a[sort['field']] < b[sort['field']]) ? 1: -1);
        } else {
          sorted_items = job.items;
        }
        _jobs[i].items = sorted_items;
      }
      if(sort['order'] == "asc") {
        _jobs = _jobs.sort((a,b) => (a['items'][0][sort['field']] > b['items'][0][sort['field']]) ? 1: -1);
      } else if(sort['order'] == "dsc") {
        _jobs = _jobs.sort((a,b) => (a['items'][0][sort['field']] < b['items'][0][sort['field']]) ? 1: -1);
      }
    } else {
      //secondary sort implementation
      for(let i=0; i< _jobs.length; i++) {
        let job = _jobs[i];
        let sorted_items = [];
        if(options[j]['order'] == "asc") {
          sorted_items = job.items.sort((a, b) => a[options[j-1]['field']].localeCompare(b[options[j-1]['field']]) || a[options[j]['field']].localeCompare(b[options[j]['field']]))

        } else if(options[j]['order']=="dsc"){
          sorted_items = job.items.sort((a, b) => b[options[j-1]['field']].localeCompare(a[options[j-1]['field']]) || b[options[j]['field']].localeCompare(a[options[j]['field']]))
        } else {
          sorted_items = job.items;
        }
        _jobs[i].items = sorted_items;
      }
    }
  }
  return _jobs;
} 

function searchJobs(searchVal, jobs) {
  let job_ids = [];
  let _jobs = [];
    jobs.filter((job) => {
      job.items.filter((item) => {
        var found = Object.keys(item).some(key => item[key].toString().toLowerCase().search(searchVal) !== -1);
        if(found) {
          job_ids.push(item.job_id);
        }
      })
    })
    for(let i = 0; i < jobs.length; i++) {
      var _items = jobs[i].items.filter((item) => {
        return (job_ids.indexOf(item.job_id) > -1);
      })
      if(_items.length > 0) {
        let _job = {
          total_jobs_in_hospital: jobs[i]['total_jobs_in_hospital'],
          name: jobs[i]['name'],
          job_title: jobs[i]['job_title'],
          items: _items
        }
        _jobs.push(_job);
      }
    }
    return _jobs;
}

function filterJobs(filters, jobs) {
  let _job_ids = [];
  let _jobs = [];
  for(let i=0; i < filters.length; i++) {
    jobs.filter((job) => {
      job.items.filter((item) => {
        if(filters[i]['field'] == 'department') {
          if(item[filters[i]['field']].includes(filters[i]['value']) && !_job_ids.includes(item.job_id)) {
            _job_ids.push(item.job_id);
          }
        } else {
          if(item[filters[i]['field']] == filters[i]['value'] && !_job_ids.includes(item.job_id)) {
            _job_ids.push(item.job_id);
          }
        }
      })
    })
  }

  for(let i = 0; i < jobs.length; i++) {
    var _items = jobs[i].items.filter((item) => {
      return (_job_ids.indexOf(item.job_id) > -1);
    })
    if(_items.length > 0) {
      let _job = {
        total_jobs_in_hospital: jobs[i]['total_jobs_in_hospital'],
        name: jobs[i]['name'],
        job_title: jobs[i]['job_title'],
        items: _items
      }
      _jobs.push(_job);
    }
  }
  return _jobs;
}