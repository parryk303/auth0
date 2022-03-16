import React from 'react';

import Hero from '../components/Hero';

export default function Index() {
  return (
    <div className={styles.container}>
      
      <main className={styles.main}>
          <>
            <Hero />
            <hr />
          </>
      </main>
    </div >
  );
}