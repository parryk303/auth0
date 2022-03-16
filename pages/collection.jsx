import React from 'react';

import { useState, useEffect } from 'react';
import fetch from 'isomorphic-unfetch';
import SsaCollection from '../components/SsaCollection';

export default function Collection(props) {

  const [content, setContent] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('/api/collection');
      const json = await res.json();
      if (json.success) {
        setContent(json.data);
      }
    };
    fetchData();
  },);

  

 

  return (
    <>
        <div className='mb-5'>
          <div>
            {content && (
              <SsaCollection ssaCollection={content} />
            )}
          </div>
        </div>
    </>
  );
};

