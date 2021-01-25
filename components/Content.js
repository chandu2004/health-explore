import styles from '../styles/Content.module.css'
import React, {useEffect, useState} from 'react';

export default function Content() {
    const[searchVal, setSearchVal] = useState("");
    const [sort, setSort] = useState([]);
    let _sortFields = [
        {
            field: 'city',
            order: ''
        },
        {
            field: 'job_title',
            order: ''
        },
        {
            field: 'experience',
            order: ''
        }
    ];
    const [sortFields, setSortFields] = useState(_sortFields);
    const initFilter = {
        job_type: [],
        department: [],
        work_schedule: [],
        experience: []
    }
    const [filters, setFilters] = useState(initFilter);

    const init = {
        jobs: []
    };
    const [jobs, setJobs] = useState(init);

    const fetchFilters = async () => {
        const res = await fetch('http://localhost:3000/api/filters')
        const data = await res.json()
        setFilters(data)
    };

    const fetchJobs = async () => {
        let endpoint = 'http://localhost:3000/api/jobs';
        endpoint = endpoint + '?search=' + searchVal
        let sortVal = "&&sort=";
        if(sort.length > 0) {
            sortVal = sortVal + encodeURIComponent(JSON.stringify(sort));
        } 
        endpoint = endpoint + sortVal;
        const res = await fetch(endpoint)
        const data = await res.json()
        setJobs(data)
    };

    const changeInput = (searchStr) => {
        setSearchVal(searchStr);
    }

    const changeSort = (field) => {
        for(let i=0; i<sortFields.length; i++) {
            if(sortFields[i]['field'] == field) {
                let up_doc = document.getElementById(field +"-up");
                let down_doc = document.getElementById(field +"-down");

                if(sortFields[i]['order'] == "") {
                    sortFields[i]['order'] = "asc";
                    setSortFields(sortFields);
                    up_doc.className += " d-inline-block";
                    down_doc.classList.remove('d-inline-block');
                } else if(sortFields[i]['order'] == "asc") {
                    sortFields[i]['order'] = "dsc";
                    setSortFields(sortFields);
                    down_doc.className += " d-inline-block";
                    up_doc.classList.remove('d-inline-block');
                } else {
                    sortFields[i]['order'] = "";
                    setSortFields(sortFields);
                    down_doc.classList.remove('d-inline-block');
                    up_doc.classList.remove('d-inline-block');
                }
                break;
            }
        }
        var _sort = sort.filter(s => s['field'] != field);
        let option = {
            field: field
        }
        for(let i=0; i< sortFields.length; i++) {
            if(sortFields[i]['field'] == field){
                option['order'] = sortFields[i]['order'];
            }
        }
        if(option['order'] != "") {
            _sort.push(option);
        }
        setSort(_sort);
    }
    
    const diff_months = (dt2, dt1) => {
        var diff =(dt2.getTime() - dt1.getTime()) / 1000;
        diff /= (60 * 60 * 24 * 7 * 4);
        return Math.abs(Math.round(diff));
    }
    
    useEffect(() => {
        fetchFilters();
        fetchJobs();
      }, [sort, searchVal]);

    return (
        <React.Fragment>
        <div className={`${styles.search} row my-1 mx-0 m-sm-4 p-2`}>
            <div className="input-group">
                <span className="input-group-append">
                    <div className="input-group-text bg-transparent border-0"><i className="fa fa-search"></i></div>
                </span>
                <input className={`${styles.input} form-control border-0`} type="search" placeholder="Search for any job, title, keyword or company" id="example-search-input" onChange={e => changeInput(e.target.value)} />
            </div>
        </div>

        <div className={`row my-1 mx-0 m-sm-4 m-sm-4`}>
            <div className={`col-sm-3 col-12 d-none d-sm-block`}>
                <div className={` ${styles.content} row pl-2 pr-2 mr-2 mb-4`}>
                    <h6 className="w-100 pt-2 pl-2">JOB TYPE</h6>
                    {filters.job_type.map((type) => (
                    <p role='button' className={`${styles.font} w-100 pl-2`} key={type.key}>{type.key}<span className="ml-2 text-secondary">{type.doc_count}</span></p>
                    ))}
                </div>
                <div className={`${styles.content} row pl-2 pr-2 mt-2 mr-2 mb-4`}>
                    <h6 className="w-100 pt-2 pl-2">DEPARTMENT</h6>
                    {filters.department.slice(0, 10).map((dept) => (
                    <p role='button' className={`${styles.font} w-100 pl-2`} key={dept.key}>{dept.key}<span className="ml-2 text-secondary">{dept.doc_count}</span></p>
                    ))}
                    <a className=" pl-2 mb-2" data-toggle="modal" data-target="#departmentModal">
                        show more
                    </a>
                </div>
                <div className={`${styles.content} row pl-2 pr-2 mt-2 mr-2 mb-4`}>
                    <h6 className="w-100 pt-2 pl-2">WORK SCHEDULE</h6>
                    {filters.work_schedule.map((schedule) => (
                    <p role='button' className={`${styles.font} w-100 pl-2`} key={schedule.key}>{schedule.key}<span className="ml-2 text-secondary">{schedule.doc_count}</span></p>
                    ))}
                </div>
                <div className={`${styles.content} row pl-2 pr-2 mt-2 mr-2 mb-0`}>
                    <h6 className="w-100 pt-2 pl-2">EXPERIENCE</h6>
                    {filters.experience.map((exp) => (
                    <p role='button' className={`${styles.font} w-100 pl-2`} key={exp.key}>{exp.key}<span className="ml-2 text-secondary">{exp.doc_count}</span></p>
                    ))}
                </div>
            </div>
            <div className={`${styles.content} col-sm-9 col-12`}>
                <p className={`${styles.font} my-4`}>{jobs.count} job postings<span className={`${styles.sort} d-none d-sm-block text-secondary`}>sort by <span className="text-dark mx-2" onClick={() => changeSort('city')} role="button">Location<i id="city-up" className={`fa fa-arrow-up text-secondary ml-1 d-none`}></i><i id="city-down" className={`fa fa-arrow-down text-secondary ml-1 d-none`}></i></span><span className="text-dark mx-2" onClick={() => changeSort('job_title')} role="button">Role<i id="job_title-up" className={`fa fa-arrow-up text-secondary ml-1 d-none`}></i><i id="job_title-down" className={`fa fa-arrow-down text-secondary ml-1 d-none`}></i></span><span className="text-dark ml-2" onClick={() => changeSort('experience')} role="button">Experience<i id="experience-up" className={`fa fa-arrow-up text-secondary ml-1 d-none`}></i><i id="experience-down" className={`fa fa-arrow-down text-secondary ml-1 d-none`}></i></span></span></p>
                {jobs.jobs.map((job, jobIndex) => (
                    <React.Fragment key={job.name}>
                        <div className="row" role='button' key={job.name} id={job.name}>
                            <div className="col-sm-1 col-2 ml-sm-2 my-auto">
                                <div className={`${styles.namePlate} bg-secondary text-white rounded py-2`}>{job.name.substring(0,2).toUpperCase()}</div>
                            </div>
                            <div className="col-sm-10 col-10 my-2 py-2"><a className="text-dark text-decoration-none" data-toggle="collapse" href={"#collapseExample" + jobIndex}>{job.items.length} {job.items.length > 1 ? 'jobs for' : 'job for'} {job.name}</a></div>
                        </div>
                        <div className="collapse" id={"collapseExample" + jobIndex}>
                            {job.items.map((item) => (
                                <div className="row border-top px-0 py-2 mx-2" key={item.job_id}>
                                    <div className="col-12 px-0"><h6><a className="text-dark text-decoration-none" data-toggle="collapse" href={"#collapseExample" + item.job_id}>{item.job_title}</a></h6></div>
                                    <div className="col-12 px-0 mb-0 pb-0 col-sm-10"><p className={`${styles.font} mb-0`}>{item.job_type} | ${item.salary_range[0]}-{item.salary_range[1]} an hour | {item.city}</p></div>
                                    <div className="col-12 px-0 col-sm-2"><p className={`${styles.font} float-sm-right`}>{diff_months(new Date(), new Date(item.created))} months ago</p></div>
                                    <div className="row collapse" id={"collapseExample" + item.job_id}>
                                        <div className="col-12 pr-0 col-sm-3">
                                            <h6 className="mb-0">Department:</h6>
                                        </div>
                                        <div className="col-12 px-sm-0 px-2 ml-2 ml-sm-0 col-sm-5">
                                            <p className={styles.font}>{item.department.map((dept, index) => (
                                                <span key={dept}>{(index ? ', ' : '') + dept}</span>
                                            ))}</p>
                                        </div>
                                        <div className="col-12 pr-0 col-sm-4"></div>
                                        <div className="col-12 pr-0 col-sm-3">
                                            <h6 className="mb-0">Hours / shifts:</h6>
                                        </div>
                                        <div className="col-12 px-sm-0 px-2 ml-2 ml-sm-0 col-sm-5">
                                            <p className={styles.font}>{item.hours[0]} hours / {item.work_schedule}</p>
                                        </div>
                                        <div className="col-12 px-0 col-sm-1"></div>
                                        <div className="col-12 px-0 col-sm-3">
                                            <button className="btn btn-primary py-0 mr-2 rounded float-sm-right d-none d-sm-block">Job Details</button>
                                        </div>
                                        <div className="col-12 pr-0 col-sm-3">
                                            <h6 className="mb-0">Summary:</h6>
                                        </div>
                                        <div className="col-12 px-sm-0 px-2 ml-2 ml-sm-0 col-sm-5">
                                            <p className={styles.font}>{item.description}</p>
                                        </div>
                                        <div className="col-12 px-0 col-sm-1"></div>
                                        <div className="col-12 px-0 col-sm-3">
                                            <button className="btn btn-outline-primary py-0 mr-2 rounded float-sm-right d-none d-sm-block">Save job</button>
                                        </div>
                                        <div className="col-12 px-sm-0 px-2 ml-2 ml-sm-0 d-block d-sm-none">
                                            <button className="btn btn-primary py-1 mr-2 rounded float-sm-right">Job Details</button>
                                            <button className="btn btn-outline-primary py-1 rounded float-sm-right">Save job</button>
                                        </div>
                                    </div>
                
                                </div>
                            ))}
                        </div>
                    </React.Fragment>
                ))}
            </div>
        </div>

        <div className="modal fade" id="departmentModal" tabIndex="-1" role="dialog" aria-labelledby="departmentModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-xl" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="departmentModalLabel">Department</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <div className="row">
                        {filters.department.map((dept) => (
                            <div className="col-3" key={dept.key}>
                                <p role='button' className={`${styles.font} w-100 pl-2`} key={dept.key}>{dept.key}<span className="ml-2 text-secondary">{dept.doc_count}</span></p>
                            </div>
                        ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </React.Fragment>
    )
}