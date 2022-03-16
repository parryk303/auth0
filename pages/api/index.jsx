import React from 'react';
import Head from 'next/head';
import styles from '../styles/Home.module.css';

import Hero from '../components/Hero';

export default function Index() {

  return (
    <div className={styles.container}>
      <Head>
        <title>Securonix SSA</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main className={styles.main}>
        
       
        
          <>
            <Hero />
            <hr />
          </>
    
      </main>
    </div >
  );
}