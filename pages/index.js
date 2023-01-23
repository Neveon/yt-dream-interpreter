import Head from 'next/head';
import { useState } from 'react';
import styles from './index.module.css';
/* eslint-disable @next/next/no-img-element */

export default function Home() {
  const [animalInput, setAnimalInput] = useState('');
  const [result, setResult] = useState();
  const [image, setImage] = useState('');

  async function onSubmit(event) {
    event.preventDefault();
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ animal: animalInput }),
    });
    const data = await response.json();
    setResult(data.result);

    const res = await fetch('/api/createImage', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt: animalInput }),
    })
      .then((res) => res.json())
      .then((data) => {
        const imgURL = data.result;
        console.log(imgURL);
        setImage(imgURL);
      });

    setAnimalInput('');
  }

  return (
    <div>
      <Head>
        <title>AI Dream Interpreter</title>
      </Head>

      <main className={styles.main}>
        <h3 className='title'>Interpret My Dreams</h3>
        <form onSubmit={onSubmit}>
          <textarea
            cols='60'
            rows='8'
            name='animal'
            placeholder='Describe your dreams...'
            value={animalInput}
            onChange={(e) => setAnimalInput(e.target.value)}
          ></textarea>
          <input type='submit' value='Interpret!' />
        </form>
        <br />
        <br />
        <br />
        {image ? <img src={image}></img> : <></>}
        <div className={styles.result}>{result}</div>
      </main>
    </div>
  );
}
