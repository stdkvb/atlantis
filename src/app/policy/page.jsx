import Link from 'next/link';

export const metadata = {
  title: 'GrandAvenue | Политика конфиденциальности',
};

//get data
async function getData() {
  const res = await fetch('https://grandavenue.ru/api/policy', {
    next: { revalidate: 10 },
  });

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

const Policy = async () => {
  const data = await getData();
  // console.log(data);

  return (
    <section className='policy'>
      <div className='container'>
        <h1>{data.data.name}</h1>
        <div
          className='policy__content'
          dangerouslySetInnerHTML={{ __html: data.data.content }}
        ></div>
        <div className='footer__bottom'>
          <span>© 2023. Все права защищены.</span>
          <Link href={'https://wptt.ru'} className='link'>
            Разработка — вебпространство
          </Link>
          <Link href={'/policy'} className='link'>
            Политика конфиденциальности
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Policy;
