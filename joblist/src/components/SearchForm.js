import React from 'react';
import { Form, Col } from 'react-bootstrap';

const SearchForm = ({
  params,
  onParamChange,
  searchText,
  onSearchTextChange
}) => {
  return (
    <Form className='mt-4'>
      <Form.Row className='align-items-end'>
        <Form.Group controlId='formDescription' as={Col}>
          <Form.Label>Description</Form.Label>
          <Form.Control
            type='text'
            name='description'
            placeholder='Enter description'
            onChange={onSearchTextChange}
            onKeyPress={onParamChange}
            value={searchText.description}
          />
        </Form.Group>
        <Form.Group controlId='formLocation' as={Col}>
          <Form.Label>Location</Form.Label>
          <Form.Control
            type='text'
            name='location'
            placeholder='Enter Location'
            onChange={onSearchTextChange}
            onKeyPress={onParamChange}
            value={searchText.location}
          />
        </Form.Group>
        <Form.Group
          controlId='formBasicCheckbox'
          as={Col}
          xs='auto'
          className='ml-2'
        >
          <Form.Check
            type='checkbox'
            onChange={onParamChange}
            value={params.full_time}
            name='full_time'
            label='Only Full Time'
            className='mb-2'
          />
        </Form.Group>
      </Form.Row>
    </Form>
  );
};

export default SearchForm;
