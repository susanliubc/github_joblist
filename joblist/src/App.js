import React, { useState } from 'react';
import './App.css';
import { Container } from 'react-bootstrap';
import SearchForm from './components/SearchForm';
import useFetchJobs from './utils/hooks/useFetchJobs';
import Job from './components/Job';

function App() {
  const [params, setParams] = useState({});
  const [page, setPage] = useState(1);
  const { jobs, loading, error, hasNextPage } = useFetchJobs(params, page);

  const handleParamChange = e => {
    setPage(1);
    setParams(prevParams => ({
      ...prevParams,
      [e.target.name]: e.target.value
    }));
  };

  console.log('jobs', jobs);

  return (
    <Container className='my-4'>
      <h1 className='mt-4 text-center text-info'>Github Joblist</h1>
      {/* <SearchForm params={params} onParamChange={handleParamChange} /> */}
      {loading && <h2>Page loading</h2>}
      {error && (
        <h2 className='text-danger'>Error occurs. Please refresh the page</h2>
      )}
      {jobs && jobs.map(job => <Job key={job.id} job={job} />)}
    </Container>
  );
}

export default App;
