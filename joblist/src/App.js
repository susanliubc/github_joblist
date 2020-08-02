import React, { useState, useCallback, useRef } from 'react';
import './App.css';
import { Container } from 'react-bootstrap';
import SearchForm from './components/SearchForm';
import useFetchJobs from './utils/hooks/useFetchJobs';
import { debounce } from 'throttle-debounce';
import Job from './components/Job';

function App() {
  const [params, setParams] = useState({
    description: '',
    location: '',
    full_time: false
  });
  const [searchText, setSearchText] = useState({
    description: '',
    location: ''
  });
  const [page, setPage] = useState(1);
  const { jobs, loading, error, hasNextPage } = useFetchJobs(params, page);

  console.log('jobs', jobs);
  console.log('params', params);

  const handleParamChange = event => {
    event.persist();

    setPage(1);

    if (event.charCode === 13 && event.target.name !== 'full_time') {
      if (event.target.name === 'description') {
        console.log('description');
        delayedQueryDescription(event.target.value);
      } else if (event.target.name === 'location') {
        console.log('location');
        delayedQueryLocation(event.target.value);
      }
    } else if (event.target.name === 'full_time') {
      setParams(params => ({
        ...params,
        [event.target.name]: !params['full_time']
      }));
    }
  };

  const handleSearchTextChange = event => {
    setPage(1);

    setSearchText(text => ({
      ...text,
      [event.target.name]: event.target.value
    }));
  };

  const delayedQueryDescription = useRef(
    debounce(300, q =>
      setParams(params => ({
        ...params,
        description: q
      }))
    )
  ).current;

  const delayedQueryLocation = useRef(
    debounce(300, q =>
      setParams(params => ({
        ...params,
        location: q
      }))
    )
  ).current;

  return (
    <Container className='my-4'>
      <h1 className='mt-4 text-center text-info'>Github Joblist</h1>
      <SearchForm
        params={params}
        onParamChange={handleParamChange}
        searchText={searchText}
        onSearchTextChange={handleSearchTextChange}
      />
      {loading && <h2>Page loading</h2>}
      {error && (
        <h2 className='text-danger'>Error occurs. Please refresh the page</h2>
      )}
      {jobs && jobs.map(job => <Job key={job.id} job={job} />)}
    </Container>
  );
}

export default App;
