import Link from 'next/link';
import FooterBottom from '@/src/components/FooterBottom';

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
        <FooterBottom />
      </div>
    </section>
  );
};

export default Policy;
