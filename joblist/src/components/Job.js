import React, { useState } from 'react';
import { Card, Badge, Button, Collapse } from 'react-bootstrap';
import ReactMarkdown from 'react-markdown';

const Job = ({ job }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => setIsOpen(prevIsOpen => !prevIsOpen);

  return (
    <Card className='mt-3'>
      <Card.Body>
        <div className='d-flex justify-content-between'>
          <div>
            <Card.Title>
              {job.title} -{' '}
              <span className='text-muted font-weight-light'>
                {job.company}
              </span>
            </Card.Title>
            <Card.Subtitle className='text-muted mb-2'>
              {new Date(job.created_at).toLocaleDateString()}
            </Card.Subtitle>
            <Badge variant='secondary' className='mr-2'>
              {job.type}
            </Badge>
            <Badge variant='secondary'>{job.location}</Badge>
            <div style={{ wordBreak: 'break-all ' }}>
              <ReactMarkdown source={job.how_to_apply} />
            </div>
          </div>
          <img
            className='d-none d-md-block'
            height='50'
            alt={job.company}
            src={job.company_logo}
          />
        </div>
        <Card.Text>
          <Button onClick={handleClick} variant='primary'>
            {isOpen ? 'Hide Details' : 'View Details'}
          </Button>
        </Card.Text>
        <Collapse in={isOpen}>
          <div className='mt-4'>
            <ReactMarkdown source={job.description} />
          </div>
        </Collapse>
      </Card.Body>
    </Card>
  );
};

export default Job;
