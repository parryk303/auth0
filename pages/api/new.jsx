import { useState, useEffect } from 'react';
import fetch from 'isomorphic-unfetch';
import { Form } from 'semantic-ui-react';
import { useRouter } from 'next/router';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export default function New() {
  const [form, setForm] = useState({
    title: '',
    NextGenSOC: [],
    SocKPI: [],
    UtilizationNormalization: [],
    UseCase: [],
    Enrichment: [],
    Itp: [],
    ThreatHunting: [],
    VulnerabilityManagment: [],
    ThreatIntelligence: [],
    DataMasking: [],
    Soar: [],
    Process: [],
    SocStaff: [],
    TrainingAccredidation: [],
    Dfir: [],
    FraudPrevention: [],
    RedBluePurple: [],
    SecurityMangement: [],
    Risk: [],
    OnCall: [],
    PhysicalSecurity: [],
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const router = useRouter();

  useEffect(() => {
    const createSSA = async () => {
      try {
        const res = await fetch('/api/collection', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(form)
        })
        router.push('/collection');
      } catch (error) {
        console.log(error);
      }
    }
    if (isSubmitting) {
      if (Object.keys(errors).length === 0) {
        createSSA();
      }
      else {
        setIsSubmitting(false);
      }
    }
  }, [errors, isSubmitting, form, router])

  const handleChange = (e) => {
    setForm({
        ...form,
        [e.target.name]: e.target.value
    })
}

  const handleSubmit = (e) => {
    e.preventDefault();
    let errs = validate();
    setErrors(errs);
    setIsSubmitting(true);
  }

  const validate = () => {
    let err = {};

    if (!form.title) {
      err.title = 'Title is required';
    }

    return err;
  }

  return (
    <>
        <div className='mb-5' data-testid='newSSA'>
          <h1 data-testid='newSSA-title'>New SSA</h1>
          <div data-testid='newSSA-text'>
            <Form onSubmit={handleSubmit}>
              <TextField
                required
                id='outlined-required'
                label='Customer Name'
                error={errors.title ? { content: 'Please enter a title', pointing: 'below' } : null}
                placeholder='Customer Name'
                name='title'
                onChange={handleChange}
              />
              <Button id='create' type='submit' onClick={handleSubmit}>Create</Button>
            </Form>
          </div>
        </div>
    </>
  );
};